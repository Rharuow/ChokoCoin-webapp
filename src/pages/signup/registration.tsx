import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const Registration: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>();

  useLayoutEffect(() => {
    setEmail(router.asPath.split("#")[1]);
  }, []);

  return (
    <div className="flex-center-x-y text-center h-100vh-min bg-dark px-5">
      <Alert variant="info">
        <Alert.Heading>
          Enviamos um email para
          <Alert>{email}</Alert>
        </Alert.Heading>
        <hr />
        Siga as instrunções para concluir o cadastro
      </Alert>
    </div>
  );
};

export default Registration;
