import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { challenges } from '../data/challenges';
import Navbar from '../components/Navbar';
import ChallengeDetails from '../components/ChallengeDetails';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';
import { executeCode } from '../lib/piston';

function SolvePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentChallengeId, setCurrentChallengeId] = useState(id || "two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const currentChallenge = challenges[currentChallengeId];

    useEffect(() => {
        if (id && challenges[id]) {
            setCurrentChallengeId(id);
            setCode(challenges[id].starterCode[selectedLanguage]);
            setOutput("");
        } else if (!id) {
             navigate('/challenge/two-sum', { replace: true });
        }
    }, [id, selectedLanguage, navigate]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    }

    const handleChallengeChange = (e) => {
        navigate(`/challenge/${e.target.value}`);
    }

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 1.0, y: 0.7 }
        });

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.0, y: 0.7 }
        });
    }

    const normalizeOutput = (output) => {
       return output
        .trim()
        .split("\n")
        .map((line) =>
            line
            .trim()
            // remove spaces after [ and before ]
            .replace(/\[\s+/g, "[")
            .replace(/\s+\]/g, "]")
            // normalize spaces around commas to single space after comma
            .replace(/\s*,\s*/g, ",")
        )
        .filter((line) => line.length > 0)
        .join("\n");
    }

    const checkTestCases = (actualOutput, expectedOutput) => {
        return normalizeOutput(actualOutput) === normalizeOutput(expectedOutput);
    }

    const handleCodeExecution = async () => {
        try{
            setIsRunning(true);
            setOutput("Running tests...");
            
            const result = await executeCode(code, selectedLanguage);
            setOutput(result);
            setIsRunning(false);
                
            if (result.success) {
                const expectedOutput = currentChallenge.expectedOutput[selectedLanguage];
                const isSuccess = checkTestCases(result.output, expectedOutput);

                if (isSuccess) {
                    triggerConfetti();
                    toast.success("All Test Cases Passed! Challenge Solved!");
                } else {
                    toast.error("Some Test Cases Failed. Try Again!");
                }
            } else {
                toast.error("Error during code execution. See output for details.");
            }
        } finally {
            setIsRunning(false);
        }
        
    }

    if (!currentChallenge) return <div className="min-h-screen flex items-center justify-center bg-base-200"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="h-screen w-screen bg-base-100 flex flex-col rounded-lg">
            <Toaster position="top-center" />
            <Navbar />
            
            <div className="flex-1 overflow-hidden">
                <PanelGroup orientation="horizontal" className="h-full">
                    <Panel defaultSize={60} minSize={30} className="flex flex-col border-r border-base-300 bg-base-100 h-full overflow-hidden">
                        <ChallengeDetails
                            currentChallenge={currentChallenge}
                            currentChallengeId={currentChallengeId}
                            handleChallengeChange={handleChallengeChange}
                        />
                    </Panel>

                    <PanelResizeHandle orientation="vertical" className="w-1 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

                    <Panel defaultSize={40} className="flex flex-col bg-base-100 h-full">
                        <PanelGroup orientation="vertical" className="h-full">
                            <Panel defaultSize={70} className="flex flex-col">
                                <CodeEditor
                                    selectedLanguage={selectedLanguage}
                                    handleLanguageChange={handleLanguageChange}
                                    code={code}
                                    setCode={setCode}
                                    isRunning={isRunning}
                                    handleCodeExecution={handleCodeExecution}
                                />
                            </Panel>

                            <PanelResizeHandle orientation="horizontal" className="h-1 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                            
                            <Panel defaultSize={30} className="flex flex-col h-full">
                                <OutputPanel
                                    output={output}
                                    setOutput={setOutput}
                                />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}

export default SolvePage;