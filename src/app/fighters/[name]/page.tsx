"use client";

import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { name: string } }) {
  const router = useRouter();

  return <p>Post: {params.name}</p>;
}
