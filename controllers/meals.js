import mongoose from "mongoose";
import Meal from "../models/mealModel.js";

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();

    res.status(200).json(meals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMeal = async (req, res) => {
  const meal = req.body;

  const newMeal = new Meal({
    ...meal,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newMeal.save();

    res.status(201).json(newMeal);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMeal = async (req, res) => {
  const { id: _id } = req.params;

  const meal = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Meal not found");

  const updatedMeal = await Meal.findOneAndUpdate(
    { _id, creator: req.userId },
    meal,
    {
      new: true,
    }
  );
  res.json(updatedMeal);
};

export const deleteMeal = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Meal not found");

  await Meal.findOneAndRemove({ _id, creator: req.userId });

  res.json({ message: "Meal deleted" });
};
