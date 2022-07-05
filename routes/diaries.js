import express from "express";
import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diaries.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDiaries);
router.post("/", auth, createDiary);
router.patch("/:id", auth, updateDiary);
router.delete("/:id", auth, deleteDiary);

export default router;
