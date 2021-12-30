import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";

import { IUser } from "../../../types/IUser";
import { HomeContext } from "../../pages/home";

const CardUser: React.FC<{
  user: IUser;
  handleDeleteUser: (id: string) => void;
}> = ({ user, handleDeleteUser }) => {

  const { setIsOpen, modalIsOpen } = useContext(HomeContext)

  return (
    <Card className="my-3">
      <Card.Body>
        <p>Nome: {user.username}</p>
        <hr />
        <p>email: {user.email}</p>
        <div className="w-100 d-flex justify-content-around">
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteUser(user.id)}
          >
            Excluir
          </Button>
          <Button size="sm" onClick={() => setIsOpen({...modalIsOpen, subscribeUser: !modalIsOpen.subscribeUser})}>Inscrever</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardUser;
