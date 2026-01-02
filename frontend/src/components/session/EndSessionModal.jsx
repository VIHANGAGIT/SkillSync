import { AlertTriangle, Info } from 'lucide-react';

function EndSessionModal({ isOpen, onClose, onConfirm, isEnding }) {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-7 h-7 text-warning" />
                    <h3 className="font-bold text-lg">End Session?</h3>
                </div>
                
                <p className="text-base-content/80">
                    Are you sure you want to end this session?
                </p>
                <div className="flex items-center gap-2 mb-2 pt-2">
                        <Info className="w-4 h-4 text-warning" />
                        <div className="text-sm text-base-content/60">This action cannot be undone and all participants will be disconnected.</div>
                    </div>

                <div className="modal-action">
                    <button 
                        type="button" 
                        className="btn" 
                        onClick={onClose} 
                        disabled={isEnding}
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        className={`btn btn-error ${isEnding ? 'loading' : ''}`} 
                        onClick={onConfirm} 
                        disabled={isEnding}
                    >
                        {isEnding ? 'Ending...' : 'End Session'}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={isEnding ? undefined : onClose}></div>
        </div>
    );
}

export default EndSessionModal;