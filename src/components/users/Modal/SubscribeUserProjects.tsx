import { getSession } from "next-auth/client";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "react-modal";

import { HomeContext } from "../../../pages/home";
import { api } from "../../../service/api";
import { Button, Card, Form } from "react-bootstrap";
import FormProject from "../../Form/SubcribeUserProject";
import { IProject } from "../../../../types/IProject";
import { IUser } from "../../../../types/IUser";

const ModalSubscriberUserProject: React.FC<{ user: IUser }> = ({ user }) => {
  const { modalIsOpen, projects, setProjects, setIsOpen } =
    useContext(HomeContext);

  const methods = useForm();

  const onSubmit: (data: { name: string; value: string }) => void = (data) => {
    console.log(" Subscribe User Project = ", data);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { background: "rgba(3, 3, 3, 0.1)" },
  };

  return (
    <Modal
      isOpen={modalIsOpen.subscribeUser}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card>
        <Card.Header className="flex-end-x flex-wrap">
          <Button
            size="sm"
            variant="outline-danger"
            className="border"
            onClick={() =>
              setIsOpen({
                ...modalIsOpen,
                subscribeUser: !modalIsOpen.subscribeUser,
              })
            }
          >
            x
          </Button>
          <h1 className="d-block w-100">Inscrever</h1>
        </Card.Header>
        <Card.Body>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormProject user={user} />
            </Form>
          </FormProvider>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default ModalSubscriberUserProject;
