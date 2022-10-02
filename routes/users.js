import express from "express";
import {
  getUsers,
  externalSignin,
  signin,
  signup,
  signupdemo,
  updateProfile,
  updateUserData,
  deleteUser,
  resetPassword,
  changePassword,
  changeNewsletterStatus,
  fakeUserNewsletterUnsubscribe,
  sendMessage,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signupdemo", signupdemo);
router.post("/externalsignin", externalSignin);
router.patch("/profile/:id", auth, updateProfile);
router.patch("/userData/:id", auth, updateUserData);
router.delete("/:id", auth, deleteUser);
router.post("/resetPassword", resetPassword);
router.patch("/changePassword/:token", changePassword);
router.patch("/changeNewsletterStatus/:id", auth, changeNewsletterStatus);
router.patch("/unsubscribe/:token", fakeUserNewsletterUnsubscribe);
router.post("/sendMessage", sendMessage);

export default router;
