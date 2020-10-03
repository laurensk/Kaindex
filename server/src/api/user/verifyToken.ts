import { Request } from "express";
import { Sql } from "../../Database";
import { NextFunction } from "express";
import { Error } from "../helpers/ErrorHandling";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader: string = req.headers["authorization"];

  if (!bearerHeader) return Error.sendError(res, Error.unauthenticated);

  const bearer: string[] = bearerHeader.split(" ");
  const bearerToken: string = bearer[1];

  Sql.query("SELECT tokUseId FROM HTLTokens WHERE tokToken = ? AND tokValid = TRUE", [bearerToken], (err, rows) => {
    if (err) return Error.sendError(res, Error.unknownError);
    if (rows.length != 1) return Error.sendError(res, Error.invalidToken);
    req.body.uuid = rows[0].tokUseId;
    next();
  });
};
