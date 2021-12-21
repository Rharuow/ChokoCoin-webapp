import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";

import { IUser } from "../../../types/IUser";
import { HomeContext } from "../../pages/home";

const CardUser: React.FC<{
  user: IUser;
  handleDeleteUser: (id: string) => void;
}> = ({ user, handleDeleteUser }) => {
  return (
    <Card className="my-3">
      <Card.Body>
        <p>Nome: {user.username}</p>
        <hr />
        <p>email: {user.email}</p>
        <div className="w-100 d-flex justify-content-center">
          <Button size="sm">Inscrever</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardUser;
