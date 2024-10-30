import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import { Category } from "../../../../models/category"; 


export async function GET(request, {params}){
    const {id} = params
    await connectDB();
    const category = await Category.findById({_id: id})
    return NextResponse.json({category}, {status: 200})
}

