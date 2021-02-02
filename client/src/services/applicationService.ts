import { Application } from "./user";
import http from "./http";
import { API_URL } from "../config";

const API_ENDPOINT = API_URL + "/applications";

export async function getStudentApplications(studentId: string) {
    const response = await http.get(API_ENDPOINT, {
        params: {
            studentId,
        },
    });
    return response;
}

export async function postStudentApplications(application: Application) {
    const response = await http.post(API_ENDPOINT, application);
    return response;
}

export async function getFacultyApplications(facultyId: string) {
    const response = await http.get(API_ENDPOINT, {
        params: {
            facultyId,
        },
    });
    return response;
}
