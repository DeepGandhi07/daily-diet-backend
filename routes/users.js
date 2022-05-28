import express from "express";
import {
  getUsers,
  signin,
  signup,
  updateProfile,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:id", auth, updateProfile);

export default router;
