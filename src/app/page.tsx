"use client";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { LightLogo } from "../resources/LightLogo";
import { DarkLogo } from "../resources/DarkLogo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setMounted(true);
    console.log(theme);
  }, [theme]);

  if (!mounted) return null;

  return (
    <>
      {session?.user?.name && theme ? (
        <div>{session?.user?.name}</div>
      ) : (
        <section className="bg-slate py-2 text-black dark:text-white">
          <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
            <div className="flex items-center justify-center flex-1 mx-8">
              {theme && theme === "dark" ? <DarkLogo /> : <LightLogo />}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl py-4">
              El club mortal de Don G
            </h1>
            <p className="mt-4 max-w-3xl text-center text-md leading-relaxed">
              Bienvenidos al Club de Peleas de Don G, donde solo los más
              valientes (y enanos) sobreviven. Este no es un lugar para los
              débiles de cuerpo, mente o corazón (en especial esas ultimas 2).
              Aquí, cada golpe es una prueba, cada combate una batalla por la
              supervivencia. Si no cumples con las expectativas de Don G, seras
              victima de su cruel e infame cizaña. Entra a nuestro mundo de
              ataques a la tranquilidad y enfrenta tu destino.
            </p>
            <Button size="sm" className="mt-12" onClick={() => signIn()}>
              Ingresa Ahora
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
