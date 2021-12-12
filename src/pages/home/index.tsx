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
    awakeServer;
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
