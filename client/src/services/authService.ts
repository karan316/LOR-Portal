import http from "./http";
import { API_URL } from "../config";

const API_ENDPOINT = API_URL + "/auth";

export async function login(user: any) {
    return await http.post(API_ENDPOINT, {
        email: user.email,
        password: user.password,
    });
}
