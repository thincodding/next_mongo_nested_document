
import mongoose, { Schema } from "mongoose";
const embeddedNestedCategorySchema = new Schema({
    names: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    }
})

const embeddedCategorySchema = new Schema({
    subname: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    nested: {
        type: [embeddedNestedCategorySchema],
        require: false
    }
}); 

const categorySchema = new Schema({
    cname: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    subcategory: {
        type: [embeddedCategorySchema],
        required: false,
    },
}, {
    timestamps: true, 
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);