import React, { useState } from "react";
import { department, departmentList } from "../../services/departments";
import { Button, Form, Select, TextArea, Container } from "semantic-ui-react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { useHistory } from "react-router-dom";
import http from "../../services/http";
import { getTeacherList } from "../../services/teachers";
import { useForm } from "../../hooks/useForm";

const teachers = getTeacherList();

interface SubmitData {
    name: string;
    statementOfPurpose: string;
    teacher: string;
    department: string;
    registrationNumber: string;
}
//TODO: fetch teachers based on selected department
function ApplicationForm() {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const initialState: SubmitData = {
        name: "",
        statementOfPurpose: "",
        teacher: "",
        department: "",
        registrationNumber: "",
    };
    const { data, error, isLoading } = useQuery(
        "fetchDepartments",
        async () => {
            const { data } = await http.get(
                "http://localhost:4000/api/departments"
            );
            return data;
        }
    );
    const { onChange, onSubmit, onSelectChange, values } = useForm<SubmitData>(
        applicationFormCallback,
        initialState
    );

    let departmentOptions: departmentList[] = [];
    if (data) {
        console.log(data);

        const departments: department[] = data;
        departmentOptions = departments.map(
            (dept: department): departmentList => {
                return {
                    key: dept._id,
                    text: dept.name,
                    value: dept.name,
                };
            }
        );
    }

    async function applicationFormCallback() {
        let response: AxiosResponse | undefined;
        try {
        } catch (error) {
            console.log("Application Form Submit error: ", error);
        }
    }

    const {
        data: facultyData,
        error: facultyError,
        isLoading: isFacultyLoading,
        refetch,
    } = useQuery(
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
    function fetchTeachers(values: SubmitData) {
        // fetch teachers based on department
        setSelectedDepartment(values.department);
        refetch();
        console.log("facultyData", facultyData);
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
                            onClick={() => fetchTeachers(values)}>
                            CONFIRM
                        </Button>
                    </Form.Field>
                </Form.Group>
                <Form.Field
                    control={Select}
                    label='Teacher'
                    name='teacher'
                    required
                    options={teachers}
                    placeholder='Teacher'
                    onChange={onSelectChange}
                />
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
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
            </Form>
        </Container>
    );
}

export default ApplicationForm;
