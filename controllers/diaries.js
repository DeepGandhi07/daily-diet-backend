import mongoose from "mongoose";
import DiaryModel from "../models/diaryModel.js";

export const getDiaries = async (req, res) => {
  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const diaries = await DiaryModel.find();

    res.status(200).json(diaries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDiary = async (req, res) => {
  const diary = req.body;

  const newDiary = new DiaryModel(diary);

  try {
    // if (!req.userId) return res.json({ message: "Unauthenticated" });
    await newDiary.save();

    res.status(201).json(newDiary);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDiary = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const { id: _id } = req.params;

  const diary = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Diary not found.");

  const updatedDiary = await DiaryModel.findByIdAndUpdate(_id, diary, {
    new: true,
  });
  res.json(updatedDiary);
};

export const deleteDiary = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Diary not found.");

  await DiaryModel.findByIdAndRemove(_id);

  res.json({ message: "Diary deleted" });
};
