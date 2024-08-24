// src/app/login/loginAction.ts
"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export async function loginFunction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
 try {
    await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
        });
 } catch (error) {
    const err = error as CredentialsSignin
    return err.cause
 }
}
