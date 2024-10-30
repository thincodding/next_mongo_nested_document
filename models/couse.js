// models/course.js
import mongoose, { Schema } from "mongoose";

// Define the embedded Student schema for Course
const embeddedStudentSchema = new Schema({
    sname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}); 

// Define the Course schema
const courseSchema = new Schema({
    cname: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    members: {
        type: [embeddedStudentSchema],
        required: false,
    },
}, {
    timestamps: true, 
});

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);