"use client";

import { useInitializeUser } from "../hooks/useInitializeUser";

export default function UserInitializer() {
  useInitializeUser();
  return null; // This component only runs the effect, so it doesn't render anything
}
