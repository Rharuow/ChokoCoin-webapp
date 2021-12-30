import { getSession, signOut } from "next-auth/client";
import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { IProject } from "../../../types/IProject";
import { IUser } from "../../../types/IUser";
import CardProject from "../../components/project/Card";
import CardUser from "../../components/users/Card";

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
    setUsers,
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

  const handleDeleteUser: (id: string) => void = (id: string) => {
    setLoading(true);
    getSession().then((session) => {
      if (session) {
        console.log("sessison => ", session);
        api
          .delete(`users/${id}`, {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          })
          .then((res: { data: { users: Array<IUser> | undefined } }) => {
            setUsers(res.data.users);
            Swal.fire({
              icon: "success",
              title: "Tudo certo!",
              text: "Usuário Deletado com Sucesso",
            }).then(() => setLoading(false));
          })
          .catch((err) => console.log("err ", err));
      }
      setLoading(false);
    });
  };

  const handleSubscribeUser: (id: string) => void = (id: string) => {
    console.log("modal user ", id);
  };

  useEffect(() => {
    console.log(users);
    user && projects && setLoading(false);
  }, [projects, setLoading, user]);

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
            <Card className="w-60-min">
              <Card.Header>
                <h1 className="text-center">{user?.username}</h1>
              </Card.Header>
              <Card.Body className="flex-center-x flex-wrap">
                <div className="projects me-3 w-40-min">
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
                {users &&
                  users?.length > 0 &&
                  users !== null &&
                  users &&
                  user?.is_admin && (
                    <div className="users ms-3 w-40-min">
                      <h2 className="text-center">Candidatos</h2>
                      {users?.map((user, index) => (
                        <CardUser
                          key={index}
                          user={user}
                          handleSubscribeUser={() =>
                            handleSubscribeUser(user.id)
                          }
                          handleDeleteUser={() => handleDeleteUser(user.id)}
                        />
                      ))}
                    </div>
                  )}
              </Card.Body>
            </Card>

            {user?.is_admin && (
              <Button
                onClick={() =>
                  setIsOpen({
                    ...modalIsOpen,
                    createProject: !modalIsOpen.createProject,
                  })
                }
                className="mt-5"
              >
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
