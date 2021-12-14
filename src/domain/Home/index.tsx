import { signOut } from "next-auth/client";
import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ReactLoading from "react-loading";

import { HomeContext } from "../../pages/home";
import ModalFormProject from "./Modal";

const Content: React.FC = () => {
  const { user, projects, modalIsOpen, setIsOpen, loading, setLoading } =
    useContext(HomeContext);

  console.log("projects = ", projects);

  useEffect(() => {
    projects && setLoading(false);
  }, [projects, setLoading]);

  return (
    <div className="h-100vh-min bg-dark">
      {loading && projects ? (
        <div className="d-flex align-items-center justify-content-center h-100vh">
          <ReactLoading type="spin" />
        </div>
      ) : (
        <>
          <ModalFormProject />
          <div className="flex-center-x-y flex-wrap flex-column h-100vh">
            <Button
              variant="danger"
              className="position-absolute z-1 top-0 end-0"
              onClick={() => signOut()}
            >
              Sair
            </Button>
            <Card>
              <Card.Header>
                <h1 className="text-center">Bem vindo {user?.username}</h1>
              </Card.Header>
              <Card.Body>
                <h2>
                  {projects && projects?.length > 0
                    ? "Projetos:"
                    : "Sem projetos"}
                </h2>
                {projects &&
                  projects?.length > 0 &&
                  projects.map((project) => (
                    <Card key={project.name}>
                      <Card.Body>
                        <p>Nome: {project.name}</p>
                        <p>Valor: {project.value}</p>
                        {project?.partners?.length > 0 &&
                          project.partners.map((partner) => (
                            <div key={partner.email}>
                              <hr />
                              <p>
                                <strong>Nome:</strong> {partner.username}
                              </p>
                              <p>
                                <strong>Valor:</strong> {partner.value}
                              </p>
                            </div>
                          ))}
                      </Card.Body>
                    </Card>
                  ))}
              </Card.Body>
            </Card>

            {user?.is_admin && (
              <Button onClick={() => setIsOpen(!modalIsOpen)} className="mt-5">
                Cadastrar de projeto
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
