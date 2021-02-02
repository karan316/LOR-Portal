import React, { useState, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import {
    Button,
    Grid,
    Header,
    Message,
    Segment,
    Container,
    Form,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";

import { useForm } from "../../hooks/useForm";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/authContext";

function Login() {
    const initialState = {
        email: "",
        password: "",
    };
    const [errors, setErrors] = useState({});
    const { setUser } = useContext(AuthContext);
    const history = useHistory();

    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState
    );

    async function loginUserCallback() {
        let response: AxiosResponse | undefined;
        try {
            response = await login(values);
            console.log("LOGIN SUCCESSFUL", response.data);
            setUser(response.data);
            history.push("/dashboard");
        } catch (error) {
            setErrors(error);
            console.log("Server Error occurred: ", error);
        }
    }

    return (
        <Container style={{ textAlign: "center", overflow: "hidden" }}>
            <Header
                as='h1'
                color='black'
                style={{
                    fontSize: "4rem",
                    marginTop: "2em",
                }}>
                Welcome to <span style={{ color: "#5829bb" }}> Easy LOR</span>
            </Header>
            <Grid
                textAlign='center'
                style={{ marginTop: "3em" }}
                verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500, marginBottom: "10em" }}>
                    <Header
                        as='h1'
                        color='violet'
                        textAlign='center'
                        style={{ fontSize: "2em", marginBottom: "1em" }}>
                        Log In
                    </Header>
                    <Form onSubmit={onSubmit} style={{ textAlign: "left" }}>
                        <Segment stacked size='big'>
                            <Form.Input
                                name='email'
                                type='email'
                                required
                                label='Email ID'
                                placeholder='Email ID'
                                onChange={onChange}
                            />

                            <Form.Input
                                name='password'
                                type='password'
                                required
                                label='Password'
                                placeholder='Password'
                                onChange={onChange}
                            />
                        </Segment>
                        <Button type='submit' color='violet' fluid size='large'>
                            LOGIN
                        </Button>
                    </Form>
                    <Message>
                        New user?
                        <a href='/register'> Register</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Login;
