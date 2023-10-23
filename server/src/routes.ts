import { Express, Request, Response } from "express";
import { registerHandler } from "./controllers/auth.controller";
import {
  createSessionHandler,
  deleteUserSession,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { requestUser } from "./middleware/requestUser";
import { deserializeUser } from "./middleware/deserializeUser";
const routes = (app: Express) => {
  app.get("/api/v1/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post("/api/v1/auth", registerHandler);
  app.post("/api/v1/session", createSessionHandler);
  app.get(
    "/api/v1/session",
    [deserializeUser, requestUser],
    getUserSessionHandler
  );
  app.delete(
    "/api/v1/session",
    [deserializeUser, requestUser],
    deleteUserSession
  );
};

export default routes;
