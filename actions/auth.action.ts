"use server";

import { cookies } from "next/headers";

export const createAuthCookie = async (token: any) => {
  cookies().set("userAuth", token, { secure: true });
};

export const getAuthToken = async (): Promise<string | null> => {
  const cookie = cookies().get('userAuth');
  if (cookie && typeof cookie.value === 'string') {
    return cookie.value;
  }
  return null;
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};
