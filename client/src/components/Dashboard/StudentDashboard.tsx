import React, { useContext } from "react";
import { Button, Menu, Container, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import StudentTable from "../Tables/StudentTable";
import { AuthContext } from "../../context/authContext";

function StudentDashboard() {
    const history = useHistory();
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <Menu style={{ fontSize: "1.5rem" }}>
                {user.name ? (
                    <Menu.Item position='left'>
                        <Header>Hi, {user.name}!</Header>
                    </Menu.Item>
                ) : (
                    <div>loading...</div>
                )}
                <Menu.Item position='right'>
                    <Button
                        onClick={() => {
                            logout();
                            history.push("/login");
                        }}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu>
            <Container textAlign='center'>
                <Header
                    style={{
                        textAlign: "center",
                        fontSize: "4rem",
                        marginTop: "3rem",
                    }}
                    size='huge'>
                    Applications
                </Header>
                <Button
                    style={{ marginTop: "2rem", fontSize: "1.2rem" }}
                    color='violet'
                    onClick={() => history.push("/new-application")}>
                    Apply New
                </Button>
                <Container style={{ marginTop: "6em" }}>
                    <StudentTable />
                </Container>
            </Container>
        </div>
    );
}

export default StudentDashboard;
