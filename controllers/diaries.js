import mongoose from "mongoose";
import Diary from "../models/diaryModel.js";

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ creator: req.userId });

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
    createdAt: new Date().toISOString(),
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

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Diary not found");

  const updatedDiary = await Diary.findByIdAndUpdate(_id, diary, {
    new: true,
  });
  res.json(updatedDiary);
};

export const deleteDiary = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Diary not found");

  await Diary.findByIdAndRemove(_id);

  res.json({ message: "Diary deleted" });
};
