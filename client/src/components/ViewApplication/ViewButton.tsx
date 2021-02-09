import React from "react";
import { Button, Icon, Modal, Container, Header } from "semantic-ui-react";
import { Application } from "../../services/user";

type ViewButtonProps = {
    application: Application;
};

const ViewButton: React.FC<ViewButtonProps> = ({ application }) => {
    return (
        <Modal trigger={<Button color='teal'>View</Button>} closeIcon>
            <Modal.Header>Application ID: {application._id}</Modal.Header>
            <Modal.Content image scrolling>
                <Modal.Description>
                    <div
                        style={{
                            maxWidth: "810px",
                            width: "inherit",
                            fontSize: "1.5rem",
                        }}>
                        <Container>
                            <Header style={{ fontSize: "3rem" }}>
                                Name: {application.student.name}
                            </Header>
                            <div>
                                <h2>
                                    Reg. Number: {application.student.regNo}
                                </h2>
                                <h2>
                                    Department: {application.studentDepartment}
                                </h2>
                                <h2>Statement of Purpose: </h2>
                                <p>{application.statementOfPurpose}</p>
                            </div>
                        </Container>
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button animated='fade' color='red'>
                    <Button.Content visible>Reject LOR</Button.Content>
                    <Button.Content hidden>
                        <Icon name='close' />
                    </Button.Content>
                </Button>
                <Button animated='fade' color='blue'>
                    <Button.Content visible>Under Review</Button.Content>
                    <Button.Content hidden>
                        <Icon name='circle outline' />
                    </Button.Content>
                </Button>
                <Button animated='fade' color='green'>
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
