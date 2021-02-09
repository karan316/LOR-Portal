import React, { useContext, useState } from "react";
import { Table } from "semantic-ui-react";
import { Application } from "../../services/user";
import { useQuery } from "react-query";
import http from "../../services/http";
import { AuthContext } from "../../context/authContext";
function StudentTable() {
    const [studentApplications, setStudentApplications] = useState<
        Application[]
    >();
    const { user } = useContext(AuthContext);
    const { data: applications } = useQuery(
        "fetchApplications",
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
                console.log("student applications ", applications);
                setStudentApplications(applications);
            },
            onError: () => {
                console.log("Could not fetch applications");
            },
        }
    );
    function getPositiveStatus(status: string): boolean | undefined {
        if (status === "accepted") {
            return true;
        } else if (status === "pending") {
            return undefined;
        }
    }
    function getNegativeStatus(status: string): boolean | undefined {
        if (status === "rejected") {
            return true;
        } else if (status === "pending") {
            return undefined;
        }
    }
    return (
        <div>
            <Table
                striped
                fixed
                verticalAlign='middle'
                style={{ fontSize: "1.5rem" }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Application ID</Table.HeaderCell>
                        <Table.HeaderCell>Teacher</Table.HeaderCell>
                        <Table.HeaderCell>Department</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {studentApplications &&
                        studentApplications.map(
                            (studentApplication: Application) => (
                                <Table.Row key={studentApplication._id}>
                                    <Table.Cell>
                                        {studentApplication._id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {studentApplication.faculty.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {studentApplication.facultyDepartment}
                                    </Table.Cell>
                                    <Table.Cell
                                        negative={getNegativeStatus(
                                            studentApplication.status
                                        )}
                                        positive={getPositiveStatus(
                                            studentApplication.status
                                        )}>
                                        {studentApplication.status}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        )}
                </Table.Body>
            </Table>
        </div>
    );
}

export default StudentTable;
