import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import { Course } from "../../../models/couse"; 


export async function POST(request) {
    const { cname, detail } = await request.json();  // Destructure cname and detail
    await connectDB();  // Connect to the database
    
    try {
        // Create a new course
        await Course.create({
            cname,  // Use cname from the request body
            detail  // Use detail from the request body
        });

        // Respond with a success message
        return NextResponse.json({ msg: "Create Course success" }, { status: 200 });
    } catch (error) {
        // Handle any errors during the database operation
        return NextResponse.json({ msg: "Error creating course", error: error.message }, { status: 500 });
    }
}


export async function GET(request) {

    await connectDB();
    const courses = await Course.find()
    return NextResponse.json({courses})
}