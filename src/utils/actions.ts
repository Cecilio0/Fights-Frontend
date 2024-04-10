"use server";

import axios, { AxiosError } from "axios";
import { z } from "zod";

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

export async function authenticateUser(credentials: Credentials) {
  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/users/authenticate`,
      credentials,
    );

    return response.data;
  } catch (error) {
    console.error(error);
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

export async function getFighters(jwt: string) {
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fighters/find`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}

export async function getFighterById(jwt: string, id: string) {
  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/fighters/find/id/${Number(id)}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
}
