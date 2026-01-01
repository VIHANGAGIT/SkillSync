import { Link } from 'react-router';
import { Activity, ArrowRight, Crown, Play, User } from 'lucide-react';
import { getDifficultyColor } from '../../lib/utils';

function LiveSessions({ activeSessions, isActiveSessionsLoading, isUserInSession, onSessionCreate }) {
    return (
        <div className="bg-base-200 rounded-xl border border-base-300 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2" >
                    <Activity className="w-5 h-5 text-error" />
                    Live Sessions
                </h2>
                <div className="flex items-center gap-2">
                    <div className="size-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium text-success">{activeSessions.length} sessions</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {isActiveSessionsLoading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : activeSessions.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center border border-dashed border-base-300 rounded-lg p-4">
                        <p className="text-base-content/60 text-sm mb-3">No active sessions.</p>
                        <button onClick={onSessionCreate} className="btn btn-primary btn-sm">Start Session</button>
                    </div>
                ) : (
                    activeSessions.map(session => (
                        <div key={session._id} className="card bg-base-100 border border-base-300 hover:border-primary transition-colors shadow-sm">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-sm truncate">{session.challengeId}</h3>
                                    <div className={`badge ${getDifficultyColor(session.difficulty)} badge-outline badge-sm`}>
                                        {session.difficulty}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <Crown className="w-4 h-4 opacity-70" />
                                        <div className="avatar">
                                            <div className="w-6 h-6 rounded-full">
                                                <img src={session.host?.profilePicture || `https://ui-avatars.com/api/?name=${session.host?.name}`} alt={session.host?.name} />
                                            </div>
                                        </div>
                                        <div className="text-xs opacity-70">
                                            {session.host?.name}
                                        </div>
                                        <span className="text-xs opacity-70">|</span>
                                        <div className="text-xs text-base-content/70 flex items-center">
                                            <User className="w-4 h-4 mr-1 opacity-70" />
                                            <span className="mx-1 text-xs">{session.participants.length + 1}/2</span>
                                        </div>
                                        
                                        {/* Add time elapsed */}
                                    </div>
                                    {session.participants && !isUserInSession(session) ? (
                                        <div className="badge badge-error badge-sm">Full</div>
                                    ) : (
                                        <button onClick={() => navigate(`/session/${session._id}`)} className="btn btn-primary btn-xs">
                                            {isUserInSession(session) ? "Rejoin" : "Join"} <Play className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default LiveSessions;