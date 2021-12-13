import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

import Content from "../../domain/Home";
import { authorization, awakeServer } from "../../service/api";
import { IContextHome } from "../../../types/home/IContextHome";
import { IUserHome } from "../../../types/home/IUserHome";
import { IProject } from "../../../types/IProject";
import { IAuthorization } from "../../../types/IAuthorization";

export const HomeContext = createContext({} as IContextHome);

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserHome>();
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    awakeServer;
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
