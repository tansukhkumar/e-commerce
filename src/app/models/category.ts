 import {Schema,model} from 'mongoose';

 const categorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, 
    isLive: {
        type: Boolean,
        default: true
    }
 });

 export const Category = model('Category', categorySchema)