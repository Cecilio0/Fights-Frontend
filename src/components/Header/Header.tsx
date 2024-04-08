"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { ToggleMode } from "../ToggleMode/ToggleMode";
import { Label } from "@/components/ui/label";

export function Header() {
    const { data: session } = useSession();

    const links = [
        { route: "/", name: "Home", protected: false },
        { route: "/fighters", name: "Fighters", protected: true },
    ];

    return (
        <header className="flex items-center h-16 px-4 border-b w-full shrink-0 md:px-6">
            <Link className="mr-4" href="#">
                <h1>Fight Club</h1>
            </Link>
            <nav className="flex-1 hidden md:flex items-center justify-center gap-4 text-sm font-medium tracking-wide uppercase">
                {links.map((link) => (
                    (!link.protected || session) && (
                        <Link key={link.name} className="mx-4" href={link.route}>
                            {link.name}
                        </Link>
                    )
                ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
                {session ? (
                    <>
                        <span>{session?.user?.name}</span>
                        <Button size="sm" onClick={() => signOut()}>
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <Button size="sm" variant="outline" onClick={() => signIn()}>
                        Sign In
                    </Button>
                )}

                <ToggleMode />
            </div>

        </header>
    )
}