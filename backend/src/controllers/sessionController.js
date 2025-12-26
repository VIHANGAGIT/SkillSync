import Session from "../models/Session.js";
import { streamChatClient, streamVideoClient } from "../lib/stream.js";

export async function createSession(req, res) {
    try {
        const { problemName, difficulty } = req.body;
        const hostId = req.user._id; // MongoDB User ID
        const clerkId = req.user.clerkId;

        if (!problemName || !difficulty) {
            return res.status(400).json({ message: "Problem name and difficulty are required." });
        }

        // Create unique Stream call ID
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Save session to database
        const session = await Session.create({problemName, difficulty, host: hostId, sessionId});

        // Get / Create Stream video call
        await streamVideoClient.video.call("default", sessionId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problemName, difficulty, sessionId: session._id.toString()}
            }
        });

        const channel = streamChatClient.channel("messaging", sessionId, {
            name: `Session Chat - ${problemName}`,
            created_by_id: clerkId,
            members: [clerkId],
        });

        await channel.create();
        res.status(201).json({ message: "Session created successfully.", session });

    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ message: "Failed to create session." });
    }
}

export async function getActiveSessions(req, res) {}

export async function getPastSessions(req, res) {}

export async function getSessionById(req, res) {}

export async function joinSession(req, res) {}

export async function endSession(req, res) {}