"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CreateProfile from "@/app/component/CreateProfile";
import { useState } from "react";
import ProfileCard from "@/app/component/ProfileCard";

const Profiles = () => {
  const [newProfile, setNewProfile] = useState(false);

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
      {newProfile === true ? (
        <CreateProfile />
      ) : (
        <div className="flex items-center h-full justify-center">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">
              Who's watching
            </h1>
            <ProfileCard toggleNewProfile={toggleNewProfile} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profiles;
