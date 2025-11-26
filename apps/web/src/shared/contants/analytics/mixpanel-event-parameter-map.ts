import { makeBoardCreateParameter } from "./parameters/make-board-create-parameter";
import { makeBoardUrlInviteParameter } from "./parameters/make-board-url-invite-parameter";
import { makeLoginParameter } from "./parameters/make-login-parameter";
import { makeLogoutParameter } from "./parameters/make-logout-parameter";
import { makeSignoutParameter } from "./parameters/make-signout-parameter";
import { makeSignupParameter } from "./parameters/make-signup-parameter";

export const EventParameterMap = {
  SIGNUP: makeSignupParameter,
  LOGIN: makeLoginParameter,
  LOGOUT: makeLogoutParameter,
  SIGNOUT: makeSignoutParameter,
  BOARD_CREATE: makeBoardCreateParameter,
  BOARD_URL_INVITE: makeBoardUrlInviteParameter,
} as const;

export const EventNameMapper = {
  SIGNUP: "signup",
  LOGIN: "login",
  LOGOUT: "logout",
  SIGNOUT: "signout",
  BOARD_CREATE: "board_create",
  BOARD_URL_INVITE: "board_url_invite",
} as const;

export type EventName = keyof typeof EventParameterMap;
