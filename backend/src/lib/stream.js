import { ENV } from './env.js';    
import {StreamChat} from 'stream-chat';

const apiKey = ENV.STREAM_ACCESS_KEY;
const apiSecret = ENV.STREAM_SECRET_KEY;

if (!apiKey || !apiSecret) {
    throw new Error('STREAM_ACCESS_KEY and STREAM_SECRET_KEY must be set in environment variables.');
}

export const streamChatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        // Create or update the user in Stream
        await streamChatClient.upsertUser(userData);
        console.log('Successfully upserted Stream user:', userData);
    } catch (error) {
        throw new Error('Failed to upsert Stream user:', error.message);  
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await streamChatClient.deleteUser(userId);
        console.log('Successfully deleted Stream user with ID:', userId);
    } catch (error) {
        throw new Error('Failed to delete Stream user:', error.message);
    }
};

// todo: add token generation method

