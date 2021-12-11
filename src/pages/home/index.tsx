import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

import Content from "../../domain/Home";
import { api, awakeServer } from "../../service/api";

export interface IUserHome {
  id: string;
  email: string;
  username: string;
  projects: [{ name: string; value: number }];
}

export interface IPartner {
  username: string;
  value: number;
  email: string;
}

export interface IProject {
  name: string;
  value: number;
  partners: Array<IPartner>;
}

export interface IContextHome {
  user: IUserHome;
  setUser: React.Dispatch<React.SetStateAction<IUserHome | undefined>>;
  projects: Array<IProject>;
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeContext = createContext({} as IContextHome);

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getSession()
      .then(async (session) => {
        if (session) {
          api
            .get("user", {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            })
            .then((res) => console.log(" home > session", res.data))
            .catch((err) => {
              router.push("/");
            });
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
    <HomeContext.Provider
      value={{
        user: user!,
        setUser,
        projects,
        setProjects,
        modalIsOpen,
        setIsOpen,
        loading,
        setLoading,
      }}
    >
      <Content />
    </HomeContext.Provider>
  );
};

export default Home;
