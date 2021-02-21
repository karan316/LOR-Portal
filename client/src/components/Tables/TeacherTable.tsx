import React, { useContext, useState } from "react";
import { Table, Header, Icon, Message } from "semantic-ui-react";
import { useQuery } from "react-query";
import http from "../../services/http";
import ViewButton from "../ViewApplication/ViewButton";
import { Application } from "../../services/user";
import { AuthContext } from "../../context/authContext";

function TeacherTable() {
    const [facultyApplications, setFacultyApplications] = useState<
        Application[]
    >();
    const { user } = useContext(AuthContext);
    const { data: applications } = useQuery(
        "fetchFacultyApplications",
        async () => {
            const { data } = await http.get(
                `http://localhost:4000/api/applications/${user.id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                    },
                }
            );
            return data;
        },
        {
            onSuccess: () => {
                if (applications) {
                    console.log("faculty applications ", applications);
                    setFacultyApplications(applications);
                }
            },
            onError: () => {
                console.log("Could not fetch applications");
            },
        }
    );
    return (
        <>
            <Header
                floated='left'
                style={{
                    fontSize: "3.5rem",
                    marginBottom: "1em",
                    fontFamily: "'Nunito', sans-serif",
                }}>
                Applications
            </Header>
            <Table
                striped
                fixed
                verticalAlign='middle'
                style={{ fontSize: "1.5rem" }}>
                <Table.Row style={{ margin: "0 auto" }}>
                    {!facultyApplications && (
                        <Message icon>
                            <Icon
                                name='circle notched'
                                loading
                                color='violet'
                            />
                            <Message.Content>
                                <Message.Header>Just a moment</Message.Header>
                                Searching for your applications...
                            </Message.Content>
                        </Message>
                    )}
                </Table.Row>
                {facultyApplications && (
                    <>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Application ID
                                </Table.HeaderCell>
                                <Table.HeaderCell>Student</Table.HeaderCell>
                                <Table.HeaderCell>Department</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>{}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {facultyApplications.map((application) => (
                                <Table.Row key={application._id}>
                                    <Table.Cell>{application._id}</Table.Cell>
                                    <Table.Cell>
                                        {application.student.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {application.studentDepartment}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {application.status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ViewButton application={application} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </>
                )}
            </Table>
        </>
    );
}

export default TeacherTable;
