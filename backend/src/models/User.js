import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkId: { // Reference to Clerk auth ID
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String,
            default: ''
        },
    }, { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const User = mongoose.model('User', userSchema);

export default User;