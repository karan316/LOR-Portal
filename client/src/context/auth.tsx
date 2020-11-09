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
    user: {},
    login: (userData: User) => {},
    logout: () => {},
});

interface Action {
    type: string;
    payload?: any;
}
interface AuthReducerState {
    user?:
        | {
              email: string;
              name: string;
              department: { name: string };
              type: string;
              regNo: string;
              token: string;
          }
        | undefined
        | null;
}
function authReducer(
    state: AuthReducerState,
    action: Action
): AuthReducerState {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, // spread the existing state
                user: action.payload, // payload has the user
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
// used to provide the access of the context
function AuthProvider(props: AuthProps) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData: User) {
        localStorage.setItem("jwtToken", userData.token!);
        dispatch({ type: "LOGIN", payload: userData });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user!, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
