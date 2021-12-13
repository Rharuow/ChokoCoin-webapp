import { getSession } from "next-auth/client";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "react-modal";

import { HomeContext } from "../../pages/home";
import { api } from "../../service/api";
import { Button, Card, Form } from "react-bootstrap";
import FormProject from "./NewProject";
import { IProject } from "../../../types/IProject";

const ModalFormProject: React.FC = () => {
  const { modalIsOpen, projects, setProjects, setIsOpen } =
    useContext(HomeContext);

  const methods = useForm();

  const onSubmit: (data: { name: string; value: string }) => void = (data) => {
    console.log(data);
    getSession()
      .then((session) => {
        if (session) {
          api
            .post(
              "projects",
              { name: data.name, value: data.value },
              {
                headers: {
                  Authorization: `Bearer ${session.user.token}`,
                },
              }
            )
            .then((res: { data: IProject }) => {
              const tempProjects = projects;
              tempProjects && tempProjects.push(res?.data);
              setProjects(tempProjects);
              Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Projeto cadastrado com Sucesso",
              }).then(() => setIsOpen(false));
            })
            .catch((error) => {
              console.log("error (project) = ", error.message);
              Swal.fire({
                icon: "error",
                title: "Opss...",
                text: error.message,
              });
            });
        }
      })
      .catch((error) => console.log("error = ", error.message));
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
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card>
        <Card.Header className="flex-end-x flex-wrap">
          <Button
            size="sm"
            variant="outline-danger"
            className="border"
            onClick={() => setIsOpen(!modalIsOpen)}
          >
            x
          </Button>
          <h1 className="d-block w-100">Cadastrar Projeto</h1>
        </Card.Header>
        <Card.Body>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormProject />
            </Form>
          </FormProvider>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default ModalFormProject;
