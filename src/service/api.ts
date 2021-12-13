import axios from "axios";
import { getSession } from "next-auth/client";
import qs from "qs";
import { IAuthorization } from "../../types/IAuthorization";

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEPATH,
  // timeout: 1000,
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

const authorization: () => Promise<IAuthorization> = async () => {
  const authorized: IAuthorization = {
    status: false,
    user: null,
  };

  const session = await getSession();

  if (session) {
    const user = await api.get("session", {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });
    authorized.status = true;
    authorized.user = user.data;
    console.log("authorized = ", authorized);
  }

  return authorized;
};

export { api, awakeServer, nextAuth, authorization };
