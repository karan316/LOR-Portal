import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard() {
    const [role, setRole] = useState("");
    const { user } = useContext(AuthContext);
    useEffect(() => {
        setRole(user.type);
        return () => {};
    }, [user.type]);

    if (role === "student") {
        return <StudentDashboard />;
    } else if (role === "faculty") {
        return <TeacherDashboard />;
    }
    return null;
}

export default Dashboard;
