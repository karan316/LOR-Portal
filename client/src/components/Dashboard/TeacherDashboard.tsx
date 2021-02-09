import React, { useContext } from "react";
import { Button, Menu, Container, Header } from "semantic-ui-react";
import TeacherTable from "../Tables/TeacherTable";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function TeacherDashboard() {
    const { user } = useContext(AuthContext);
    const history = useHistory();
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
                    <Button onClick={() => history.push("/login")}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu>
            <Container textAlign='center'>
                <Container style={{ marginTop: "6em" }}>
                    <TeacherTable />
                </Container>
            </Container>
        </div>
    );
}

export default TeacherDashboard;
