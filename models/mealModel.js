import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  title: String,
  id: String,
  products: [Object],
  nutrients: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  creator: {
    type: String,
    default: "",
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

export default mongoose.model("Meal", mealSchema);
