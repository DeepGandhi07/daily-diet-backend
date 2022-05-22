import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
