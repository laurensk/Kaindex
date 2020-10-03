import express, { NextFunction, Request, Response } from "express";
import path, { resolve } from "path";
import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();

app.use(express.json());
app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "..", "..", "build")));

function localRestricted(req: Request, res: Response, next: NextFunction) {
  if (req.ip == "::1") return next();
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
}

app.get("/api", localRestricted, (res, req) => {
  req.send("api");
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Kaindex started on port " + process.env.PORT || 8081);
});
