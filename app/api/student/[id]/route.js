import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import { Student } from "../../../../models/student";

// DELETE function to delete a student by ID
export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        // Connect to the database
        await connectDB();

        // Find the student by ID and delete them
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "Student deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
