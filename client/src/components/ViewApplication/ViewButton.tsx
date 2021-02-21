import React from "react";
import { Button, Icon, Modal, Container, Header } from "semantic-ui-react";
import { AxiosResponse } from "axios";
import { Application } from "../../services/user";
import http from "../../services/http";

type ViewButtonProps = {
    application: Application;
};

const ViewButton: React.FC<ViewButtonProps> = ({ application }) => {
    const handleButtonClick = async (
        updatedStatus: "accepted" | "pending" | "rejected"
    ) => {
        try {
            const response: AxiosResponse | undefined = await http.patch(
                `http://localhost:4000/api/applications/${application._id}`,
                {
                    status: updatedStatus,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                    },
                }
            );
            console.log(
                `Application status changed from ${application.status} to ${updatedStatus}`,
                response?.data
            );
        } catch (error) {
            console.log("Could not submit application: ", error);
        }
    };

    return (
        <Modal trigger={<Button color='teal'>View</Button>} closeIcon>
            <Modal.Header
                style={{
                    fontFamily: "'Nunito', sans-serif",
                }}>
                Application ID: {application._id}
            </Modal.Header>
            <Modal.Content image scrolling>
                <Modal.Description>
                    <div
                        style={{
                            maxWidth: "810px",
                            width: "inherit",
                            fontSize: "1.5rem",
                            fontFamily: "'Nunito', sans-serif",
                        }}>
                        <Container>
                            <Header
                                style={{
                                    fontSize: "3rem",
                                    fontFamily: "'Nunito', sans-serif",
                                }}>
                                Name: {application.student.name}
                            </Header>
                            <div
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                }}>
                                <h2
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                    }}>
                                    Reg. Number: {application.student.regNo}
                                </h2>
                                <h2
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                    }}>
                                    Department: {application.studentDepartment}
                                </h2>
                                <h2
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                    }}>
                                    Statement of Purpose:{" "}
                                </h2>
                                <p>{application.statementOfPurpose}</p>
                            </div>
                        </Container>
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    animated='fade'
                    color='red'
                    onClick={() => handleButtonClick("rejected")}>
                    <Button.Content visible>Reject LOR</Button.Content>
                    <Button.Content hidden>
                        <Icon name='close' />
                    </Button.Content>
                </Button>
                <Button
                    animated='vertical'
                    color='blue'
                    onClick={() => handleButtonClick("pending")}>
                    <Button.Content visible>Under Review</Button.Content>
                    <Button.Content hidden>
                        <Icon name='circle outline' />
                    </Button.Content>
                </Button>
                <Button
                    animated='fade'
                    color='green'
                    onClick={() => handleButtonClick("accepted")}>
                    <Button.Content visible>Grant LOR</Button.Content>
                    <Button.Content hidden>
                        <Icon name='check' />
                    </Button.Content>
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ViewButton;
