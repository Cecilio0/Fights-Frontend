"use client";

import { RegisterWindow } from "@/components/RegisterWindow/RegisterWindow"

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>
}

export default function RegisterPage(props: Props) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <RegisterWindow />
        </div>
    )
}
