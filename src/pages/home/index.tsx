import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { Form, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import Content from "../../domain/Home"
import { api, awakeServer } from "../../service/api";

export interface IUserHome {
  id: string;
  email: string;
  username: string;
  projects: [{ name: string; value: number; }];
}

export interface IUser {
  email: string;
  username: string
}

export interface IProject {
  name: string;
  value: number;
  partners: Array<IUser>
}

export interface IContextHome {
  user: IUserHome;
  setUser: React.Dispatch<React.SetStateAction<IUserHome | undefined>>
  projects: Array<IProject> | []
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  modalIsOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

}

export const HomeContext = createContext({} as IContextHome)

const FormProject: React.FC = () => {
  const { register } = useFormContext();

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Nome do projeto"
          {...register("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Valor (R$)</Form.Label>
        <Form.Control
          required
          step={0.01}
          type="number"
          placeholder="Valor total do projeto"
          {...register("value")}
        />
      </Form.Group>

      <Form.Group className="mb-3 flex-center-x">
        <Button type="submit">Cadastrar</Button>
      </Form.Group>
    </>
  );
};

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);


  useEffect(() => {
    getSession()
      .then(async (session) => {
        console.log(session);
        if (session) {
          api
            .get("projects", {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            })
            .then((res) => {
              setProjects(res.data);
            })
            .catch((error) => console.log(error.message));
          api
            .get("user", {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            })
            .then((res) => {
              setUser(res.data);
            })
            .catch((error) => console.log(error.message));
          setLoading(false);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(" GET SESSION ERROR = ", err);
      });
    awakeServer.then();
  }, []);

  return (
    <HomeContext.Provider value={{user: user!, setUser, projects, setProjects, modalIsOpen, setIsOpen, loading, setLoading}}>
      <Content />
    </HomeContext.Provider>
  );
};

export default Home;
