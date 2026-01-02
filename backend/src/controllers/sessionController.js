import Session from "../models/Session.js";
import { streamChatClient, streamVideoClient } from "../lib/stream.js";

export async function createSession(req, res) {
    try {
        const { challengeId, difficulty } = req.body;
        const hostId = req.user._id; // MongoDB User ID
        const clerkId = req.user.clerkId;

        if (!challengeId || !difficulty) {
            return res.status(400).json({ message: "Challenge ID and difficulty are required." });
        }

        // Create unique Stream call ID
        const streamCallId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Save session to database
        const session = await Session.create({challengeId, difficulty, host: hostId, streamCallId});

        // Get / Create Stream video call
        await streamVideoClient.video.call("default", streamCallId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { challengeId, difficulty, streamCallId: session._id.toString()}
            }
        });

        const channel = streamChatClient.channel("messaging", streamCallId, {
            name: `Session Chat - ${challengeId}`,
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

export async function getActiveSessions(_, res) {
    try {
        const activeSessions = await Session.find({status: "Active"})
        .populate("host", "name profilePicture email clerkId") // Populate host details from mongoDB since host only has user ID
        .populate("participants", "name profilePicture email clerkId")
        .sort({createdAt:-1})
        .limit(10); 
        
        res.status(200).json({activeSessions});
    } catch (error) {
        console.error("Error fetching active sessions:", error);
        res.status(500).json({ message: "Failed to fetch active sessions." });
    }
    
}

export async function getPastSessions(req, res) {
    try {
        // User is either host or participant
        const userId = req.user._id;
        const pastSessions = await Session.find({
            status: "Completed",
            $or: [{ host: userId }, { participants: userId }]
        })
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({ pastSessions });
    } catch (error) {
        console.error("Error fetching past sessions:", error);
        res.status(500).json({ message: "Failed to fetch past sessions." });
    }
}

export async function getSessionById(req, res) {
    try {
        const {sessionId} = req.params;
        const session = await Session.findById(sessionId)
        .populate("host", "name profilePicture email clerkId")
        .populate("participants", "name profilePicture email clerkId");

        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }

        res.status(200).json({ session });
    } catch (error) {
        console.error("Error fetching session by ID:", error);
        res.status(500).json({ message: "Failed to fetch session." });
    }
}

export async function joinSession(req, res) {
    try {
        const {sessionId} = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }

        if (session.status !== "Active") {
            return res.status(400).json({ message: "Cannot join a completed session." });
        }

        if (session.participants.includes(userId)) {
            return res.status(400).json({ message: "You have already joined this session." });
        }

        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: "Host cannot join their own session as participant." });
        }

        // Check if session is full (for now max 1 participant)
        if (session.participants.length >= 1) {
            return res.status(400).json({ message: "Session is full." });
        }

        session.participants.push(userId);
        await session.save();

        // Add user to Stream chat channel
        const channel = streamChatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({ message: "Joined session successfully.", session });
    } catch (error) {
        console.error("Error joining session:", error);
        res.status(500).json({ message: "Failed to join session." });
    }
}

export async function endSession(req, res) {
    try {
        console.log(req);
        const {sessionId} = req.params;
        const userId = req.user._id;
        console
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }

        // Only host can end the session
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only the host can end the session." });
        }

        if (session.status === "Completed") {
            return res.status(400).json({ message: "Session is already completed." });
        }

        // Remove Stream video call
        const call = streamVideoClient.video.call("default", session.streamCallId);
        await call.delete({ hard: true }); // permanently delete the call

        // Remove Stream chat channel
        const channel = streamChatClient.channel("messaging", session.streamCallId);
        await channel.delete({ hard: true });

        session.status = "Completed";
        await session.save();

        res.status(200).json({ message: "Session ended successfully.", session });
    } catch (error) {
        console.error("Error ending session:", error);
        res.status(500).json({ message: "Failed to end session." });
    }
}