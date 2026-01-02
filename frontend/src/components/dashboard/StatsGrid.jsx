import { Activity, Trophy, CircleCheckBig, NotepadText, ChartLine } from 'lucide-react';
import { challenges } from '../../data/challenges';

function StatsGrid({ activeSessionsCount, pastSessionsCount }) {
    const challengesList = Object.values(challenges);
    const totalSessions = pastSessionsCount + activeSessionsCount;
    const solvedChallenges = 0; // TODO: Add solved challenges logic
    const totalChallenges = challengesList.length;
    const successRate = totalSessions > 0 ? Math.round((solvedChallenges / totalSessions) * 100) : 0;

    return (
        <div className="grid grid-cols-2 gap-4 justify-around">
            <div className="stats shadow bg-base-200 border border-base-300 mt-auto">
                <div className="stat" >
                    <div className="stat-figure text-primary">
                        <Activity className="w-9 h-9" />
                    </div>
                    <div className="stat-title ">You got</div>
                    <div className="stat-value text-primary">{activeSessionsCount}</div>
                    <div className="stat-desc text-lg">Live Sessions</div>
                </div>
            </div>

            <div className="stats shadow bg-base-200 border border-base-300 mt-auto">
                <div className="stat" >
                    <div className="stat-figure text-secondary">
                        <ChartLine className="w-9 h-9" />
                    </div>
                    <div className="stat-title">You've been in </div>
                    <div className="stat-value text-secondary">{totalSessions}</div>
                    <div className="stat-desc text-lg">Total Sessions</div>
                </div>
            </div>

            <div className="stats shadow bg-base-200 border border-base-300 mt-auto">
                <div className="stat" >
                    <div className="stat-figure text-accent">
                        <CircleCheckBig className="w-9 h-9" />
                    </div>
                    <div className="stat-title">You've Solved</div>
                    <div className="stat-value text-accent">{solvedChallenges}</div>
                    <div className="stat-desc text-lg">Challenges</div>
                </div>
            </div>

            <div className="stats shadow bg-base-200 border border-base-300 mt-auto">
                <div className="stat" >
                    <div className="stat-figure text-blue-400">
                        <NotepadText className="w-9 h-9" />
                    </div>
                    <div className="stat-title">You got</div>
                    <div className="stat-value text-blue-400">{totalChallenges - solvedChallenges}</div>
                    <div className="stat-desc text-lg">More Challenges</div>
                </div>
            </div>

            <div className="stats shadow bg-base-200 border border-base-300 mt-auto">
                <div className="stat" >
                    <div className="stat-figure text-warning">
                        <Trophy className="w-9 h-9" />
                    </div>
                    <div className="stat-title">Your have</div>
                    <div className="stat-value text-warning">{successRate}%</div>
                    <div className="stat-desc text-lg">Success Rate</div>
                </div>
            </div>

            
        </div>
    );
}

export default StatsGrid;