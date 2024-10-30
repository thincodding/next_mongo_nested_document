import mongoose, { Schema } from "mongoose";

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
   
});

// Export the Student model
export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);


// // models/student.js
// import mongoose, { Schema } from "mongoose";

// // Define the embedded Course schema for Student
// const embeddedCourseSchema = new Schema({
//     cname: {
//         type: String,
//         required: true,
//     },
//     detail: {
//         type: String,
//         required: true,
//     },
// }, { _id: false }); // Disable _id for subdocuments to prevent unnecessary IDs

// // Define the Student schema
// const studentSchema = new Schema({
//     sname: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: Number,
//         required: true,
//     },
//     course: {
//         type: [embeddedCourseSchema],
//         required: true,
//         validate: [arrayLimit, '{PATH} must have at least one course']
//     },
// }, {
//     timestamps: true, // Optional: Adds createdAt and updatedAt fields
// });

// // Custom validator to ensure at least one course is embedded
// function arrayLimit(val) {
//     return val.length > 0;
// }

// export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
