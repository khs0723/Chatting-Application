import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authActions = {
  SET_USER_DATA: "AUTH.SET_USER_DATA",
};

export const getActions = (dispatch) => {
  return {
    login: (userData, navigate) => dispatch(login(userData, navigate)),
    register: (userData, navigate) => dispatch(register(userData, navigate)),
    setUserData: (userData) => dispatch(setUserData(userData)),
  };
};

const setUserData = (userData) => {
  return {
    type: authActions.SET_USER_DATA,
    userData,
  };
};

const login = (userData, navigate) => {
  return async (dispatch) => {
    const res = await api.login(userData);
    if (res.error) {
      console.log(res?.exception?.response?.data.error);
      dispatch(openAlertMessage(res?.exception?.response?.data.error));
    } else {
      const { userData } = res?.data;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUserData(userData));
      navigate("/dashboard");
    }
  };
};

const register = (userData, navigate) => {
  return async (dispatch) => {
    const res = await api.register(userData);
    console.log(res);

    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data.error));
    } else {
      const { userData } = res?.data;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUserData(userData));
      navigate("/dashboard");
    }
  };
};
