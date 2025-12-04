import express from 'express';
import path from 'path';
import cors from 'cors';
import {serve} from 'inngest/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest } from './lib/inngest.js';

const app = express();

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for client URL
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true}));

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Inngest webhook endpoint
app.use('/api/inngest', serve({ client: inngest, functions: inngestFunctions }));

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