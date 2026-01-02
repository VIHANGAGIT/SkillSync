import { StreamVideoClient} from "@stream-io/video-react-sdk";

const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStream = async (user, streamToken) => {
    console.log("initializeStream called with:", {user, streamToken});
    if (client && client?.user?.id === user.id) return client;

    console.log("Initializing Stream client with user:", client);

    if(client){
        await disconnectStreamClient();
    }

    if (!streamApiKey) {
        throw new Error("Stream API key is not defined in environment variables.");
    }

    client = new StreamVideoClient({apiKey:streamApiKey, user, token: streamToken});
    console.log("Stream client ", client);
    return client;

}

export const disconnectStreamClient = async () => {
    if (client) {
        try{
            await client.disconnectUser();
            client = null;
        } catch (error) {
            console.error("Error disconnecting from Stream:", error);
        }
        
    }
}