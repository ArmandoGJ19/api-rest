import {Schema, model} from 'mongoose';
// modelo para la base de datos
const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false
});
export default model('Product', productSchema);