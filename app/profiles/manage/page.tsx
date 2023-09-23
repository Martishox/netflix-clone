"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import CreateProfile from "@/app/component/CreateProfile";
import { useState } from "react";
import ManageProfile from "@/app/component/ManageProfile";

const Manage = () => {
  const [newProfile, setNewProfile] = useState(false);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const toggleNewProfile = () => {
    setNewProfile((prev) => !prev);
  };

  return (
    <>
      <ManageProfile />
    </>
  );
};

export default Manage;
