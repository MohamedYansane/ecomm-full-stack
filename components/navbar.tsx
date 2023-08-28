import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import { StoreSwitcher } from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  //we fetch all the stores the user have and pass it to the store SWICTHER
  const store = await prismadb.store.findMany({
    where: { userId: userId },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
