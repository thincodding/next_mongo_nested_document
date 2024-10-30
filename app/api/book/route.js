import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import {Books} from '../../../models/books'

export async function POST(request){
    try{
        await connectDB();

        const body = await request.json();
        const {bookName, price, author} = body;

        if(!bookName || !price || !author){
            return NextResponse.json({error: "All fields must be input"}, {status: 400})
        }
        
        const books = await Books.create({
            bookName,
            price,
            author
        })

        return NextResponse.json({msg: "Save book success full", books}, {status: 201})
    }
    catch(err){
        console.log(err)
    }
}