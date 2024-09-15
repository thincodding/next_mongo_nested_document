
import {NextResponse } from "next/server";
import connectDB from "../../../config/db";
import { Product } from "../../../models/product";


export async function POST(request) {

    const {pname, qty, price} = await request.json();
    await connectDB();
    await Product.create({
        pname,
        qty,
        price
    })

    return NextResponse.json({msg: "Create Product success"}, {status: 200})

}


export async function GET(request) {

    await connectDB();
    const product = await Product.find()
    return NextResponse.json({product})
}