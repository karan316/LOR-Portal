import React, { useState, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import {
    Button,
    Grid,
    Header,
    Message,
    Segment,
    Icon,
    Form,
} from "semantic-ui-react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { register } from "../../services/userService";
import http from "../../services/http";
import { Department, DepartmentList } from "../../services/departments";
import { AuthContext } from "../../context/authContext";

function Register() {
    const history = useHistory();
    const initialState = {
        name: "",
        regNo: "",
        email: "",
        password: "",
        department: "",
        type: "",
    };
    const [errors, setErrors] = useState({});
    const { setUser } = useContext(AuthContext);
    const { onChange, onSubmit, onSelectChange, values } = useForm(
        registerUserCallback,
        initialState
    );
    const { data, isLoading } = useQuery("fetchDepartments", async () => {
        const { data } = await http.get(
            "http://localhost:4000/api/departments"
        );
        return data;
    });

    let departmentOptions: DepartmentList[] = [];
    if (data) {
        console.log(data);

        const departments: Department[] = data;
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
    const typeOptions = [
        {
            key: "Student",
            text: "Student",
            value: "student",
        },
        {
            key: "Faculty",
            text: "Faculty",
            value: "faculty",
        },
    ];

    async function registerUserCallback() {
        let response: AxiosResponse | undefined;
        try {
            response = await register(values);
            setUser(response.data);
            history.push("/dashboard");
        } catch (error) {
            setErrors(error);
            console.log("Server Error occurred: ", error);
        }
    }
    return (
        <>
            {isLoading && (
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "20%",
                    }}>
                    <Icon
                        name='circle notched'
                        loading
                        color='violet'
                        size='huge'
                    />
                </div>
            )}
            {data && (
                <Grid
                    textAlign='center'
                    style={{ height: "100vh" }}
                    verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h1'
                            color='violet'
                            textAlign='center'
                            style={{ fontSize: "2.5em", marginBottom: "1em" }}>
                            Register
                        </Header>
                        <Form onSubmit={onSubmit} style={{ textAlign: "left" }}>
                            <Segment stacked size='big'>
                                <Form.Input
                                    name='name'
                                    label='Name'
                                    required
                                    type='input'
                                    placeholder='Name'
                                    onChange={onChange}
                                />
                                <Form.Input
                                    name='regNo'
                                    type='input'
                                    required
                                    label='Registration Number'
                                    placeholder='Registration Number'
                                    onChange={onChange}
                                />
                                <Form.Input
                                    icon='user'
                                    name='email'
                                    placeholder='Email'
                                    label='Email'
                                    required
                                    onChange={onChange}
                                />
                                <Form.Input
                                    icon='lock'
                                    placeholder='Password'
                                    label='Password'
                                    name='password'
                                    required
                                    type='password'
                                    onChange={onChange}
                                />
                                <Form.Select
                                    name='department'
                                    label='Department'
                                    required
                                    options={departmentOptions}
                                    placeholder='Your Department'
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={onSelectChange}
                                />
                                <Form.Select
                                    name='type'
                                    label='Category'
                                    required
                                    options={typeOptions}
                                    placeholder='Student or Faculty?'
                                    onChange={onSelectChange}
                                />
                            </Segment>
                            <Button
                                onClick={() => {
                                    console.log("Submit clicked");
                                }}
                                type='submit'
                                color='violet'
                                fluid
                                size='large'>
                                REGISTER
                            </Button>
                        </Form>
                        <Message>
                            Already a user?
                            <a href='/login'> Login</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            )}
        </>
    );
}

export default Register;
