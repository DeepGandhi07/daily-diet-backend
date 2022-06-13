import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  id: String,
  category: String,
  nutrients: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  amount: Number,
  creator: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleDateString("en-GB"),
  },
  private: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Product", productSchema);
