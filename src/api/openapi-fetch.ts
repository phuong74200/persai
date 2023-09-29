import createClient from "openapi-fetch";

import { BASE_API_URL } from "@/configs/env";

import { paths } from "./v1"; // generated from openapi-typescript

const getToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "");
    return token;
  } catch {
    localStorage.removeItem("token");
    return "";
  }
};

const baseClient = createClient<paths>({ baseUrl: BASE_API_URL });

// using Proxy to add Authorization header to every request
export const client = new Proxy(baseClient, {
  get(_, key: keyof typeof baseClient) {
    const newClient = createClient<paths>({
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      baseUrl: BASE_API_URL,
    });
    return newClient[key];
  },
});
