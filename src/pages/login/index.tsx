import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Form, Button } from "react-bootstrap";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { getCsrfToken, getSession } from "next-auth/client";
import Swal from "sweetalert2";

import { nextAuth, awakeServer, authorization } from "../../service/api";

const LoginForm: React.FC = () => {
  const { register } = useFormContext();
  return (
    <>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register("email")}
          placeholder="Digite seu email"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" {...register("password")} />
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { callbackUrl } = router.query;

  const onSubmit: (data: { email: string; password: string }) => void = async (
    data
  ) => {
    const csrfToken = await getCsrfToken();

    setLoading(true);
    nextAuth
      .post("api/auth/callback/domain-signin", {
        ...data,
        csrfToken,
        callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/home`,
      })
      .then((response) => {
        if (response.request.responseURL.includes("error")) {
          console.log("response = ", response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email ou senha incorreto(s)",
          }).then(() => {
            router.reload();
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Tudo certo!",
            text: "Login realizado com sucesso",
          }).then(() => {
            router.push("/home");
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error.message", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo deu errado",
        }).then(() => setLoading(false));
      });
  };

  useEffect(() => {
    // awakeServer;
    async () => {
      const auth = await authorization();
      console.log("auth = ", auth);
      if (auth.status) {
        Swal.fire({
          icon: "success",
          title: "Sessão ativa",
          text: "Você já fez login no sistema",
        }).then(() => {
          router.push("/home");
        });
        router.push(`${callbackUrl}`);
      }
    };
    setLoading(false);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center h-100vh-min bg-dark px-5">
      <Card className="w-50">
        <Card.Header className="text-center">Login</Card.Header>
        <Card.Body className="bg-secondary">
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
