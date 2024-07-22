import { fetchAPI } from "./config";
import {
  SignUpScehma,
  SignInSchema,
  AuthData,
  AllUsersResponse,
} from "./types/user";

export const signUp = async (signUpData: SignUpScehma): Promise<AuthData> => {
  try {
    const res = await fetchAPI(`/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });

    const data = await res.json();

    if (
      data.errors ||
      res.status.toString().startsWith("4") ||
      res.status.toString().startsWith("5")
    ) {
      throw new Error(data?.errors?.[0]?.message ?? data.message);
    }

    if (data.data) {
      localStorage.setItem("auth-token", data.data.token);
    }

    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (signInData: SignInSchema): Promise<AuthData> => {
  try {
    const res = await fetchAPI(`/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    });

    const data = await res.json();

    if (
      data.errors ||
      res.status.toString().startsWith("4") ||
      res.status.toString().startsWith("5")
    ) {
      throw new Error(data?.errors?.[0]?.message ?? data.message);
    }

    if (data.data) {
      localStorage.setItem("auth-token", data.data.token);
    }

    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getLoggedUser = async (): Promise<AuthData | null> => {
  try {
    const res = await fetchAPI(`/users/user`, {
      method: "GET",
    });

    const data = await res.json();

    if (
      data.errors ||
      res.status.toString().startsWith("4") ||
      res.status.toString().startsWith("5")
    ) {
      return null;
    }

    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem("auth-token");
};

export const getAllUsers = async (): Promise<AllUsersResponse> => {
  try {
    const res = await fetchAPI("/users", {
      method: "GET",
    });

    const data = await res.json();

    if (
      data.errors ||
      res.status.toString().startsWith("4") ||
      res.status.toString().startsWith("5")
    ) {
      throw new Error(data?.errors?.[0]?.message ?? data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
