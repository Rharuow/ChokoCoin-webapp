import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { api, awakeServer } from "../../service/api";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<
    React.Dispatch<
      React.SetStateAction<{
        user: {
          id: string;
          email: string;
          username: string;
          projects: [{ name: string; value: number }] | null | undefined;
        };
      }>
    >
  >();
  const [projects, setProjects] = useState<
    React.Dispatch<
      React.SetStateAction<{
        projects: [{ name: string; value: number }] | null | undefined;
      }>
    >
  >();

  useEffect(() => {
    getSession()
      .then(async (session) => {
        if (session) {
          api
            .get("project", {
              headers: {
                Authorization: `Beare ${session.user.token}`,
              },
            })
            .then((res) => {
              setProjects(res.data);
            })
            .catch((error) => console.log(error.message));

          api
            .get("user", {
              headers: {
                Authorization: `Beare ${session.user.token}`,
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
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
