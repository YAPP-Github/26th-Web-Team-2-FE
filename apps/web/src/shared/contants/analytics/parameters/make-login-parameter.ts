import type { LoginMethod } from "../property-type";

export const makeLoginParameter = (loginMethod: LoginMethod) => ({
  login_method: loginMethod,
});
