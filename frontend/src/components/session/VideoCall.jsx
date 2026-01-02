import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import { CallControls, CallingState, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { MessageCircle, User, X} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Chat, Channel, MessageList, MessageInput, Window, Thread } from "stream-chat-react";

function VideoCall({ chatClient, chatChannel }) {

  const navigate = useNavigate();
  const {useCallCallingState, useParticipantCount} = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if(callingState === CallingState.JOINING) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Joining the call...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex relative bg-base-100 rounded-lg str-video overflow-hidden">
      {/* Video Section */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center bg-base-200 p-2">
          <div className="flex items-center gap-2 px-2">
            <div className="flex items-center gap-2">
                    <div className="size-3 bg-primary rounded-full" />
                    <span className="font-bold text-base">Video Call</span>
            </div>
            <div className="text-sm font-medium text-base-content/70 flex items-center gap-1">
              <User className="w-4 h-4" />
              {participantCount}
            </div>
          </div>
          {chatClient && chatChannel && (
            <button
              className={`btn btn-sm ${isChatOpen ? 'btn-primary' : 'btn-ghost'} gap-2 transition-colors`}
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageCircle className="w-4 h-4" />
              {isChatOpen ? 'Close Chat' : 'Open Chat'}
            </button>
          )}
        </div>
        
        <div className="flex-1 flex relative overflow-hidden bg-base-100">
          <SpeakerLayout />
        </div>
        
        <div className="flex justify-center bg-base-200 p-2">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* Chat Section */}
      {chatClient && chatChannel && (
        <div className={`bg-base-100 flex flex-col border-l border-base-300 transition-all duration-300 ease-in-out overflow-hidden
          ${isChatOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'}`}>
          
            <div className="p-3 border-b border-base-300 flex justify-between items-center bg-base-200 h-[52px]">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="font-bold text-base">Session Chat</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="btn btn-ghost btn-xs btn-circle">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 h-full stream-chat-wrapper">
              <Chat client={chatClient} theme="str-chat__theme-dark">
                <Channel channel={chatChannel}>
                  <Window>
                    <MessageList />
                    <MessageInput />
                  </Window>
                  <Thread />
                </Channel>
              </Chat>
            </div>
        </div>
      )}
    </div>
  )
}

export default VideoCall