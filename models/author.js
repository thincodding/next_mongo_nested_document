import mongoose, { Schema } from "mongoose";

const AuthorSchamar = new Schema({
    aname: {
        type: String,
        require: true,
    },
    dob:{
        type: Number,
        require: true,
    }
})

export const Author = AuthorSchamar;  