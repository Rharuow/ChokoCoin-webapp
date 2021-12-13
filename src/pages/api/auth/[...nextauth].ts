import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { api } from "../../../service/api";

export default NextAuth({
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({ ...session, user });
    },
    jwt: async (token, user) => {
      return Promise.resolve(user || token);
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/",
  },
  providers: [
    Providers.Credentials({
      id: "domain-signin",
      name: "Domain Signin",
      authorize: async (credentials) => {
        console.log("credentials = ", credentials);
        return api
          .post(
            "login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
                // Origin: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              },
            }
          )
          .then((response) => {
            const token = response.data.token;
            if (token === null) {
              return Promise.reject(new Error("invalid_credentials"));
            } else {
              return Promise.resolve({ token });
            }
          })
          .catch((error) => {
            console.log("error = ", error.message);
            return Promise.reject(new Error("invalid_credentials"));
          });
      },
      credentials: {
        email: { label: "Email", type: "text ", placeholder: "Email" },
        password: { label: "Senha", type: "password" },
      },
    }),
  ],
});
