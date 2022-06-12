import express from "express";
import {
  getMeals,
  getUserMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} from "../controllers/meals.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMeals);
router.get("/", auth, getUserMeals);
router.post("/", auth, createMeal);
router.patch("/:id", auth, updateMeal);
router.delete("/:id", auth, deleteMeal);

export default router;
