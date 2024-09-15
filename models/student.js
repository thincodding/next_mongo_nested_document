import mongoose, { Schema } from "mongoose";
import { CourseSchema } from "./couse";  // Import the Course schema

// Define the Student schema
const studentSchema = new Schema({
    sname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    // Use CourseSchema as an array of sub-documents
    course: [CourseSchema],
});

// Export the Student model
export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
