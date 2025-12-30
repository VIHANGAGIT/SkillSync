const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: {language: "javascript", version: "18.15.0"},
    python: {language: "python", version: "3.10.0"},
    java: {language: "java", version: "15.0.2"}
}

/**
 * @param {string} sourceCode - The source code to execute
 * @param {string} language - The programming language of the source code
 * @returns {Promise<success:boolean, output?:string, error?:string>}
 */

export async function executeCode(sourceCode, language) {
    try {
        const langConfig = LANGUAGE_VERSIONS[language];
        if (!langConfig) {
            throw new Error(`Unsupported language: ${language}`);
        }
        const response = await fetch(`${PISTON_API}/execute`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: langConfig.language,
                version: langConfig.version,
                files: [{
                    name: `main.${getFileExtension(language)}`,
                    content: sourceCode
                }],
            })
        });

        if (!response.ok) {
            return {success: false, error: `API request failed with status ${response.status}`};
        }

        const data = await response.json();

        const output = data.run.output || "";
        const stderr = data.run.stderr || "";

        if (stderr) {
            return {success: false, output: stderr, error: stderr};
        }

        return {success: true, output: output || "No output"};

    } catch (error) {
        return {success: false, error: 'Failed to execute code: ' + error.message};
    }
}

function getFileExtension(language) {
    switch(language) {
        case "javascript": return "js";
        case "python": return "py";
        case "java": return "java";
        default: return "txt";
    }
}