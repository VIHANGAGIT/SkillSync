import { challenges } from '../../data/challenges';
import { getDifficultyColor } from '../../lib/utils';
import { Info, Laptop } from 'lucide-react';

function CreateSessionModal({ isOpen, onClose, sessionConfig, setSessionConfig, onCreateSession, isCreating }) {

    const challengesList = Object.values(challenges);
    
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-2">
                    <Laptop className="w-7 h-7 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-4">Create New Session</h3>
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text mb-2">Select Challenge</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={sessionConfig.challengeId}
                        onChange={(e) => setSessionConfig({ 
                            challengeId: e.target.value, 
                            difficulty: challengesList.find(challenge => challenge.title === e.target.value)?.difficulty })}
                        required
                    >
                        <option value="">Choose a challenge...</option>
                        {challengesList.map(c => (
                            <option key={c.id} value={c.title}>
                                {c.title} - <div className={`badge ${getDifficultyColor(c.difficulty)} badge-outline badge-sm ml-2 font-normal`}>{c.difficulty}</div>
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-primary" />
                    <div className="text-sm text-base-content/60">Maximum of 2 participants per session.</div>
                </div>

                {/* <div className="form-control mb-6"> */
                    /* <label className="label cursor-pointer">
                        <span className="label-text">Private Session</span>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm"
                            checked={sessionConfig.isPrivate}
                            onChange={(e) => setSessionConfig(prev => ({ ...prev, isPrivate: e.target.checked }))}
                        />
                    </label> */
                    /* <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-primary" />
                        <div className="text-sm text-base-content/60">Private sessions are not visible to other users.</div>
                    </div> */
                /* </div> */}

                <div className="modal-action">
                    <button type="button" className="btn" onClick={onClose} disabled={isCreating}>
                        Cancel
                    </button>
                    <button type="submit" className={`btn btn-primary ${isCreating ? 'loading' : ''}`} onClick={onCreateSession} disabled={isCreating || !sessionConfig.challengeId}>
                        {isCreating ? 'Creating...' : 'Create Session'}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}

export default CreateSessionModal;