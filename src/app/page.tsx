import { auth } from "@/auth";
import { redirect } from "next/navigation";

type User = {
  name: string;
  // Add other properties as needed
};

export default async function Dashboard() {
  let user: User | null = null;
  try {
    const session = await auth();
    user = session?.user as User | null;
  } catch (error) {
    console.error("Failed to fetch user session:", error);
    // redirect("/error"); // Or some error page
    return null;
  }

  if (!user) {
    // redirect("/login");
    return null;
  }

  if (!user.name) {
    return <div>Error: User data is incomplete.</div>;
  }

  return <div>Hello, {user.name}</div>;
}
