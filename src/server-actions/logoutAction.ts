"use server"
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const LogoutFunction =  async () => {
    await signOut();
    redirect("/login")
  }
