"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/legacy/image";
import profile from "@/app/public/default-slate.png";
import { useRouter } from "next/navigation";
import CreateProfile from "../component/CreateProfile";

const Profiles = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who's watching
        </h1>
        <div className="flex items-center justify-center gap-8 nt-10 mt-10">
          <div
            className="flex gap-4"
            onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image src={profile} alt="Profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {session?.user?.name}
              </div>
            </div>

            <CreateProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
