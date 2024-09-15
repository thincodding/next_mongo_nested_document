import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import { Student } from "../../../models/student";


// nexted document
export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();
        
        // Extract the body data from the request
        const body = await request.json();
        const { sname, age, course } = body;

        // Check if the required fields are present
        if (!sname || !age || !course) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the student with the extracted data
        const student = await Student.create({
            sname,
            age,
            course,  // Assuming 'course' is an array of objects matching the Course schema
        });

        // Return success response
        return NextResponse.json({ msg: "Create Student success", student }, { status: 201 });
    } catch (error) {
        // Handle any errors during the creation process
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// GET function to fetch all students
export async function GET() {
    try {

        await connectDB();
        const students = await Student.find();
        return NextResponse.json(students, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


