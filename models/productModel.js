import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  id: String,
  category: String,
  nutrients: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  amount: Number,
  creator: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  private: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Product", productSchema);
