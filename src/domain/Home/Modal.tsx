import { getSession } from 'next-auth/client';
import React, {useContext} from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Modal from 'react-modal'

import { HomeContext, IProject } from '../../pages/home';
import { api } from '../../service/api';
import { Card, Form } from 'react-bootstrap';
import FormProject from './NewProject';

const ModalFormProject: React.FC = () => {

    const {modalIsOpen, projects, setProjects} = useContext(HomeContext)
  
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

  export default ModalFormProject