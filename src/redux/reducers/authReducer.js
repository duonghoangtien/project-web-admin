import { LOGIN, LOGOUT } from "../contants";

let user = JSON.parse(localStorage.getItem("userInfo"));
const initialState = user ? user : "";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
      };
    case LOGOUT: {
      return {
        user: "",
      };
    }
    default:
      return state;
  }
};

export default authReducer;
