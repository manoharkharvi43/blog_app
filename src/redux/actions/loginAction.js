import { LOGIN_USER, LOGOUT_USER } from "../constants/constants";

export const loginAction = () => {
  return {
    type: LOGIN_USER
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT_USER
  };
};
