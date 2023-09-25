import { redirect, usePathname } from "next/navigation";
import Image from "next/legacy/image";
import profile from "@/app/public/default-slate.png";
import React, { FC, useCallback, useEffect } from "react";
import useProfile from "@/app/hooks/useProfiles";
import { useSession } from "next-auth/react";
import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileId } from "@/app/component/ContextProvider";
import { PiPencilSimpleBold } from "react-icons/pi";

interface ProfileCardProps {
  toggleNewProfile?: () => void;
}

interface ProfileProps {
  name: string;
  image: string;
  id: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ toggleNewProfile }) => {
  const pathname = usePathname();
  const { data: profileData } = useProfile();
  const { setProfileId } = useProfileId();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <div className="flex items-center justify-center flex-wrap nt-10 mt-10 ">
        {profileData &&
          profileData?.map(
            (profiles: ProfileProps, index: number) => (
              <div key={`profile-${index}`} className="flex">
                <div
                  onClick={() =>
                    setProfileId({
                      id: profiles.id,
                      name: profiles.name,
                      image: profiles.image,
                      kid: false,
                    })
                  }
                  className="group flex-row w-44 mx-4 my-5">
                  {pathname === "/manageProfiles" ? (
                    <Link
                      href={{
                        pathname: "/profiles/manage",
                      }}>
                      <div className="group relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                        <Image
                          src={profiles?.image}
                          width={220}
                          height={220}
                          alt="Profile"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-100 transition-opacity">
                          <PiPencilSimpleBold
                            className="text-white"
                            size={50}
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                        {profiles?.name}
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/",
                      }}>
                      <div className=" w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                        <Image
                          src={profiles?.image}
                          width={220}
                          height={220}
                          alt="Profile"
                        />
                      </div>
                      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                        {profiles?.name}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )
          )}

        {!profileData
          ? Array.from({ length: 4 }, (_, index) => (
              <div key={`skeleton-${index}`} className="flex">
                <div className="group flex-row w-44 mx-4 my-5">
                  <div className="group relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent overflow-hidden">
                    <Skeleton height={220} width={220} />
                  </div>
                  <div className="mt-4 text-gray-400 text-2xl text-center">
                    <Skeleton width={100} />
                  </div>
                </div>
              </div>
            ))
          : ""}

        {profileData && profileData.length === 5 ? (
          " "
        ) : (
          <div
            className="group flex-row w-44"
            onClick={toggleNewProfile}>
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <BsPlusCircle className="text-white" size={80} />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
              Add Profile
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
