import React, { useState, useEffect, createContext } from "react";
import { signOut } from "next-auth/client";

import Content from "../../domain/Home";
import { authorization, awakeServer } from "../../service/api";
import { IContextHome } from "../../../types/home/IContextHome";
import { IUserHome } from "../../../types/home/IUserHome";
import { IProject } from "../../../types/IProject";
import { IAuthorization } from "../../../types/IAuthorization";
import { getProjects } from "../../service/getProjects";
import { IUser } from "../../../types/IUser";
import { getUsers } from "../../service/getUsers";
import { IModal } from "../../../types/IModal";

export const HomeContext = createContext({} as IContextHome);

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<Array<IProject>>();
  const [modalIsOpen, setIsOpen] = useState<IModal>({
    createProject: false,
    registrateUser: false,
    subscribeUser: false
  });
  const [users, setUsers] = useState<Array<IUser>>();

  useEffect(() => {
    awakeServer;
    getProjects().then((res) => {
      if (res !== null) setProjects(res);
    });
    getUsers().then((res) => {
      console.log("users = ", res);
      if (res !== null) setUsers(res);
    });
    authorization()
      .then((res: IAuthorization) => {
        if (res.user === null) return signOut({ callbackUrl: "/login" });
        setUser(res.user);
      })
      .catch((err) => signOut({ callbackUrl: "/login" }));
  }, []);

  return (
    <HomeContext.Provider
      value={{
        user: user!,
        users,
        setUsers,
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
