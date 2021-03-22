import React, { useContext, useState } from "react";
import { Table, Message, Icon } from "semantic-ui-react";
import { Application } from "../../services/user";
import { useQuery } from "react-query";
import http from "../../services/http";
import { AuthContext } from "../../context/authContext";
import { AxiosResponse } from "axios";

function StudentTable() {
    const [errors, setErrors] = useState({});
    const [studentApplications, setStudentApplications] = useState<
        Application[]
    >();
    const { user } = useContext(AuthContext);
    let response: AxiosResponse;
    // TODO: Check for no applications using status code
    const { data: applications, isLoading } = useQuery(
        "fetchApplications",
        async () => {
            response = await http.get(
                `http://localhost:4000/api/applications/${user.id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                    },
                }
            );
            return response?.data;
        },
        {
            onSuccess: () => {
                console.log("student applications: ", applications);
                setStudentApplications(applications);
            },
            onError: () => {
                setErrors(response?.data);
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
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>
            <Table
                striped
                fixed
                celled
                verticalAlign='middle'
                style={{ fontSize: "1.5rem" }}>
                <Table.Row style={{ margin: "0 auto" }}>
                    {isLoading && (
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
                    {!isLoading && errors && Object.keys(errors).length !== 0 && (
                        <Message>
                            <Message.Content>
                                <Message.Header>{errors}</Message.Header>
                                Click the Apply New Button to submit new LOR
                                applications.
                            </Message.Content>
                        </Message>
                    )}
                </Table.Row>
                {studentApplications && (
                    <>
                        <Table.Header>
                            <Table.Row style={{ textAlign: "center" }}>
                                <Table.HeaderCell>
                                    Application ID
                                </Table.HeaderCell>
                                <Table.HeaderCell>Teacher</Table.HeaderCell>
                                <Table.HeaderCell>Department</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body style={{ textAlign: "center" }}>
                            {studentApplications.map(
                                (studentApplication: Application) => (
                                    <Table.Row key={studentApplication._id}>
                                        <Table.Cell>
                                            {studentApplication._id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {studentApplication.faculty.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                studentApplication.facultyDepartment
                                            }
                                        </Table.Cell>
                                        <Table.Cell
                                            negative={getNegativeStatus(
                                                studentApplication.status
                                            )}
                                            positive={getPositiveStatus(
                                                studentApplication.status
                                            )}>
                                            {capitalizeFirstLetter(
                                                studentApplication.status
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            )}
                        </Table.Body>
                    </>
                )}
            </Table>
        </div>
    );
}

export default StudentTable;
