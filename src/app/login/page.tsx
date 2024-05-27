"use client";
import { LoginWindow } from "@/components/LoginWindow/LoginWindow";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default function LoginPage(props: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginWindow error={props.searchParams?.error} />
    </div>
  );
}
