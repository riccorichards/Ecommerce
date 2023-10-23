import { login } from "../services/auth.services";
import {
  createSession,
  deleteSession,
  findSessions,
} from "../services/session.services";
import { signWihtJWT, verifyJWT } from "../utils/jwt.utils";
import log from "../utils/logger";
import { CookieOptions, Request, Response } from "express";
import config from "config";
import SessionModel from "../models/session.models";
import { get } from "lodash";
import { findUser } from "../services/user.services";

const accestokenOpetions: CookieOptions = {
  maxAge: config.get<number>("accessTokenTtl"),
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenOptions: CookieOptions = {
  ...accestokenOpetions,
  maxAge: config.get<number>("accessTokenTtl"),
};

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    //define user after logs in
    const user = await login(req.body);

    if (!user) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token
    const accessToken = signWihtJWT(
      { ...user, session: session?._id },
      { expiresIn: config.get<number>("accessTokenTtl") }
    );

    //create a refresh token
    const refreshToken = signWihtJWT(
      { ...user, session: session?._id },
      { expiresIn: config.get<number>("accessRefreshTtl") }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ err: error.message });
  }
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.json(sessions);
};

export const deleteUserSession = async (req: Request, res: Response) => {
  try {
    const sessionId = res.locals.user.session;
    const validSession = await deleteSession(
      { _id: sessionId },
      { valid: false }
    );
    if (!validSession) {
      return res.status(404).json({ msg: "The Session could not found!" });
    }
    return res.json({
      accessToken: null,
      refreshToken: null,
    });
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({ err: error.message });
  }
};

export const createNewAccessToken = async (refreshToken: string) => {
  try {
    const { decoded } = verifyJWT(refreshToken);

    if (!decoded && !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const newAccessToken = signWihtJWT(
      { ...user, session: session._id },
      { expiresIn: config.get<number>("accessTokenTtl") }
    );

    return newAccessToken;
  } catch (error: any) {
    log.error(error.message);
  }
};
