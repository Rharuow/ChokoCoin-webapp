import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Swal from "sweetalert2";
import { Card, Form, Button } from "react-bootstrap";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Modal from 'react-modal';

import Content from "../../domain/Home"
import { api, awakeServer } from "../../service/api";

export interface IUserHome {
  id: string;
  email: string;
  username: string;
  projects: [{ name: string; value: number; }];
}

export interface IUser {
  email: string;
  username: string
}

export interface IProject {
  name: string;
  value: number;
  partners: Array<IUser>
}

export interface IContextHome {
  user: IUserHome;
  setUser: React.Dispatch<React.SetStateAction<IUserHome | undefined>>
  projects: IProject
  modalIsOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HomeContext = createContext({} as IContextHome)

const FormProject: React.FC = () => {
  const { register } = useFormContext();

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Nome do projeto"
          {...register("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Valor (R$)</Form.Label>
        <Form.Control
          required
          step={0.01}
          type="number"
          placeholder="Valor total do projeto"
          {...register("value")}
        />
      </Form.Group>

      <Form.Group className="mb-3 flex-center-x">
        <Button type="submit">Cadastrar</Button>
      </Form.Group>
    </>
  );
};

const ModalFormProject: React.FC = () => {

  const {modalIsOpen} = useContext(HomeContext)

  const methods = useForm();

  const onSubmit: (data: { name: string; value: number }) => void = (data) => {
    const value: number = data.value;
    getSession()
      .then((session) => {
        if (session) {
          api
            .post(
              "projects",
              { name: data.name, value },
              {
                headers: {
                  Authorization: `Bearer ${session.user.token}`,
                },
              }
            )
            .then((res: { data: IProject }) => {
              const tempProjects = projects;
              tempProjects && tempProjects.push(res.data);
              setProjects(tempProjects);
              Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Projeto cadastrado com Sucesso",
              });
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
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <Card>
        <Card.Header>
          <h1>Cadastrar Projeto</h1>
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
  )
}

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<Array<IProject>>();
  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(() => {
    getSession()
      .then(async (session) => {
        console.log(session);
        if (session) {
          api
            .get("projects", {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            })
            .then((res) => {
              setProjects(res.data);
            })
            .catch((error) => console.log(error.message));
          api
            .get("user", {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            })
            .then((res) => {
              setUser(res.data);
            })
            .catch((error) => console.log(error.message));
          setLoading(false);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(" GET SESSION ERROR = ", err);
      });
    awakeServer.then();
  }, []);

  return (
    <HomeContext.Provider value={{user, setUser, projects, setProjects, modalIsOpen, setIsOpen, loading, setLoading}}>
      <Content />
    </HomeContext.Provider>
  );
};

export default Home;
