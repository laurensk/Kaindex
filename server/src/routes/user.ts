import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyToken } from "../api/user/verifyToken";
import Joi from "@hapi/joi";
import { getUser } from "../api/user/getUser";
import { loginUser } from "../api/user/loginUser";
import Debug from "../api/helpers/Debug";
const router = express.Router();

router.route("/").get(verifyToken, (req, res) => {
  const uuid = req.body.uuid;
  getUser(uuid, (error, user) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      user: user,
    });
  });
});

router.route("/login").post((req, res) => {
  const validation = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = validation.validate(req.body);
  Debug.log(error);
  if (error) return Error.sendError(res, Error.validationError);

  loginUser(req.body.email, req.body.password, (error, user, token) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.header("auth-token", token);
    res.json({
      user: user,
    });
  });
});

export default router;
