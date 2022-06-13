import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: {
    weight: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      default: 0,
    },
    activity: {
      type: Number,
      default: 0,
    },
    bmr: {
      type: Number,
      default: 0,
    },
    demandPercentage: {
      protein: {
        type: Number,
        default: 20,
      },
      carbs: {
        type: Number,
        default: 50,
      },
      fat: {
        type: Number,
        default: 30,
      },
    },
    demandAmount: {
      kcal: {
        type: Number,
        default: 0,
      },
      protein: {
        type: Number,
        default: 0,
      },
      carbs: {
        type: Number,
        default: 0,
      },
      fat: {
        type: Number,
        default: 0,
      },
    },
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleDateString("en-GB"),
  },
});

export default mongoose.model("User", userSchema);
