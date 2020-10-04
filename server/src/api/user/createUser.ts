import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import uuid from "uuid";
import { User } from "../../models/User.model";
import Debug from "../helpers/Debug";

export const createUser = (
  name: string,
  login: string,
  password: string,
  admin: boolean,
  active: boolean,
  callback: Function
) => {
  Sql.query("SELECT useLogin FROM HTLUsers WHERE useLogin = ?", [login], async (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length > 0) return callback(Error.loginExists, null);

    const salt = await Bcrypt.genSalt();
    const hashPassword = await Bcrypt.hash(password, salt);

    Sql.query(
      "INSERT INTO HTLUsers (useId, useName, useLogin, useAdmin, useActive, usePassword, useSalt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [uuid.v4(), name, login, false, true, hashPassword, salt],
      (err) => {
        Debug.log(err);
        if (err) return callback(Error.unknownError, null);
        Sql.query("SELECT * FROM HTLUsers WHERE useLogin = ?", [login], (err, rows) => {
          if (err) return callback(Error.unknownError, null);

          const dbUser = rows[0];
          const token = JWT.sign({ uuid: dbUser.useId }, process.env.TOKEN_SECRET);

          Sql.query(
            "INSERT INTO HTLTokens (tokId, tokToken, tokUseId, tokValid) VALUES (?, ?, ?, TRUE)",
            [uuid.v4(), token, dbUser.useId],
            (err) => {
              Debug.log(err);
              if (err) return callback(Error.unknownError, null);
              const user = new User(dbUser.useId, dbUser.useName, dbUser.useLogin, dbUser.useAdmin, dbUser.useActive);
              callback(null, user, token);
            }
          );
        });
      }
    );
  });
};
