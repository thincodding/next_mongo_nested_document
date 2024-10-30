import { NextResponse } from "next/server";
import connectDB from "../../../config/db"; // Ensure this is the correct path for your DB connection
import { Course } from "../../../models/couse"; // Import the Course model


export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();

        const body = await request.json();
     

        const { students, course } = body;

        // Validate required fields
        if (!students || !Array.isArray(students) || students.length === 0 || !course) {
            return NextResponse.json({ error: "Missing required fields or invalid student format" }, { status: 400 });
        }

        // Fetch the course by ID
        const courseDoc = await Course.findById(course);
        if (!courseDoc) {
            return NextResponse.json({ error: "Course ID is invalid" }, { status: 400 });
        }

        // Generate an array of student objects with new ObjectId
        const studentDocuments = students.map(student => ({
            sname: student.sname,              
            age: student.age                    
        }));

        console.log("Generated Student Documents:", studentDocuments); // Log the generated documents

        await Course.updateOne(
            { _id: course }, // Find the course by its ID
            { $push: { members: { $each: studentDocuments } } } // Push new students into the members array
        );

        // Return success response
        return NextResponse.json({ msg: "Students added to course successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error); // Log the full error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// GET function to fetch all students
export async function GET() {
    try {

        await connectDB();
        const students = await Course.find();
        return NextResponse.json(students, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


