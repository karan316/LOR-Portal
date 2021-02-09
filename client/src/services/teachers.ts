// import http from "./http";

export interface Faculty {
    name: string;
    _id: string;
    department: {
        name: string;
    };
}
export interface FacultyList {
    key: string;
    text: string;
    value: string;
}
