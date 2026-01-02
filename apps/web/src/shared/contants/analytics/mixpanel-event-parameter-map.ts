import { makeBoardCreateParameter } from "./parameters/make-board-create-parameter";
import { makeBoardUrlInviteParameter } from "./parameters/make-board-url-invite-parameter";
import { makeHotelAddParameter } from "./parameters/make-hotel-add";
import { makeLoginParameter } from "./parameters/make-login-parameter";
import { makeLogoutParameter } from "./parameters/make-logout-parameter";
import { makeSignoutParameter } from "./parameters/make-signout-parameter";
import { makeSignupParameter } from "./parameters/make-signup-parameter";
import { makeTableCreateParameter } from "./parameters/make-table_create";
import { makeTableUrlShareParameter } from "./parameters/make-table-url-share";

export const EventParameterMap = {
  SIGNUP: makeSignupParameter,
  LOGIN: makeLoginParameter,
  LOGOUT: makeLogoutParameter,
  SIGNOUT: makeSignoutParameter,
  BOARD_CREATE: makeBoardCreateParameter,
  BOARD_URL_INVITE: makeBoardUrlInviteParameter,
  HOTEL_ADD: makeHotelAddParameter,
  TABLE_CREATE: makeTableCreateParameter,
  TABLE_URL_SHARE: makeTableUrlShareParameter,
} as const;

export const EventNameMapper = {
  SIGNUP: "signup",
  LOGIN: "login",
  LOGOUT: "logout",
  SIGNOUT: "signout",
  BOARD_CREATE: "board_create",
  BOARD_URL_INVITE: "board_url_invite",
  HOTEL_ADD: "hotel_add",
  TABLE_CREATE: "table_create",
  TABLE_URL_SHARE: "table_url_share",
} as const;

export type EventName = keyof typeof EventParameterMap;
