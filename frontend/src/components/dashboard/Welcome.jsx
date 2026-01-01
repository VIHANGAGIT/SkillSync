import { useUser } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';

function Welcome({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="mb-8 mr-15 ml-15 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold mb-2">
                Welcome back, <span className="text-primary">{user?.firstName || user?.username}</span>!
            </h1>
            <p className="text-base-content/70">
                Ready to start solving some challenges? Here's what's happening.
            </p>
        </div>
        <button onClick={onCreateSession} className="btn btn-primary btn-lg">
            Start Session <ArrowRight className="w-6 h-6" />
        </button>
    </div>
  )
}

export default Welcome