import { Panel } from 'react-resizable-panels';
import { Terminal } from 'lucide-react';

function OutputPanel({ output, setOutput }) {
    return (
        <div className="flex flex-col h-full bg-base-100">
            <div className="p-2 border-b border-white/10 bg-white/5 flex justify-between items-center text-gray-300">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span className="font-bold text-sm">Console Output</span>
                </div>
                <div className="flex gap-2">
                    <button
                        className="btn btn-xs btn-ghost text-gray-400 hover:text-white"
                        onClick={() => setOutput("")}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-auto whitespace-pre-wrap ">
                {output === ("" || null) ? (<span className="text-base-content/50 text-sm italic">Run your code to see the results here...</span> 
                ): output.success ? (
                    <pre className="text-sm font-mono text-success">{output.output}</pre>
                ) : (
                    <div>
                        <pre className="text-sm font-mono text-error whitespace-pre-wrap">{output.error}</pre>
                    </div>
                ) }
            </div>
        </div>
    );
}

export default OutputPanel;