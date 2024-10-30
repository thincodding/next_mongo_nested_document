import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import { Member } from "../../../models/number";




export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();
        
        // Extract the body data from the request
        const body = await request.json();
        const { names, detail } = body;

        // Check if the required fields are present
        if (!names || !detail) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the student with the extracted data
        const student = await Member.create({
            names,
            detail,
        });
        // Return success response
        return NextResponse.json({ msg: "Create Member success", student }, { status: 201 });
    } catch (error) {
        // Handle any errors during the creation process
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function GET(request) {

    await connectDB();
    const member = await Member.find()
    return NextResponse.json({member})
}