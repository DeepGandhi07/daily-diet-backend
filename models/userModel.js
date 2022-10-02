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
    gender: {
      type: String,
      default: null,
    },
    activity: {
      type: Number,
      default: 0,
    },
    bmr: {
      type: Number,
      default: 0,
    },
    tdee: {
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
    type: String,
    default: new Date().toLocaleDateString("en-GB"),
  },
  lastLogged: {
    type: String,
    default: new Date().toLocaleDateString("en-GB"),
  },
  external: {
    type: Boolean,
    default: false,
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  expire_at: { type: Date, default: Date.now, expires: null },
  // 86400
});

export default mongoose.model("User", userSchema);
