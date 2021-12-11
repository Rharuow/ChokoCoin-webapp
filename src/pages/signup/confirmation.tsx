import Link from "next/link";
import React from "react";
import { Alert } from "react-bootstrap";

const Confirmation: React.FC = () => {
  return (
    <div className="flex-center-x-y text-center h-100vh-min bg-dark px-5">
      <Alert variant="info">
        <Alert.Heading>Sua conta foi confirmada!</Alert.Heading>
        <hr />
        <Link href="/login" passHref>
          <a>Clique aqui para fazer LOGIN</a>
        </Link>
      </Alert>
    </div>
  );
};

export default Confirmation;
