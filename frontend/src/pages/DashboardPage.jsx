import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatsGrid from '../components/dashboard/StatsGrid';
import LiveSessions from '../components/dashboard/LiveSessions';
import PastSessions from '../components/dashboard/PastSessions';
import CreateSessionModal from '../components/dashboard/CreateSessionModal';
import Welcome from '../components/dashboard/Welcome';
import { useActiveSessions, useCreateSession, usePastSessions } from '../customHooks/useSessions';

function DashboardPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [sessionConfig, setSessionConfig] = useState({
        challengeId: "",
        difficulty: "",
        // isPrivate: false
    });

    const createSessionMutation = useCreateSession();

    const handleCreateSession = async () => {
      if(!sessionConfig.challengeId || !sessionConfig.difficulty) {
        return;
      }

      createSessionMutation.mutate({
        challengeId: sessionConfig.challengeId,
        difficulty: sessionConfig.difficulty,
        // isPrivate: sessionConfig.isPrivate
      },
      {
        onSuccess: (data) => {
          setShowModal(false);
          navigate(`/session/${data.session._id}`); 
        }
      });
    }

    const onClose = () => {
      setShowModal(false);
      setSessionConfig({
          challengeId: "",
          difficulty: "",
          // isPrivate: false
      });
    }

    const isUserInSession = (session) => {
      return session.participants?.some(p => p.clerkId === user.id) || session.host?.clerkId === user.id;
    }

    const {data: activeSessionsData, isLoading: isActiveSessionsLoading} = useActiveSessions();
    const {data: pastSessionsData, isLoading: isPastSessionsLoading} = usePastSessions();

    const activeSessionsList = activeSessionsData?.activeSessions || [];
    const pastSessionsList = pastSessionsData?.pastSessions || [];

    return (
      <>
        <div className="min-h-screen bg-base-100 flex flex-col font-sans">
            <Navbar />
            
            <main className="flex-1 container mx-auto px-4 py-8">

                <Welcome onCreateSession={() => setShowModal(true)} />

                <div className="grid grid-cols-1 lg:grid-cols-[35%_64%] gap-4 mb-8" >

                  <StatsGrid 
                    activeSessionsCount={activeSessionsList.length} 
                    pastSessionsCount={pastSessionsList.length} 
                  />

                  <LiveSessions 
                    activeSessions={activeSessionsList} 
                    isActiveSessionsLoading={isActiveSessionsLoading}
                    isUserInSession={isUserInSession}
                    onSessionCreate={() => setShowModal(true)}
                  />

                </div>
                <div className="mb-2">

                    <PastSessions pastSessions={pastSessionsList} isPastSessionsLoading={isPastSessionsLoading} />

                </div>
            </main>

            <Footer />
        </div>

        <CreateSessionModal
            isOpen={showModal}
            onClose={onClose}
            sessionConfig={sessionConfig}
            setSessionConfig={setSessionConfig}
            onCreateSession={handleCreateSession}
            isCreating={createSessionMutation.isPending}
        />
      </>
    );
}

export default DashboardPage;