"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ManageProfile from "@/app/component/ManageProfile";

const Manage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <ManageProfile />
    </>
  );
};

export default Manage;
