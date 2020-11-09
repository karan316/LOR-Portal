import http from "./http";
import { API_URL, SECRET_KEY } from "../config";

const API_ENDPOINT = API_URL + "/users";

export interface User {
    name: string;
    email: string;
    password: string;
    type: string;
    department: string;
    regNo: string;
    token?: string;
}

export function register(user: User) {
    return http.post(API_ENDPOINT, {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
        department: user.type,
        regNo: user.regNo,
    });
}
