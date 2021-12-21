import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";

import { IProject } from "../../../types/IProject";
import { HomeContext } from "../../pages/home";

const CardProject: React.FC<{
  project: IProject;
  handleDeleteProject: (id: string) => void;
}> = ({ project, handleDeleteProject }) => {
  const { user } = useContext(HomeContext);

  return (
    <Card className="my-3">
      <Card.Body>
        <p>Nome: {project.name}</p>
        <p>Valor: {project.value}</p>
        {project?.partners?.length > 0 &&
          project.partners.map((partner, index) => (
            <div key={index}>
              <hr />
              <p>
                <strong>Nome:</strong> {partner.username}
              </p>
              <p>
                <strong>Valor:</strong> {partner.value}
              </p>
              {user?.is_admin && !user.email.includes(partner.email) && (
                <Button
                  variant={
                    user.email.includes(partner.email) ? "danger" : "success"
                  }
                >
                  {user.email.includes(partner.email) ? "Retirar" : "Inserir"}
                </Button>
              )}
            </div>
          ))}
        {user?.is_admin && (
          <Button
            variant="danger"
            onClick={() => handleDeleteProject(project.id)}
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardProject;
