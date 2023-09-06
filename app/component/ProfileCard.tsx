import { redirect, useRouter } from "next/navigation";
import Image from "next/legacy/image";
import profile from "@/app/public/default-slate.png";
import React, { FC } from "react";
import useProfile from "@/app/hooks/useProfiles";
import { useSession } from "next-auth/react";
import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";
import { useProfileId } from "@/app/component/ContextProvider";

interface ProfileCardProps {
  toggleNewProfile: () => void;
}

interface ProfileProps {
  name: string;
  image: string;
  id: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ toggleNewProfile }) => {
  const router = useRouter();

  const { setProfileId } = useProfileId();

  const { data: profileData } = useProfile();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <div className="flex items-center justify-center flex-wrap nt-10 mt-10">
        <div className="flex gap-4" onClick={() => router.push("/")}>
          <div className="group flex-row w-44 mx-2 my-5">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <Image
                src={profile}
                width={190}
                height={190}
                alt="Profile"
              />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
              {session?.user?.name}
            </div>
          </div>
        </div>

        {profileData &&
          profileData.map((profiles: ProfileProps, index: number) => (
            <div key={`profile-${index}`} className="flex gap-4">
              <div
                onClick={() =>
                  setProfileId({
                    id: profiles.id,
                    name: profiles.name,
                    image: profiles.image,
                    kid: false,
                  })
                }
                className="group flex-row w-44 mx-2 my-5">
                <Link
                  href={{
                    pathname: "/",
                  }}>
                  <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                    <Image
                      src={profiles?.image}
                      width={190}
                      height={190}
                      alt="Profile"
                    />
                  </div>
                  <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                    {profiles?.name}
                  </div>
                </Link>
              </div>
            </div>
          ))}

        {profileData && profileData.length === 4 ? (
          " "
        ) : (
          <div className="group flex-row w-44 mx-auto">
            <Link
              href={{
                pathname: "/addProfile",
              }}>
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <BsPlusCircle className="text-white" size={80} />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                Add Profile
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
