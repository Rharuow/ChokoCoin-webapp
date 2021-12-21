import { getSession } from "next-auth/client";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "react-modal";

import { HomeContext } from "../../../pages/home";
import { api } from "../../../service/api";
import { Button, Card, Form } from "react-bootstrap";
import { IProject } from "../../../../types/IProject";

const ModalFormProject: React.FC = () => {
  const { modalIsOpen, projects, setProjects, setIsOpen } =
    useContext(HomeContext);

  const methods = useForm();

  const onSubmit: (data: any) => void = (data) => {
    console.log(" onSubmit ", data);
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
    <Modal isOpen={modalIsOpen.registrateUser} style={customStyles}>
      <Card>
        <Card.Header className="flex-end-x flex-wrap">
          <Button
            size="sm"
            variant="outline-danger"
            className="border"
            onClick={() =>
              setIsOpen({
                ...modalIsOpen,
                registrateUser: false,
              })
            }
          >
            x
          </Button>
          <h1 className="d-block w-100">
            Adicione um parceiro para um Projeto
          </h1>
        </Card.Header>
        <Card.Body>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* <FormProject /> */}
            </Form>
          </FormProvider>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default ModalFormProject;
