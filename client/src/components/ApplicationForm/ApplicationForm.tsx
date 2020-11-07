import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import http from "../../services/http";
import {department, departmentList} from "../../services/departments";
import {
    Button,
    Form,
    Input,
    Select,
    TextArea,
    Container,
} from "semantic-ui-react";
import { getTeacherList } from "../../services/teachers";
import { useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";

const teachers = getTeacherList();

const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string(),
    registrationNumber: yup
        .string()
        .max(10)
        .required("Registration Number is required."),
    // TODO: add required() to teacher and department. CREATES ERRORS!
    teacher: yup.string(),
    department: yup.string(),
    // make minimum to 100
    statementOfPurpose: yup
        .string()
        .required("Statement of Purpose is required.")
        .min(10),
});

interface SubmitData {
    firstName: string;
    lastName: string;
    statementOfPurpose: string;
    teacher: string;
    department: string;
    registrationNumber: string;
}
let submitData: SubmitData = {
    firstName: "",
    lastName: "",
    statementOfPurpose: "",
    teacher: "",
    department: "",
    registrationNumber: "",
};
function ApplicationForm() {
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);
    async function fetchDepartments () {
        try {
            const { data }: AxiosResponse = await http.get(
                "http://localhost:4000/api/departments"
            );
            setDepartments(data);
        } catch (error) {
            console.log(error);
        }
    }

    // async function fetchFaculty () {
    //     try {
    //         const {data}: AxiosResponse = await http.get(
    //             "http://localhost:4000/api/departments"
    //         );
    //         setDepartments(data);
    //         console.log(data);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    useEffect(() => {
        fetchDepartments();
    }, []);
    const departmentOptions = departments.map(
        (dept: department): departmentList => {
            return {
                key: dept._id,
                text: dept.name,
                value: dept.name,
            };
        }
    );
    console.log("Departments: ", departments);
    
    // useEffect(() => {
    //     fetchDepartments();
    // });
    
    const history = useHistory();

    const handleTeacherChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        { value }: { value: string }
    ) => {
        submitData.teacher = value;
    };

    const handleDepartmentChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        { value }: { value: string }
    ) => {
        submitData.department = value;
    };
    return (
        <Container style={{ padding: "4em", marginTop: "2.5em" }}>
            <Button
                style={{ marginBottom: "2em" }}
                onClick={() => history.goBack()}
            >
                Back
            </Button>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    registrationNumber: "",
                    teacher: "",
                    department: "",
                    statementOfPurpose: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    submitData.firstName = data.firstName;
                    submitData.lastName = data.lastName;
                    submitData.registrationNumber = data.registrationNumber;
                    submitData.statementOfPurpose = data.statementOfPurpose;
                    console.log("Submit Data: ", submitData);
                    setSubmitting(false);
                    history.goBack();
                    resetForm();
                }}
            >
                {({
                    values,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group widths='equal'>
                            <Field
                                type='input'
                                name='firstName'
                                required
                                placeholder='First Name'
                                control={Input}
                                label='First Name'
                                as={Form.Field}
                            />
                            <Field
                                type='input'
                                name='lastName'
                                required
                                placeholder='Last Name'
                                control={Input}
                                label='Last Name'
                                as={Form.Field}
                            />
                            <Field
                                type='input'
                                name='registrationNumber'
                                required
                                placeholder='Registration Number'
                                control={Input}
                                label='Registration Number'
                                as={Form.Field}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Teacher'
                                required
                                name='teacher'
                                options={teachers}
                                placeholder='Teacher'
                                onChange={handleTeacherChange}
                            />
                            <Form.Field
                                control={Select}
                                label='Your Department'
                                name='department'
                                required
                                options={departmentOptions}
                                placeholder='Your Department'
                                onChange={handleDepartmentChange}
                            />
                        </Form.Group>
                        <Field
                            control={TextArea}
                            required
                            label='Statement of Purpose'
                            placeholder='Include your achievements and why you want this LOR...'
                            name='statementOfPurpose'
                            style={{ height: "400px" }}
                            as={Form.Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Field>
                            <Button
                                disabled={isSubmitting}
                                type='submit'
                                color='violet'
                            >
                                Submit
                            </Button>
                        </Form.Field>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>Errors: {JSON.stringify(errors, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default ApplicationForm;
