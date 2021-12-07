import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

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

export default FormProject

