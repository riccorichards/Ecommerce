import { Express, Request, Response } from "express";
const routes = (app: Express) => {
  app.get("/api/v1/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );
};

export default routes;
