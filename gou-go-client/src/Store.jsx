import React, { createContext, useReducer, useEffect } from "react";
import server from "server";
const initialState = {
  user: {},
  text: "",
};

export const Context = createContext(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SIGNOUT":
        localStorage.removeItem("user_jwt");
        return { ...state, user: {} };
      default:
        return state;
    }
  }, initialState);
  useEffect(() => {
    let mounted = true;
    server
      .login()
      .then((res) => {
        if (res.data && res.data.success && res.data.data) {
          dispatch({ type: "SET_USER", payload: res.data.data });
        }
      })
      .catch((e) => console.log(e));
    return () => (mounted = false);
  }, []);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
