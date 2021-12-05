import axios from "axios";
import qs from "qs";
import { getSession } from "next-auth/client";

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

export { api, awakeServer, nextAuth };
