import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import { Category } from "../../../models/category";



// export async function POST(request) {
//     const { cname, detail,subcategory } = await request.json();  // Destructure cname and detail
//     await connectDB();  // Connect to the database

//     try {
//         // Create a new course
//         await Category.create({
//             cname, 
//             detail,
//             subcategory
//         });

//         // Respond with a success message
//         return NextResponse.json({ msg: "Create category success" }, { status: 200 });
//     } catch (error) {
//         // Handle any errors during the database operation
//         return NextResponse.json({ msg: "Error creating cateogory", error: error.message }, { status: 500 });
//     }
// }


export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();

        const body = await request.json();

        const { nestedDetail, cate, subCate } = body;

        // Validate required fields
        if (!nestedDetail || !Array.isArray(nestedDetail) || nestedDetail.length === 0 || !cate || !subCate) {
            return NextResponse.json({ error: "Missing required fields or invalid Nested format" }, { status: 400 });
        }

        // Fetch the category by ID
        const cateDoc = await Category.findById(cate);
        if (!cateDoc) {
            return NextResponse.json({ error: "Category ID is invalid" }, { status: 400 });
        }

        // Fetch the subcategory by ID from the category document
        const subCateDoc = cateDoc.subcategory.id(subCate);
        if (!subCateDoc) {
            return NextResponse.json({ error: "Subcategory ID is invalid" }, { status: 400 });
        }

        
         // Prepare the nested details to be added with timestamps
         const currentTimestamp = new Date(); // Get the current date and time
         const NestDetailsDocuments = nestedDetail.map((nest) => ({
             names: nest.names,
             detail: nest.detail,
             createdAt: currentTimestamp, 
             updatedAt: currentTimestamp, 
         }));

        console.log("Generated Nested Documents:", NestDetailsDocuments);

        // Update the subcategory's nested array
        await Category.updateOne(
            { _id: cate, "subcategory._id": subCate }, // Find the correct category and subcategory by ID
            { $push: { "subcategory.$.nested": { $each: NestDetailsDocuments } } } // Push into the nested array of the subcategory
        );

        // Return success response
        return NextResponse.json({ msg: "Nested Detail added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error); // Log the full error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET() {

    await connectDB();
    const category = await Category.find();
    return NextResponse.json({ category });

}