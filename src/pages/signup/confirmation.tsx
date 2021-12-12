import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { api } from "../../service/api";

const Confirmation: React.FC = () => {
  const router = useRouter();

  const { email, token } = router.query as { email: string; token: string };

  useEffect(() => {
    if (email) {
      console.log("email and token = ", email, token);
      async () =>
        await api.post("/users/confirmation", {
          email,
          token,
        });
    }
  }, [email, token]);

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
