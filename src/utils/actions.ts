"use server";

import axios from "axios";
import { AxiosError } from "axios";
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
      credentials
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
    const errorMessage = parsed.error.issues[0]?.message;
    return errorMessage;
  }

  const { username, password } = parsed.data;

  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/users/register`,
      {
        username,
        password,
      }
    );

    return true;
  } catch (error: AxiosError | any) {
    return error.response?.data?.message
      ? error.response.data.message
      : "Registration failed";
  }
}
