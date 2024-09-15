
import mongoose, { Schema } from "mongoose";

const productSchamar = new Schema({
    pname: {
        type: String,
        require: true,
    },
    qty:{
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }
})

export const Product = mongoose.models.Product || mongoose.model("Product", productSchamar);  