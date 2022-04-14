import { LOGIN_USER, LOGOUT_USER } from "../constants/constants";

const initalState = {
  isLoggedIn: false
};

export const loginActionReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};
