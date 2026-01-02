import { useEffect, useState } from "react";
import { sessionAPI } from "../api/sessions";
import { disconnectStreamClient, initializeStream } from "../lib/stream";
import { StreamChat } from "stream-chat"
import toast from "react-hot-toast";

function useStreamClient(session, isLoadingSession, isHost, isParticipant) {

    const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;

    const [streamVideoClient, setStreamVideoClient] = useState(null);
    const [videoCall, setVideoCall] = useState(null);
    const [streamChatClient, setStreamChatClient] = useState(null);
    const [chatChannel, setChatChannel] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(()=> {
        let videoCall = null;
        let chatClient = null;

        const initCall = async () => {
            // Cant initialize without users or call ID is not present
            if(!session?.streamCallId) return;
            if (!isHost && !isParticipant) return;
            if (session.status === "Completed") return;

            try {
                setIsConnecting(true);
                const {token, userId, userName, userImage}= await sessionAPI.getStreamToken();

                const client = await initializeStream({
                    id: userId,
                    name: userName,
                    image: userImage
                }, token);

                setStreamVideoClient(client);

                videoCall = await client.call("default", session.streamCallId);
                await videoCall.join({ create: true});
                setVideoCall(videoCall);

                chatClient = StreamChat.getInstance(streamApiKey);

                await chatClient.connectUser({
                    id: userId,
                    name: userName,
                    image: userImage
                }, token);
                setStreamChatClient(chatClient);

                const channel = chatClient.channel("messaging", session.streamCallId);
                await channel.watch(); // Subscribe to channel events and messages
                setChatChannel(channel);

                console.log("Stream clients initialized - ", {videoCall, chatClient, channel});

            } catch (error) {
                toast.error("Error initializing Stream clients: " + error.message);
                console.error("Stream Initialization Error:", error);
            } finally {
                setIsConnecting(false);
            }
        }

        if (session && !isLoadingSession){
            initCall();
        }

        // Cleanup on unmount or session change (JS IIFE)
        // Todo: fix the race condition causing participants to not redirect after host ends session
        return ()=> {
            (async ()=> {
                try {
                    console.log("Cleaning up Stream clients...");
                    if (videoCall) await videoCall.leave();
                    if (chatClient) await chatClient.disconnectUser(); 
                    await disconnectStreamClient();
                } catch (error) {
                    console.error("Cleanup error:", error);
                }
            })();
        };

    },[session, isLoadingSession, isHost, isParticipant]);

    return {streamVideoClient, videoCall, streamChatClient, chatChannel, isConnecting};
 
}

export default useStreamClient