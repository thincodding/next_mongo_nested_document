import mongoose, { Schema } from "mongoose";

// Define the embedded member schema
const memberSchemaEmbed = new Schema({
    names: {
        type: String,
        required: true, // Require the member name
    },
    detail: {
        type: String, // Assuming 'detail' is a text description
        required: true, // Require the detail description
    },
}, { _id: false });

// Define the main BooksType schema
const BooksTypeSchema = new Schema({
    cname: {
        type: String,
        required: true, // Course name is required
    },
    detail: {
        type: String, // Assuming 'detail' is a text description
        required: true, // Course detail is required
    },
    member: {
        type: [memberSchemaEmbed],
        required: true, // Require members to be present
        validate: [arrayLimit, '{PATH} must have at least one member'] // Validate array length
    }
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

function arrayLimit(val) {
    return val.length > 0; // Ensure there's at least one member
}

// Export the model
export const BookType = mongoose.models.BooksType || mongoose.model("BooksType", BooksTypeSchema);
