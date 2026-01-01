import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    challengeId: { // Name of challenge is the ID
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    host: { // Person who created the session
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true
    },
    participants: [{ // Might change to single participant later
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active"
    },
    sessionId: { // Stream call ID
        type: String,
        default:""
    }
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session;