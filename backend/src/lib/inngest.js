import { Inngest } from "inngest";
import {connectDB} from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "skillsync",});

const createUser = inngest.createFunction(
    { id: "sync/user"},
    { event: "clerk/user.created"}, 
    async ({ event }) => {
        await connectDB();

        // The Clerk user data payload
        const {id, first_name, last_name, email_addresses, image_url} = event.data;

        const newUser = {
            clerkId: id,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            email: email_addresses[0].email_address,
            profilePicture: image_url
        }

        // Save the new user to the database
        await User.create(newUser);

    }
)

const deleteUser = inngest.createFunction(
    { id: "delete/user"},
    { event: "clerk/user.deleted"}, 
    async ({ event }) => {
        await connectDB();

        const {id} = event.data; 
        await User.deleteOne({ clerkId: id });

    }
)

export const functions = [createUser, deleteUser];