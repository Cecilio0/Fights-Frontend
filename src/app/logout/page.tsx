"use client";

import { signOut } from "next-auth/react";

export default function signOutPage() {
  signOut();

  return null;
}
