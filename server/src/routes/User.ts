import express from "express";
const router = express.Router();

router.route("/").get((res, req) => {
  req.send("hello");
});

export default router;
