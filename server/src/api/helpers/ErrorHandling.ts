import { Response } from "express";

export class Error {
  // Send Error
  static sendError(res: any, error: { statusCode: number; message: string }) {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode || Error.unknownError.statusCode,
        message: error.message || Error.unknownError.message,
      },
    });
  }

  // User
  static unauthenticated = { statusCode: 403, message: "UNAUTHENTICATED" };
  static invalidToken = { statusCode: 400, message: "INVALID_TOKEN" };
  static unknownError = { statusCode: 400, message: "ERROR" };
  static validationError = { statusCode: 400, message: "VALIDATION_ERROR" };
  static loginExists = { statusCode: 400, message: "LOGIN_EXISTS" };
  static loginFailed = { statusCode: 400, message: "LOGIN_FAILED" };
}
