import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  kcal: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  amount: Number,
  creator: {
    type: String,
    default: "admin",
  },
});

export default mongoose.model("Product", productSchema);
