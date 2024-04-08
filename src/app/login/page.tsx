"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "@/utils/helpers/jwt.helper";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username: string | void = formData.get("username")?.toString();
    const password: string | void = formData.get("password")?.toString();

    if (!username || !password) return;

    const response: string | void = await authenticate({ username, password });

    if (!response) return;

    // Check if it's going to be session or local storage
    localStorage.setItem("jwt-token", response);

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="username" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
