import Product from "../models/Product.js";
import product from "../models/Product.js";

export const getProducts = async (req, res) => {
   try {
       const products = await Product.find();
       if (products.length === 0) {
           return res.status(404).json({message: "No products found"});
       }
       res.json(products);
   }catch (error) {
       res.status(500).json({message: error.message});
   }
}
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const createProduct = async (req, res) => {
    try {
        const {name, price, category, imgUrl} = req.body;
        const newproduct = new Product({
            name,
            price,
            category,
            imgUrl
        });
        if (!newproduct) {
            return res.status(404).json({message: "Product not created"});
        }
        const productSave = await newproduct.save();
        res.status(201).json({message: "Product created", product: productSave});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const updateProductById = async (req, res) => {
    try {
        const {name, price, category, imgUrl} = req.body;
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, {
            name,
            price,
            category,
            imgUrl
        }, {new: true});
        if (!updateProduct) {
            return res.status(404).json({message: "Product not updated"});
        }
        res.json({message: "Product updated", product: updateProduct});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const deleteProductById = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deleteProduct) {
            return res.status(404).json({message: "Product not deleted"});
        }
        res.json({message: "Product deleted", product: deleteProduct});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}