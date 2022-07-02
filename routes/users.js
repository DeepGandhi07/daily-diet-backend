import express from "express";
import {
  getUsers,
  externalSignin,
  signin,
  signup,
  updateProfile,
  updateUserData,
  deleteUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/externalsignin", externalSignin);
router.patch("/:id", auth, updateProfile);
router.patch("/:id", auth, updateUserData);
router.delete("/:id", auth, deleteUser);

export default router;
