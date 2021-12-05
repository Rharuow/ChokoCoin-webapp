import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Swal from "sweetalert2";
import { Card, Form, Button } from "react-bootstrap";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { api, awakeServer } from "../../service/api";

export interface IUserHome {
  id: string;
  email: string;
  username: string;
  projects: [{ name: string; value: number }];
}

export interface IProject {
  name: string;
  value: number;
}

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

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<[{ name: string; value: number }]>(
    []
  );

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
              tempProjects.push(res.data);
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
    <div className="h-100vh-min bg-dark">
      <div className="flex-center-y-around-x flex-wrap">
        <Card className="h-100">
          <Card.Header>
            <h1 className="text-center">Bem vindo {user?.username}</h1>
          </Card.Header>
          <Card.Body>
            <h2>Projetos:</h2>
          </Card.Body>
        </Card>
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
      </div>
      <div className="flex-center-y-around-x flex-wrap">
        {projects &&
          projects.map((project) => (
            <Card key={project.name}>
              <Card.Title>Projetos</Card.Title>
              <Card.Body>
                <p>nome: {project.name}</p>
                <p>valor: {project.value}</p>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Home;
