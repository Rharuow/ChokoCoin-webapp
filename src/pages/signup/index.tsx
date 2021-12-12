import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Form, Button } from "react-bootstrap";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Swal from "sweetalert2";

import { api } from "../../service/api";

const LoginForm: React.FC = () => {
  const { register } = useFormContext();
  return (
    <>
      <Form.Group className="mt-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          required
          type="text"
          {...register("username")}
          placeholder="Digite seu nome"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          {...register("email")}
          placeholder="Digite seu email"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control required type="password" {...register("password")} />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Chave</Form.Label>
        <Form.Control required type="password" {...register("key")} />
      </Form.Group>

      <Form.Group className="mt-3 d-flex justify-content-around">
        <Button type="submit">Salvar</Button>
        <Link href="/" passHref>
          <a className="btn btn-danger">Voltar</a>
        </Link>
      </Form.Group>
    </>
  );
};

const Login: React.FC = () => {
  const methods = useForm();
  const router = useRouter();

  const onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    key: string;
  }) => void = (data) => {
    api
      .post("users", data, { headers: { secret: data.key } })
      .then((res) => {
        console.log("signup then => ", res.data);
        Swal.fire({
          title: "Feito",
          text: `${data.username} foi cadastrado com sucesso`,
          icon: "success",
        });
        router.push(`signup/registration#${data.email}`);
      })
      .catch((error) => {
        console.log(" catch error => ", error.message);
        Swal.fire({
          title: "Hmm...",
          text: `Alguma coisa não parece certa!`,
          icon: "info",
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100vh-min bg-dark px-5">
      <Card className="w-75">
        <Card.Header className="text-center">Cadastrar</Card.Header>
        <Card.Body>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <LoginForm />
            </Form>
          </FormProvider>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
