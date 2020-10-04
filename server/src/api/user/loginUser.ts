import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import uuid from "uuid";
import { User } from "../../models/User.model";
import Debug from "../helpers/Debug";

export const loginUser = (login: string, password: string, callback: Function) => {
  Sql.query(
    "SELECT useId, useName, useLogin, useAdmin, useActive FROM HTLUsers WHERE useLogin = ?",
    [login],
    async (err, rows) => {
      Debug.log(err);
      if (err) return callback(Error.unknownError, null);
      if (rows.length != 1) return callback(Error.loginFailed, null);

      const dbUser = rows[0];
      const comparePassword = await Bcrypt.compare(password, dbUser.usePassword);
      if (!comparePassword) return callback(Error.loginFailed);

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
    }
  );
};
