import http from "./http";
import { API_URL } from "../config";

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
// TODO: add register type
// export type registerInput = {
//     name: string;
//     email: string;
//     password: string;
//     type: string;
//     department: string;
//     regNo: string;
// };

export async function register(user: any) {
    return await http.post(API_ENDPOINT, {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
        department: user.department,
        regNo: user.regNo,
    });
}
