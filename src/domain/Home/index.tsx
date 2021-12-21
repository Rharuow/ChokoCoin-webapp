import { getSession, signOut } from "next-auth/client";
import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { IProject } from "../../../types/IProject";
import CardProject from "../../components/project/Card";

import { HomeContext } from "../../pages/home";
import { api } from "../../service/api";
import ModalFormProject from "./Modal";

const Content: React.FC = () => {
  const {
    user,
    projects,
    setProjects,
    modalIsOpen,
    setIsOpen,
    loading,
    setLoading,
    users,
  } = useContext(HomeContext);

  const handleDeleteProject: (id: string) => void = (id: string) => {
    getSession().then((session) => {
      if (session) {
        api
          .delete(`projects/${id}`, {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          })
          .then((res: { data: Array<IProject> }) => {
            Swal.fire({
              icon: "success",
              title: "Tudo certo!",
              text: "Projeto Deletado com Sucesso",
            });
            setProjects(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  useEffect(() => {
    projects && setLoading(false);
  }, [projects, setLoading]);

  return (
    <div className="h-100vh-min bg-dark p-3">
      {loading && projects ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <ReactLoading type="spin" />
        </div>
      ) : (
        <>
          <ModalFormProject />
          <div className="flex-center-x-y flex-wrap flex-column h-100">
            <Button
              variant="danger"
              className="align-self-end"
              onClick={() => signOut()}
            >
              Sair
            </Button>
            <Card>
              <Card.Header>
                <h1 className="text-center">{user?.username}</h1>
              </Card.Header>
              <Card.Body className="d-flex flex-wrap">
                <div className="projects me-3">
                  <h2 className="text-center">
                    {projects && projects?.length > 0
                      ? "Projetos"
                      : "Sem projetos"}
                  </h2>
                  {projects &&
                    projects?.length > 0 &&
                    projects.map((project, index) => (
                      <CardProject
                        key={index}
                        project={project}
                        handleDeleteProject={handleDeleteProject}
                      />
                    ))}
                </div>
                <div className="users ms-3">
                  <h2 className="text-center">Candidatos</h2>
                  {users?.map((user, index) => (
                    <p key={index}>{user.username}</p>
                  ))}
                </div>
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
