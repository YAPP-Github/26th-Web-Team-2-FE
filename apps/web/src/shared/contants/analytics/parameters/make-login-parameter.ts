import type { LoginMethod } from "../property-type";

export const makeLoginParameter = (login_method: LoginMethod) => ({
  login_method,
});
