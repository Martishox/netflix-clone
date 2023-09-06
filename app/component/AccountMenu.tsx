import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import profile from "@/app/public/default-slate.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter, useSearchParams } from "next/navigation";
import { PiPencilSimpleBold } from "react-icons/pi";
import useCurrentProfile from "../hooks/useCurrentProfile";
import { useProfileId } from "./ContextProvider";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: FC<AccountMenuProps> = ({ visible }) => {
  const { data: session } = useSession();

  const { profileId } = useProfileId();

  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border border-gray-800 flex cursor-default">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {profileId?.image ? (
            <Image
              src={profileId.image}
              width={40}
              height={40}
              className="rounded-md"
              alt="Profile"
            />
          ) : (
            <Skeleton
              className="animate-pulse"
              height={40}
              width={40}
            />
          )}
          {profileId?.name ? (
            <p className="text-white text-sm hover/item:underline cursor-pointer">
              {profileId?.name}
            </p>
          ) : (
            <Skeleton
              className="animate-pulse"
              height={15}
              width={70}
            />
          )}
        </div>
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <PiPencilSimpleBold className="text-white" size={30} />
          <p
            onClick={() => router.push("/profiles")}
            className="text-white text-sm hover/item:underline cursor-pointer">
            Manage Profiles
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline cursor-pointer">
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
