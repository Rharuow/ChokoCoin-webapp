import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { api } from "../../service/api";

const Confirmation: React.FC = () => {
  const router = useRouter();

  const { email, token } = router.query as { email: string; token: string };

  useEffect(() => {
    if (email !== undefined ) {
      const getConfirmation = async () =>
        await api.post("/users/confirmation", {
          email,
          token,
        });
        
      getConfirmation().catch(error => {
        Swal.fire({
        title: "Hmm...",
        text: `Essa conta me parece já estar registrada!`,
        icon: "info",
      });
      })
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
