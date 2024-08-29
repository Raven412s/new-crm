import { auth } from "@/auth";
export default async function Dashboard() {
const session = await auth()
const user = session?.user
  if (!user?.name) {
    return <div>Error: User data is incomplete.</div>;
  }

  return <div>Hello, {user?.name}</div>;
}
