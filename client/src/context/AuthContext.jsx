import { createContext, useReducer, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { token: null, user: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    token: localStorage.getItem("token"),
    user: null
  });


  useEffect(() => {
    if (!state.token) return;
    api.get("/api/auth/me").then(res =>
      dispatch({ type: "SET_USER", payload: res.data })
    ).catch(() => dispatch({ type: "LOGOUT" }));
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
