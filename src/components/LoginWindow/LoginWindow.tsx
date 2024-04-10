"use client";

import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./LoginWindow.module.css";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export function LoginWindow(props: Props) {
  const router = useRouter();
  const username = useRef("");
  const password = useRef("");
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: false,
    });

    if (!res?.error) {
      setIsLoading(false);
      router.push(props.callbackUrl ?? "/");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setIsLoading(false);
      router.push(`/login?error=${res.error}`);
    }
  };

  return (
    <Card className={`mx-auto max-w-sm ${shake ? styles.shake : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="cecilio"
                onChange={(e) => (username.current = e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => (password.current = e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Sign in"}
            </Button>

            {props.error && (
              <div
                className={`mt-4 w-3/4 mx-auto text-center bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg text-sm ${styles.slideDown}`}
              >
                {props.error}
              </div>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
