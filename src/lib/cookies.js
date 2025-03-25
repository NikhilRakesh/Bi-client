import { parse, serialize } from "cookie";

export const setcityCookie = (city) => {
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "Lax",
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), 
    path: "/",
  };

  document.cookie = serialize("city_cookie", city, cookieOptions);
};

export const setAccessTokenCookie = (token) => {
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60,
    path: "/",
  };

  document.cookie = serialize("access_token", token, cookieOptions);
};

export const setRefreshTokenCookie = (token) => {
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  };

  document.cookie = serialize("refresh_token", token, cookieOptions);
};

export const parseCookies = () => {
  if (typeof window !== "undefined") {
    return parse(document.cookie || "");
  }
  return {};
};

export const clearTokenCookie = (name) => {
  document.cookie = serialize(name, "", {
    maxAge: -1,
    path: "/",
  });
};
