import express from 'express';
import path from 'path';
import cors from 'cors';
import { serve } from 'inngest/express';
import { clerkMiddleware } from '@clerk/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest, functions } from './lib/inngest.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import codeRoutes from './routes/codeRoutes.js';

const app = express();

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for client URL
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true}));

// Clerk authentication middleware
app.use(clerkMiddleware());

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Inngest webhook endpoint
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat', chatRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/code', codeRoutes);

// Prepare for deployment
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("/{*any}", (req, res) => { // Catch all route to handle frontend routing
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(ENV.PORT, () =>console.log('Server is running on port', ENV.PORT));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();