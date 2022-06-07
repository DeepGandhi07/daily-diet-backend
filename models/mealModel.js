import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  name: String,
  demand: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  products: [Object],
  nutrients: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  demandCoverage: {
    kcal: { bgcolor: String, completed: Number, label: String },
    protein: { bgcolor: String, completed: Number, label: String },
    carbs: { bgcolor: String, completed: Number, label: String },
    fat: { bgcolor: String, completed: Number, label: String },
  },
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

export default mongoose.model("Meal", mealSchema);
