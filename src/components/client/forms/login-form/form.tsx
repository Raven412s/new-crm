"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import { loginFunction } from "../../../../server-actions/loginAction"; // Import the server action
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../../../ui/button";

const CredentialsLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form
      action={async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
          toast.error("Please provide all the fields");
        }
        const toastId = toast.loading("logging in...");
        const err = await loginFunction(formData);
        if (!err) {
          toast.success("login successfull", { id: toastId });
        }

        if (err) {
          toast.error(String(err), { id: toastId });
        }

        loginFunction(formData);
      }}
      className="grid gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          name="email"
        />
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
      <Button className="w-full" type="submit">
        Sign in
      </Button>
    </form>
  );
};

export default CredentialsLogin;
