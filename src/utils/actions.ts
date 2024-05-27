"use server";
import jwt from "jsonwebtoken";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import Fight from "../interfaces/fight/Fight.interface";

type Credentials = {
  username: string;
  password: string;
};

type User = {
  username: string;
  password: string;
};

const UserSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

function isTokenExpired(token: string | undefined): boolean {
  if (token) {
    const decodedToken: any = jwt.decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return true;
    }
  }
  return false;
}

export async function authenticateUser(credentials: Credentials) {
  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/users/authenticate`,
      credentials,
    );

    return response.data;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export async function registerUser(formData: User) {
  const parsed = UserSchema.safeParse(formData);

  if (!parsed.success) {
    return parsed.error.issues[0]?.message;
  }

  const { username, password } = parsed.data;

  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/users/register`,
      {
        username,
        password,
      },
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error: AxiosError | any) {
    return error.response?.data?.message
      ? error.response.data.message
      : "Registration failed";
  }
}

export async function getFighters(token: string | undefined) {
  if (isTokenExpired(token)) {
    return [];
  }
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fighters/find`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function getFighterById(token: string | undefined, id: number) {
  if (isTokenExpired(token)) {
    return [];
  }
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fighters/find/id/${Number(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function getFighterByName(
  token: string | undefined,
  name: string,
) {
  if (isTokenExpired(token)) {
    return [];
  }
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fighters/find/name/${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function getFights(token: string | undefined) {
  if (isTokenExpired(token)) {
    return [];
  }
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fights/find`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function getFightById(token: string | undefined, id: string) {
  if (isTokenExpired(token)) {
    return [];
  }
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fights/find/id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function saveFight(
  token: string | undefined,
  fight: Fight | void,
) {
  if (isTokenExpired(token)) {
    return [];
  }

  if (!fight) {
    throw new Error("Fight is undefined");
  }

  const { winner, loser, turns } = fight;

  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/fights/save`,
      {
        winner,
        loser,
        turns,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}
