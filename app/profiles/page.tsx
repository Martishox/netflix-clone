"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import CreateProfile from "@/app/component/CreateProfile";
import { useCallback, useEffect, useState } from "react";
import ProfileCard from "@/app/component/ProfileCard";
import useProfile from "../hooks/useProfiles";

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

  //router.refresh();

  console.log(newProfile);

  return (
    <>
      {newProfile === true ? (
        <CreateProfile />
      ) : (
        <div className="flex items-center h-full justify-center">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">
              Who's watching?
            </h1>
            <ProfileCard toggleNewProfile={toggleNewProfile} />
            <div className="  text-center mt-16 ">
              <button
                onClick={() => router.push("/manageProfiles")}
                className="border border-[#858585] text-[#858585] py-2.5 px-8 text-xl md:text-2xl hover:text-white hover:border-white">
                Manage Profiles
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profiles;
