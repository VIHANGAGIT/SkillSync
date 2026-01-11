const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0", extension: "js" },
    python: { language: "python", version: "3.10.0", extension: "py" },
    java: { language: "java", version: "15.0.2", extension: "java" }
};

export const handleExecuteCode = async (req, res) => {
    const { sourceCode, language } = req.body;

    try {
        const langConfig = LANGUAGE_VERSIONS[language];
        if (!langConfig) {
            return res.status(400).json({ error: `Unsupported language: ${language}` });
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: langConfig.language,
                version: langConfig.version,
                files: [{
                    name: `main.${langConfig.extension}`,
                    content: sourceCode
                }],
            })
        });

        const data = await response.json();
        const hasError = data.run.stderr || data.run.code !== 0;

        
        // TODO: Save execution history in DB

        res.json({
            success: !hasError,
            output: data.run.output || (data.run.stderr ? data.run.stderr : "No output"),
            stderr: data.run.stderr
        });

    } catch (error) {
        res.status(500).json({ error: "Execution failed: " + error.message });
    }
};