import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  id: { type: String },
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
