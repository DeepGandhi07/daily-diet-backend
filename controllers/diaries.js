import mongoose from "mongoose";
import Diary from "../models/diaryModel.js";

const returnResponse = (obj) => {
  return {
    _id: obj._id,
    title: obj.title,
    id: obj.id,
    meals: obj.meals,
    nutrients: obj.nutrients,
    calorieAdjustment: obj.calorieAdjustment,
    creator: obj.creator,
    createdAt: obj.createdAt,
    private: obj.private,
    ratingPublic: obj.ratingPublic,
  };
};

const calculateAverageRate = (ratingPrivate) => {
  if (ratingPrivate) {
    return (
      ratingPrivate.reduce((acc, rating) => acc + rating.rate, 0) /
      ratingPrivate.length
    );
  } else {
    return 0;
  }
};

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find().select({ ratingPrivate: 0, __v: 0 });

    res.status(200).json(diaries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDiary = async (req, res) => {
  const diary = req.body;

  const newDiary = new Diary({
    ...diary,
    creator: req.userId,
    createdAt: new Date().toLocaleDateString("en-GB"),
  });

  try {
    await newDiary.save();

    res.status(201).res.json(returnResponse(newDiary));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDiary = async (req, res) => {
  const { id: _id } = req.params;

  const diary = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Diary not found");

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id, creator: req.userId },
      {
        ...diary,
        ratingPrivate: [],
        ratingPublic: {
          average: 0,
          rates: 0,
        },
      },
      {
        new: true,
      }
    );
    res.json(returnResponse(updatedDiary));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteDiary = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Diary not found");

    await Diary.findOneAndRemove({ _id, creator: req.userId });

    res.json({ message: "Diary deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const rateDiary = async (req, res) => {
  const { id: _id } = req.params;

  const { rate } = req.body;

  try {
    const existingDiary = await Diary.findOne({ _id });
    if (!existingDiary)
      return res.status(404).json({ message: "Diary not found" });

    if (existingDiary.creator === req.userId)
      return res
        .status(400)
        .json({ message: "You cannot rate your own diary" });

    const ratingWithoutUser = existingDiary._doc.ratingPrivate.filter(
      (rating) => rating.user !== req.userId
    );

    const newRating = [...ratingWithoutUser, { user: req.userId, rate }];

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id },
      {
        ratingPrivate: newRating,
        ratingPublic: {
          average: calculateAverageRate(newRating),
          rates: newRating.length,
        },
      },
      {
        new: true,
      }
    );

    res.json(returnResponse(updatedDiary));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
