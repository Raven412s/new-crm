import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import CredentialsLogin from "@/components/client/form";
import { redirect } from "next/navigation";

export default async function LoginForm() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center h-dvh bg-zinc-950 dark:bg-zinc-300">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsLogin />
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            don't have an account,{" "}
            <Link
              className="font-semibold transition-all dark:text-fuchsia-200/90 dark:hover:text-fuchsia-200 text-fuchsia-400/90 hover:text-fuchsia-400"
              href={"/sign-up"}
            >
              SignUp
            </Link>{" "}
            now
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
