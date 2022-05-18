import express from "express";
import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diaries.js";

const router = express.Router();

router.get("/", getDiaries);
router.post("/", createDiary);
router.patch("/:id", updateDiary);
router.delete("/:id", deleteDiary);

export default router;
