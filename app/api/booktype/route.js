import { NextResponse } from "next/server";
import connectDB from "../../../config/db"; // Ensure this is the correct path
import { Member } from '../../../models/number'; // Adjust according to your model structure
import { BookType } from "../../../models/booktype";

// Upload to form
export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();

        // Extract the body data from the request
        const body = await request.json();
        const { cname, detail, member } = body;

        // Validate required fields
        if (!cname || !detail || !member) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Validate the member field type (assuming it's a single ID)
        if (typeof member !== 'string') {
            return NextResponse.json({ error: "Invalid member format, expected a string ID" }, { status: 400 });
        }

        // Fetch member document by ID
        const memberDoc = await Member.findById(member);

        // Check if the member ID is valid
        if (!memberDoc) {
            return NextResponse.json({ error: "Member ID is invalid" }, { status: 400 });
        }

        // Create the new BookType entry with the valid member
        const newBookType = await BookType.create({
            cname,
            detail,
            member: {
                names: memberDoc.names,  // Assuming your Member schema has a 'names' field
                detail: memberDoc.detail, // Assuming your Member schema has a 'detail' field
            },
        });

        // Return success response with relevant fields
        return NextResponse.json({ msg: "Member created successfully", newBookType }, { status: 201 });
    } catch (error) {
        // Handle any errors during the creation process
        console.error('Error creating member:', error); // Log error for debugging
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
