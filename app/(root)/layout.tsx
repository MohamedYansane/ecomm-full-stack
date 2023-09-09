import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  //in our (root) we've no [storeId] we can access or
  // the user active store so to access a user store
  //what w gonna do we gonna redirect the user to the
  //[storeId] and it gonna redirect to the dashboard
  // that will check the process if the user has a store inside the layout of dashboard file
  const store = await prismadb.store.findFirst({
    where: { userId },
  });
  if (store) {
    redirect(`/${store.id}`);
  }

  //billboard
  const billboard = await prismadb.billboard;
  return <>{children}</>;
}
