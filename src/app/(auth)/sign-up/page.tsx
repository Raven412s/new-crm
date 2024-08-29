"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signupFunction } from "../../../server-actions/signupAction"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function SignUpForm() {
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
        <div className="flex items-center justify-center h-dvh bg-zinc-950 dark:bg-zinc-300">
             <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign-Up</CardTitle>
        <CardDescription>
          Fill the details and make yourself a new account now.
        </CardDescription>
      </CardHeader>
      <CardContent >
        <form action={signupFunction} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Tyler" required name="name"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" type="number" required name="mobile"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required name="email"/>
        </div>
        <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"} // Toggle input type
                name="password"
                className="pr-10 items-center flex"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 top-5 flex items-center text-zinc-500 dark:text-zinc-400"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
        <div className="grid gap-2">
          <Label htmlFor="matchPassword">Confirm Password</Label>
          <Input id="matchPassword" type="text" name="matchPassword"/>
        </div>
        <Button className="w-full" type="submit">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">Already have an account, <Link className="font-semibold transition-all dark:text-fuchsia-200/90 dark:hover:text-fuchsia-200 text-fuchsia-400/90 hover:text-fuchsia-400 " href={"/login"}>Login</Link> now</p>
      </CardFooter>
    </Card>
        </div>
  )
}
