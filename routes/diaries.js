import express from "express";
import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diaries.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", auth, getDiaries);
router.post("/", auth, createDiary);
router.patch("/:id", auth, updateDiary);
router.delete("/:id", auth, deleteDiary);

export default router;
