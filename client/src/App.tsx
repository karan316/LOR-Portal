import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Redirect, Switch } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import Dashboard from "./components/Dashboard/Dashboard";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import { AuthProvider } from "./context/authContext";

function App() {
    return (
        <>
            <AuthProvider>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route
                        path='/new-application'
                        component={ApplicationForm}
                    />
                    <Redirect to='/login' from='/' />
                </Switch>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
}

export default App;
