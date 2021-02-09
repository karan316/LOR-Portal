import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import { User } from "../services/userService";

const initialState = {
    user: null,
};

if (localStorage.getItem("jwtToken")) {
    const decodedToken: any = jwtDecode(localStorage.getItem("jwtToken")!);
    // if the token has expired (get the time in milliseconds and compare with current time) -> remove the token
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

// used to access our context
const AuthContext = createContext({
    user: {
        id: "",
        email: "",
        name: "",
        department: { name: "" },
        type: "",
        regNo: "",
        token: "",
    },
    setUser: (userData: User) => {},
    logout: () => {},
});

interface Action {
    type: string;
    payload?: any;
}
interface AuthReducerState {
    user:
        | {
              id: string;
              email: string;
              name: string;
              department: { name: string };
              type: string;
              regNo: string;
              token: string;
          }
        | null
        | undefined;
}
function authReducer(
    state: AuthReducerState,
    action: Action
): AuthReducerState {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

interface AuthProps {}
function AuthProvider(props: AuthProps) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function setUser(userData: User) {
        localStorage.setItem("jwtToken", userData.token!);
        dispatch({ type: "LOGIN", payload: userData });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user!, setUser, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
