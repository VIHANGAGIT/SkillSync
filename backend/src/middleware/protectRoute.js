import { requireAuth } from '@clerk/express';
import User from '../models/User.js';

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;
            if (!clerkId) {
                return res.status(401).json({ message: 'Unauthorized: No user ID found' });
            }

            // Check if user exists in the database
            const user = await User.findOne({ clerkId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Attach user to request object
            req.user = user;
            next();

        } catch (error) {
            console.error('Error in protectRoute middleware:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
]