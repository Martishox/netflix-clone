"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import ProfileCard from "@/app/component/ProfileCard";

const Profiles = () => {
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
      <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">
            Who's watching?
          </h1>
          <ProfileCard toggleNewProfile={toggleNewProfile} />
          <div className="  text-center mt-16 ">
            <button
              onClick={() => router.push("/profiles")}
              className=" bg-white text-black font-bold py-3 px-9 text-xl md:text-2xl hover:text-white hover:bg-[#cc0000]">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profiles;
