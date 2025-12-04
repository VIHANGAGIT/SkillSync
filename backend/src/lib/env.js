import dotenv from 'dotenv';

dotenv.config({ quiet : true });

export const ENV= {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,

    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,

    STREAM_ACCESS_KEY: process.env.STREAM_ACCESS_KEY,
    STREAM_SECRET_KEY: process.env.STREAM_SECRET_KEY,

    CLIENT_URL: process.env.CLIENT_URL,
};