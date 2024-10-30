import mongoose, {Schema} from "mongoose";
import { Author } from "./author";


const bookSchema = new Schema({

    bookName: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    author: [Author]
})
export const Books = mongoose.models.Books || mongoose.model("Books", bookSchema)