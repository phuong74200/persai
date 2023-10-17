import jwt_decode from "jwt-decode";
import createClient from "openapi-fetch";

import { BASE_API_URL } from "@/configs/env";

import { paths } from "./v1"; // generated from openapi-typescript

const getToken = (): {
  accessToken: string;
  refreshToken: string;
} | null => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "") as {
      accessToken: string;
      refreshToken: string;
    };
    return token;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

const baseClient = createClient<paths>({
  baseUrl: BASE_API_URL,
});

// using Proxy to add Authorization header to every request
export const client = new Proxy(baseClient, {
  get(_, key: keyof typeof baseClient) {
    const newClient = createClient<paths>({
      headers: {
        Authorization: `Bearer ${getToken()?.accessToken}`,
      },
      baseUrl: BASE_API_URL,
      async fetch(input, init) {
        const headers = init?.headers as unknown as Map<string, string>;
        const authorization = headers.get("Authorization");

        try {
          const nextExpiration = jwt_decode<{ exp: number }>(authorization || "").exp * 1000;

          const FIVE_MINUTES = 1000 * 60 * 2;

          if (nextExpiration - Date.now() < FIVE_MINUTES) {
            const token = await createClient<paths>({
              baseUrl: BASE_API_URL,
              headers: {
                Authorization: `Bearer ${getToken()?.refreshToken}`,
              },
            }).GET("/api/v1/new-access-token", {});

            localStorage.setItem(
              "token",
              JSON.stringify({
                accessToken: token.data?.accessToken,
                refreshToken: token.data?.refreshToken,
              }),
            );
          }
        } catch (e) {
          localStorage.removeItem("token");
        }

        return window.fetch(input, init);
      },
    });

    return newClient[key];
  },
});
