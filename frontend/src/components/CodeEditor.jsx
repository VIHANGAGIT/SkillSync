import { Code2, Play, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { language_config } from '../data/challenges';

function CodeEditor({ selectedLanguage, handleLanguageChange, code, setCode, isRunning, handleCodeExecution }) {
    return (
        <div className="flex flex-col h-full">
            <div className="p-2 border-b border-base-300 bg-base-200/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm">Code Editor</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={language_config[selectedLanguage].icon} alt={selectedLanguage} className="w-6 h-6 object-contain" />
                    <select
                        className="select select-bordered select-xs capitalize"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        {Object.keys(language_config).map(lang => (
                            <option key={lang} value={lang}>{language_config[lang].name}</option>
                        ))}
                    </select>
                    <button
                        className={`btn btn-xs btn-primary`}
                        onClick={handleCodeExecution}
                        disabled={isRunning}
                    >
                        {isRunning ? ( <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Running...</>) 
                        : ( <><Play className="w-3 h-3 mr-1" /> Run</>)}
                    </button>
                </div>
            </div>
            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    language={language_config[selectedLanguage].monacoLang}
                    value={code}
                    onChange={(value) => setCode(value)}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    );
}

export default CodeEditor;