import mongoose, { Schema } from "mongoose";

// Define the Course schema
const courseSchema = new Schema({
    cname: {
        type: String,
        required: true,
    },
    detail: {
        type: String,  // Assuming 'detail' is a text description
        required: true,
    },
});

// Export the Course schema (not the model)
export const CourseSchema = courseSchema;
