import { Calendar, CheckCircle } from 'lucide-react';
import { getDifficultyColor } from '../../lib/utils';

function PastSessions({ pastSessions, isPastSessionsLoading }) {
    return (
        <div className="bg-base-200 rounded-xl border border-base-300 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Past Sessions
            </h2>

            {isPastSessionsLoading ? (
                <div className="text-center py-8">
                    <span className="loading loading-spinner loading-lg text-secondary"></span>
                </div>
            ) : pastSessions.length === 0 ? (
                <div className="text-center py-8 border border-base-300 border-dashed rounded-lg">
                    <p className="text-base-content/60 text-sm">You haven't participated in any sessions yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastSessions.map(session => (
                                <tr key={session._id} className="hover:bg-base-300/50">
                                    <td className="font-medium">{session.challengeId}</td>
                                    <td>
                                        <div className={`badge ${getDifficultyColor(session.difficulty)} badge-outline badge-xs`}>
                                            {session.difficulty}
                                        </div>
                                    </td>
                                    <td className="text-xs text-base-content/70">
                                        {new Date(session.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="badge badge-success badge-xs gap-1">
                                            <CheckCircle className="w-3 h-3" /> Completed
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PastSessions;