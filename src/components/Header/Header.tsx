"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"

export function Header() {
    const { data: session } = useSession();

    const links = [
        { route: "/", name: "Home", protected: false },
        { route: "/profiles", name: "Profiles", protected: true },
        { route: "#", name: "Simulator", protected: false },
    ];

    return (
        <header className="flex items-center h-16 px-4 border-b w-full shrink-0 md:px-6">
            <Link className="mr-4" href="#">
                <SunIcon className="h-6 w-6" />
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
            </div>
        </header>
    )
}


function SunIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}
