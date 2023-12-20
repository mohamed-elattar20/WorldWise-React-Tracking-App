import { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

const reducer = (currState, action) => {
  switch (action.type) {
    case "loginSuccess":
      return { ...currState, user: action.payload, isAuthenticated: true };
    case "loginFailed":
      return {
        ...currState,
        user: null,
        isAuthenticated: false,
        error: "The Email or the the Password is wrong",
      };
    case "logout":
      return { ...currState, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown Action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "loginSuccess", payload: FAKE_USER });
    } else {
      dispatch({ type: "loginFailed" });
    }
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth Context Was Used outside AuthProvider");
  }
  return context;
};
