import mongoose from "mongoose";
import Diary from "../models/diaryModel.js";

const calculateAverageRate = (diary) => {
  return (
    diary.rating.reduce((acc, rating) => acc + rating.rate, 0) /
    diary.rating.length
  );
};

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find();
    const protectedDiaries = diaries.map((diary) => {
      return {
        ...diary,
        rating: {
          rates: diary.rating.length,
          average: calculateAverageRate(diary),
        },
      };
    });

    res.status(200).json(protectedDiaries);
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

    res.status(201).json(newDiary);
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

    const existingDiary = await Diary.findOne({ _id });

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id, creator: req.userId },
      { ...diary, rating: existingDiary.rating },
      {
        new: true,
      }
    );

    res.json({
      ...updatedDiary,
      rating: {
        rates: updatedDiary.rating.length,
        average: calculateAverageRate(updatedDiary),
      },
    });
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

    const alreadyRated = existingDiary.rating.filter(
      (rating) => rating.user === req.userId
    );

    let updatedDiary;

    if (alreadyRated) {
      const ratingUpdate = existingDiary.rating.map((elem) =>
        elem.user === req.userId ? { user: req.userId, rate } : elem
      );

      updatedDiary = await Diary.findOneAndUpdate(
        { _id },
        { rating: ratingUpdate },
        {
          new: true,
        }
      );
    } else {
      updatedDiary = await Diary.findOneAndUpdate(
        { _id },
        { rating: [...existingDiary.rating, { user: req.userId, rate }] },
        {
          new: true,
        }
      );
    }

    res.json({
      ...updatedDiary,
      rating: {
        rates: updatedDiary.rating.length,
        average: calculateAverageRate(updatedDiary),
      },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
