"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToggleMode } from "../ToggleMode/ToggleMode";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  Home,
  User,
  Sun,
  Moon,
  Eraser,
  Earth,
} from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const links = [
    { route: "/", name: "Home", protected: false, icon: <Home /> },
    { route: "/fighters", name: "Fighters", protected: true, icon: <User /> },
  ];

  return (
    <>
      <header className="flex h-16 w-full shrink-0 items-center border-b px-4 md:px-6">
        <Link className="mr-4" href="#">
          <h1>Fight Club</h1>
        </Link>
        {/* Botón de menú para dispositivos móviles */}
        <div className="ml-auto flex md:hidden">
          <ToggleMode />
          <button className="pl-4" onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
        </div>
        {/* Navegación para escritorio */}
        <nav className="hidden flex-1 items-center justify-center gap-4 text-sm font-medium uppercase tracking-wide md:flex">
          {links.map(
            (link) =>
              (!link.protected || session) && (
                <Link key={link.name} className="mx-4" href={link.route}>
                  {link.name}
                </Link>
              ),
          )}
        </nav>
        <div className="ml-auto hidden items-center gap-4 md:flex">
          {session ? (
            <>
              <span>{session?.user?.name}</span>
              <Button size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => signIn()}>
              Sign In
            </Button>
          )}

          <ToggleMode />
        </div>
      </header>
      {/* Sidebar para dispositivos móviles */}
      <div
        className={`absolute right-0 top-0 z-50 h-full w-64 transform bg-zinc-900 p-4 transition-transform dark:bg-zinc-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <Button
          onClick={() => setIsSidebarOpen(false)}
          className="bg-slate dark:text-black"
        >
          {" "}
          <X />{" "}
        </Button>
        <nav className="flex flex-col dark:text-black">
          {links.map(
            (link) =>
              (!link.protected || session) && (
                <Link
                  key={link.name}
                  href={link.route}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="flex items-center text-white dark:text-black">
                    <div className="mr-2">{link.icon}</div>
                    <p className="my-2">{link.name}</p>
                  </div>
                </Link>
              ),
          )}
        </nav>
        <div className="my-4 border-b border-gray-600 dark:border-gray-400"></div>

        <div className="my-4 dark:text-black">
          {session ? (
            <>
              <Button
                size="sm"
                onClick={() => signOut()}
                className=" bg-slate dark:text-black"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
              <div className="my-4 border-t pt-4 text-white dark:text-black">
                <span>{session?.user?.name}</span>
              </div>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => signIn()}
              className="bg-zinc-900 text-white dark:bg-white dark:text-black"
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
