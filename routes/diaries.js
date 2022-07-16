import express from "express";
import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  rateDiary,
} from "../controllers/diaries.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDiaries);
router.post("/", auth, createDiary);
router.patch("/:id", auth, updateDiary);
router.patch("/rate/:id", auth, rateDiary);
router.delete("/:id", auth, deleteDiary);

export default router;
