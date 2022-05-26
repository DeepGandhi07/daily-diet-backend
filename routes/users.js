import express from "express";
import { signin, signup } from "../controllers/users.js";
import { updateProfile } from "../controllers/users.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", updateProfile);

export default router;
