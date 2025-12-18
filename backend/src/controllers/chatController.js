import { streamChatClient } from '../lib/stream.js';

export async function getStreamToken(req, res) {
    try {
        // Using clerkId since Stream uses it as the user ID (not mongoDB ID)
        const token = streamChatClient.createToken(req.user.clerkId);
        res.status(200).json({ 
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profilePicture
        });
    } catch (error) {
        console.error('Error generating Stream token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}