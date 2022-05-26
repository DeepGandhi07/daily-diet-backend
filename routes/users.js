import express from "express";
import { signin, signup, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", auth, updateProfile);

export default router;
