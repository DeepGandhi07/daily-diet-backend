import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: {
    weight: Number,
    height: Number,
    age: Number,
    activity: Number,
    bmr: Number,
    demandPercentage: {
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    demandAmount: { kcal: Number, protein: Number, carbs: Number, fat: Number },
  },
});

export default mongoose.model("UserModel", userSchema);
