import mongoose, { Schema } from "mongoose";

// Define the Course schema
const memberSchema = new Schema({
    names: {
        type: String,
        required: true, // Course name is required
    },
    detail: {
        type: String,  // Assuming 'detail' is a text description
        required: true, // Course detail is required
    },
});

export const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);
export const MemberSchema = memberSchema;
