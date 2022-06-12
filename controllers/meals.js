import mongoose from "mongoose";
import Meal from "../models/mealModel.js";

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({
      creator: { $ne: req.userId },
      $sample: { size: 20 },
    });

    res.status(200).json(meals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ creator: req.userId });

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

  const updatedMeal = await Meal.findByIdAndUpdate(_id, meal, {
    new: true,
  });
  res.json(updatedMeal);
};

export const deleteMeal = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Meal not found");

  await Meal.findByIdAndRemove(_id);

  res.json({ message: "Meal deleted" });
};
