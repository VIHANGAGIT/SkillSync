import { List } from 'lucide-react';
import { challenges } from '../data/challenges';
import { getDifficultyColor } from '../lib/utils';

function ChallengeDetails({ currentChallenge, currentChallengeId, handleChallengeChange }) {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-100">
                <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-primary" />
                    <select
                        className="select select-bordered select-sm w-full max-w-xs font-bold"
                        value={currentChallengeId}
                        onChange={handleChallengeChange}
                    >
                        {Object.values(challenges).map(c => (
                            <option key={c.id} value={c.id}>
                                {c.title} - <div className={`badge ${getDifficultyColor(c.difficulty)} badge-outline badge-sm ml-2 font-normal`}>{c.difficulty}</div>
                            </option>
                        ))}
                    </select>
                </div>
                
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <p className="text-2xl font-bold mb-2 mx">
                    {currentChallenge.title}
                    <div className={`badge ${getDifficultyColor(currentChallenge.difficulty)} badge-outline ml-2`}>
                        {currentChallenge.difficulty}
                    </div>
                    
                </p> 
                <div className="font-bold mb-2 text-primary">{currentChallenge.category}</div>

                <div className="prose prose-sm max-w-none">
                    <p className="text-base-content/80 text-base leading-relaxed mb-6">
                        {currentChallenge.description.text}
                    </p>

                    {currentChallenge.description.notes && currentChallenge.description.notes.length > 0 && (
                        <div className="bg-base-200 p-4 rounded-lg mb-6">
                            <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-base-content/70">Notes</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {currentChallenge.description.notes.map((note, i) => (
                                    <li key={i} className="text-sm">{note}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h3 className="font-bold text-lg mb-4">Examples</h3>
                    <div className="space-y-4 mb-8">
                        {currentChallenge.examples.map((example, i) => (
                            <div className="ml-4 space-y-2" key={i}>
                                <span key={i} className="font-medium text-md mb-4">Example {i + 1}</span>
                                <div key={i} className="bg-base-200 rounded-lg p-4 border border-base-300 mt-3">
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
                        {currentChallenge.constraints.map((constraint, i) => (
                            <li key={i}>{constraint}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetails;