import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { PiPencilSimpleBold } from "react-icons/pi";
import { useProfile } from "@/app/component/ContextProvider";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: FC<AccountMenuProps> = ({ visible }) => {
  const { data: session } = useSession();

  const { profile } = useProfile();

  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border border-gray-800 flex cursor-default">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {profile?.image ? (
            <Image
              src={profile.image}
              width={40}
              height={40}
              className="rounded-sm"
              alt="Profile"
            />
          ) : (
            <Skeleton
              className="animate-pulse"
              height={40}
              width={40}
            />
          )}
          {profile?.name ? (
            <p className="text-white text-sm hover/item:underline cursor-pointer">
              {profile?.name}
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
            onClick={() => router.push("/manageProfiles")}
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
