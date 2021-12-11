import axios from "axios";
import { getSession } from "next-auth/client";
import qs from "qs";
import { IAuthorization } from "../../types/IAuthorization";

import { ICurrentUser } from "../../types/IUser";

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEPATH,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

const awakeServer = api
  .get("/")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

const nextAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  // headers: { Origin: `${process.env.NEXT_PUBLIC_SITE_URL}` },
});

const authorization: () => IAuthorization = () => {
  const authorized: IAuthorization = {
    status: false,
    user: null,
  };

  getSession().then(async (session) => {
    if (session) {
      api
        .get("user", {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        })
        .then((res: { data: { user: ICurrentUser } }) => {
          console.log("authorized = ", res.data);
          authorized.status = true;
          authorized.user = res.data.user;
        })
        .catch((err) => {
          console.log("authorized = ", err);
        });
    }
  });

  return authorized;
};

export { api, awakeServer, nextAuth, authorization };
