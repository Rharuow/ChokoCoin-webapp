import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { api } from "../../service/api";

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
          projects: [{ name: string; value: number }] | null;
        };
      }>
    >
  >();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          // route to get user by token throught
          api
            .get("project", {
              headers: {
                Authorization:
                  "Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGFyeXNzb25zb2FyZXNAZ21haWwuY29tIiwiaWQiOiI1ZWVhYTBhNC04YThjLTQ2NTQtYTkwOS0zZmJhNjE2YmY3OWMifSwiaWF0IjoxNjM4NDc1NTk0fQ.dqv7IB3cI7jQ70E_JpQE6dEVTX5Bq3QnTGqMN8LdHiY",
              },
            })
            .then((res) => {
              console.log("project", res.data);
            });
          setLoading(false);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(" GET SESSION ERROR = ", err);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
