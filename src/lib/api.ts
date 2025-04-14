import axios from "axios";
import { parseCookies, setAccessTokenCookie } from "./cookies";
const refreshToken = parseCookies().refresh_token;

export const baseurl = "https://mq459llx-8000.inc1.devtunnels.ms/";
// export const baseurl = "https://api.brandsinfo.in";
export const ws = "http://mq459llx-8000.inc1.devtunnels.ms/ws/notifications/";
// export const ws = baseurl+'ws/notifications/';

const api = axios.create({
  baseURL: `${baseurl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const token_api = (token: string | null | undefined) => {
  const instance = axios.create({
    baseURL: `${baseurl}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!refreshToken) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          return Promise.reject(error);
        }

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const get_api_form = (token: string | null | undefined) => {
  const instance = axios.create({
    baseURL: `${baseurl}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token ? token : ""}`,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!refreshToken) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          return Promise.reject(error);
        }

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const refreshAccessToken = async () => {
  try {
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(`${baseurl}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const { access } = await response.json();

    setAccessTokenCookie(access);

    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    window.location.href = "/login";
    return null;
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        return Promise.reject(error);
      }

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
