import React, { useState, useContext } from "react";
import { Department, DepartmentList } from "../../services/departments";
import {
    Button,
    Form,
    Select,
    TextArea,
    Container,
    Message,
} from "semantic-ui-react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { useHistory } from "react-router-dom";
import http from "../../services/http";
import { Faculty, FacultyList } from "../../services/teachers";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/authContext";

interface FormData {
    statementOfPurpose: string;
    faculty: string;
    department: string;
}
function ApplicationForm() {
    const { user } = useContext(AuthContext);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [validationError, setValidationError] = useState<string>("");
    const history = useHistory();
    const initialState: FormData = {
        statementOfPurpose: "",
        faculty: "",
        department: "",
    };
    const { data: departmentData } = useQuery("fetchDepartments", async () => {
        const { data } = await http.get(
            "http://localhost:4000/api/departments"
        );
        return data;
    });
    const { onChange, onSubmit, onSelectChange, values } = useForm<FormData>(
        applicationFormCallback,
        initialState
    );

    let departmentOptions: DepartmentList[] = [];
    if (departmentData) {
        const departments: Department[] = departmentData;
        departmentOptions = departments.map(
            (dept: Department): DepartmentList => {
                return {
                    key: dept._id,
                    text: dept.name,
                    value: dept.name,
                };
            }
        );
    }

    async function applicationFormCallback() {
        let application = {
            faculty: "",
            facultyDepartment: "",
            student: "",
            studentDepartment: "",
            statementOfPurpose: "",
            status: "pending",
        };
        application.faculty = values.faculty;
        application.facultyDepartment = values.department;
        application.statementOfPurpose = values.statementOfPurpose;
        application.student = user.id;
        application.studentDepartment = user.department.name;
        const allowSubmission = (): boolean => {
            if (values.faculty.length < 0) {
                setValidationError("Please select a faculty.");
            }
            if (values.statementOfPurpose.length < 10) {
                setValidationError(
                    "Statement of purpose should be at least 10 characters."
                );
            }
            if (validationError.length === 0) return false;
            return true;
        };

        if (allowSubmission()) {
            try {
                const response: AxiosResponse | undefined = await http.post(
                    "http://localhost:4000/api/applications/",
                    application,
                    {
                        headers: {
                            Authorization: localStorage.getItem("jwtToken"),
                        },
                    }
                );
                console.log(
                    "Application submitted successfully. ",
                    response?.data
                );
                history.goBack();
            } catch (error) {
                // TODO: display error message to the user
                console.log("Could not submit application: ", error);
            }
        }
    }

    const { data, isLoading, refetch } = useQuery(
        "fetchFaculty",
        async () => {
            const { data } = await http.get(
                "http://localhost:4000/api/faculties"
            );
            return data;
        },
        {
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );
    async function fetchFaculty(values: FormData) {
        setSelectedDepartment(values.department);
        await refetch();
    }

    let facultyOptions: FacultyList[] = [];
    if (data) {
        const faculties: Faculty[] = data;
        facultyOptions = faculties
            .filter((faculty: Faculty) => {
                return faculty.department.name === selectedDepartment;
            })
            .map((faculty: Faculty) => {
                return {
                    key: faculty._id,
                    text: faculty.name,
                    value: faculty._id,
                };
            });
    }
    return (
        <Container style={{ padding: "4em", marginTop: "2.5em" }}>
            <Button
                style={{ marginBottom: "2em" }}
                onClick={() => history.goBack()}>
                Back
            </Button>
            <Form onSubmit={onSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        label='Department'
                        name='department'
                        required
                        options={departmentOptions}
                        placeholder='Department'
                        onChange={onSelectChange}
                    />
                    <Form.Field>
                        <Button
                            style={{ marginTop: "1.8em" }}
                            type='button'
                            loading={isLoading}
                            onClick={() => fetchFaculty(values)}>
                            CONFIRM
                        </Button>
                    </Form.Field>
                </Form.Group>
                {facultyOptions.length !== 0 ? (
                    <Form.Field
                        control={Select}
                        label='Faculty'
                        name='faculty'
                        required
                        options={facultyOptions}
                        placeholder='Faculty'
                        onChange={onSelectChange}
                    />
                ) : (
                    <Message>
                        {selectedDepartment.length > 0 ? (
                            <Message.Content>
                                <Message.Header>
                                    No faculty found for this department.
                                </Message.Header>
                                {`Please contact ${values.department} department for more information.`}
                            </Message.Content>
                        ) : (
                            <Message.Content>
                                Select a department and click{" "}
                                <span style={{ fontWeight: 800 }}>CONFIRM</span>
                            </Message.Content>
                        )}
                    </Message>
                )}
                <Form.Input
                    control={TextArea}
                    required
                    label='Statement of Purpose'
                    placeholder='Include your achievements and why you want this LOR...'
                    name='statementOfPurpose'
                    style={{ height: "400px" }}
                    as={Form.Field}
                    onChange={onChange}
                />
                <Form.Field>
                    <Button type='submit' color='violet'>
                        Submit
                    </Button>
                </Form.Field>
                {validationError.length > 0 && selectedDepartment.length > 0 && (
                    <Message error>
                        <Message.Content>{validationError}</Message.Content>
                    </Message>
                )}
            </Form>
        </Container>
    );
}

export default ApplicationForm;
