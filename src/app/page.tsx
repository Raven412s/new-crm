import { auth } from "@/auth";

export default async function Home() {
    const session = await auth()
    const user = session?.user

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {user?.name}
    </main>
  );
}
