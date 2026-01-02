import { useEffect, useState } from "react";
import { useEndSession, useJoinSession, useSessionById } from "../customHooks/useSessions";
import { challenges } from "../data/challenges";
import { useNavigate, useParams, Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import { executeCode } from "../lib/piston";
import { getDifficultyColor } from "../lib/utils";
import { LogOut, PhoneOff } from "lucide-react";
import useStreamClient from "../customHooks/useStreamClient";
import { StreamCall, StreamVideo} from "@stream-io/video-react-sdk";
import VideoCall from "../components/session/VideoCall";
import EndSessionModal from "../components/session/EndSessionModal";

function SessionPage() {

    const navigate = useNavigate();
    const { sessionId } = useParams();
    const { user } = useUser();
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [showEndSessionModal, setShowEndSessionModal] = useState(false);
    
    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    const {data: sessionData, isLoading: isSessionLoading, refetch} = useSessionById(sessionId);

    const session = sessionData?.session;
    const isHost = session?.host?.clerkId === user.id;
    const isActiveHost = isHost && session?.status === "Active";
    const isParticipant = session?.participants?.some(p => p.clerkId === user.id);
    
    const challengeData = session?.challengeId ? Object.values(challenges).find(c => c.title === session.challengeId) : null;
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(
        challengeData ? challengeData.starterCode["javascript"] : ""
    );

    const {streamVideoClient, videoCall, streamChatClient, chatChannel, isConnecting} = useStreamClient(session, isSessionLoading, isHost, isParticipant);

    // Trigger join session on component load if not already in session
    useEffect(() => {

      if(!session || !user || isSessionLoading || isHost || isParticipant) return;
      if(session.status !== "Active") return;

      joinSessionMutation.mutate(sessionId, {onSuccess: refetch});
    }, [session?.status, user, isSessionLoading, isParticipant, isHost, sessionId]);

    // Update code when challenge data or selected language changes
    useEffect(() => {

      if(challengeData?.starterCode) {
        const starterCode = challengeData.starterCode[selectedLanguage] || "";
        setCode(starterCode);
        setOutput(null);
      }
    }, [challengeData, selectedLanguage]);

    // Navigate participant to dashboard when session ends
    useEffect(() => {

      if(!session || isSessionLoading) return;

      if(session.status === "Completed") {
        toast.success("Session has ended. Redirecting to dashboard...");
        navigate("/dashboard");
      }
    }, [session, isSessionLoading, navigate])

    const handleLanguageChange = (e) => {
      const lang = e.target.value;
      setSelectedLanguage(lang);
      const starterCode = challengeData?.starterCode?.[lang] || "";
      setCode(starterCode);
      setOutput(null);
    }

    const handleCodeExecution = async () => {
      try{
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(code, selectedLanguage, challengeData?.testCases || []);
        setOutput(result);
      } finally {
        setIsRunning(false);
      }
    }

    const handleEndSession = () => {
      // Navigate host to dashboard after ending session
      endSessionMutation.mutate(sessionId, {
        onSuccess: () => {
          setShowEndSessionModal(false);
          navigate("/dashboard");
        }
      });
    }

  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col rounded-lg">
      
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup orientation="horizontal" className="h-full">
            <Panel defaultSize={55} minSize={30} className="flex flex-col border-r border-base-300 bg-base-100 h-full overflow-hidden">
              <PanelGroup orientation="vertical" className="h-full">
                <Panel defaultSize={50} minSize={30} className="flex flex-col border-r border-base-300 bg-base-100 h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
                    <div className="relative ">
                      {isActiveHost && (
                        <div className="sticky top-0 z-20 flex justify-end pt-2 pb-2">
                          <button 
                            className="btn btn-error btn-sm shadow-lg" 
                            onClick={() => setShowEndSessionModal(true)}
                          >
                            <LogOut className="w-4 h-4" /> End Session
                          </button>
                        </div>
                      )}
                      
                      <div className={isActiveHost ? "-mt-10" : ""}>
                        <div className="flex items-center mb-2">
                          <h1 className="text-2xl font-bold">
                            {session?.challengeId}
                          </h1>
                          <div className={`badge ${getDifficultyColor(challengeData?.difficulty)} badge-outline ml-2`}>
                            {challengeData?.difficulty}
                          </div>
                        </div>
                        
                        <div className="font-bold mb-4 text-primary">
                          {challengeData?.category}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                            <p className="text-base-content/80 text-base leading-relaxed mb-6">
                                {challengeData?.description.text}
                            </p>
        
                            {challengeData?.description.notes && challengeData?.description.notes.length > 0 && (
                              <div className="bg-base-200 p-4 rounded-lg mb-6">
                                  <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-base-content/70">Notes</h3>
                                  <ul className="list-disc list-inside space-y-1">
                                      {challengeData.description.notes.map((note, i) => (
                                          <li key={i} className="text-sm">{note}</li>
                                      ))}
                                  </ul>
                              </div>
                            )}
        
                            <h3 className="font-bold text-lg mb-4">Examples</h3>
                            <div className="space-y-4 mb-8">
                              {challengeData?.examples.map((example, i) => (
                                <div className="ml-4 space-y-2" key={i}>
                                  <span key={i} className="font-medium text-md mb-4">Example {i + 1}</span>
                                  <div className="bg-base-200 rounded-lg p-4 border border-base-300 mt-3">
                                      <div className="mb-2">
                                          <span className="font-medium text-xs uppercase tracking-wider block mb-1 text-primary">Input</span>
                                          <code className="bg-base-300 px-2 py-1 rounded text-sm font-mono block w-fit">{example.input}</code>
                                      </div>
                                      <div className="mb-2">
                                          <span className="font-medium text-xs uppercase tracking-wider block mb-1 text-primary">Output</span>
                                          <code className="bg-base-300 px-2 py-1 rounded text-sm font-mono block w-fit">{example.output}</code>
                                      </div>
                                      {example.explanation && (
                                          <div>
                                              <span className="font-medium text-xs uppercase tracking-wider block mb-1 text-primary">Explanation</span>
                                              <p className="text-sm text-base-content/70">{example.explanation}</p>
                                          </div>
                                      )}
                                  </div>
                                </div>
                              ))}
                            </div>
        
                            <h3 className="font-bold text-lg mb-4">Constraints</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm text-base-content/80 bg-base-200 p-4 rounded-lg">
                                {challengeData?.constraints.map((constraint, i) => (
                                    <li key={i}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>

                <PanelResizeHandle orientation="horizontal" className="h-1 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                  
                <Panel defaultSize={30} className="flex flex-col bg-base-100 h-full">
                  <CodeEditor 
                    selectedLanguage={selectedLanguage}
                    handleLanguageChange={handleLanguageChange}
                    code={code}
                    setCode={setCode}
                    isRunning={isRunning}
                    handleCodeExecution={handleCodeExecution}
                  />
                </Panel>

                <PanelResizeHandle orientation="horizontal" className="h-1 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                  
                <Panel defaultSize={20} className="flex flex-col bg-base-100 h-full">
                  <OutputPanel output={output} setOutput={setOutput} />
                </Panel>
              </PanelGroup>
            </Panel>

            <PanelResizeHandle orientation="vertical" className="w-1 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

            <Panel defaultSize={45} className="bg-base-100">
              <div className="h-full bg-base-200 rounded-lg overflow-auto">
                {isConnecting ? (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="ml-4 text-base text-base-content/70">Connecting to the call...</p>
                  </div>
                ) : !streamVideoClient || !videoCall ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center h-full">
                    <PhoneOff  className="w-10 h-10 text-error mb-4"/>
                    <p className="text-base-content/70 mb-4">Unable to connect to the video call.</p>
                  </div>
                ) : (
                  <div className="h-full">
                    <StreamVideo client={streamVideoClient}>
                      <StreamCall call={videoCall}>
                        <VideoCall chatClient={streamChatClient} chatChannel={chatChannel} />
                      </StreamCall>
                    </StreamVideo>
                  </div>
                )}
              </div>
            </Panel>

        </PanelGroup>
      </div>

      <EndSessionModal 
        isOpen={showEndSessionModal}
        onClose={() => setShowEndSessionModal(false)}
        onConfirm={handleEndSession}
        isEnding={endSessionMutation.isPending}
      />
    </div>
  )
}

export default SessionPage