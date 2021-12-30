import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { IUser } from "../../../types/IUser";

const FormProject: React.FC<{ user: IUser }> = ({ user }) => {
  const { register } = useFormContext();

  return (
    <>
      <p>{user.username}</p>

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

export default FormProject;
