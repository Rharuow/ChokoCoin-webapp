import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const LoginForm: React.FC = () => {
  return (
    <>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Digite seu nome" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Digite seu email" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
    </>
  );
};

const Login: React.FC = () => {
  const methods = useFormContext();

  return (
    <div className="d-flex justify-content-center align-items-center h-100vh bg-dark">
      <Card>
        <Card.Header className="text-center">Login</Card.Header>
        <Card.Body>
          <FormProvider {...methods}>
            <Form>
              <LoginForm />
            </Form>
          </FormProvider>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
