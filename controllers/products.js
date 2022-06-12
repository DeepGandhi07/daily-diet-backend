import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new Product({
    ...product,
    creator: req.userId,
  });

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Product not found");

  const updatedProduct = await Product.findOneAndUpdate(
    { _id, creator: req.userId },
    product,
    {
      new: true,
    }
  );
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Product not found");

  await Product.findOneAndRemove({ _id, creator: req.userId });

  res.json({ message: "Product deleted" });
};
