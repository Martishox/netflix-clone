import { ChangeEvent, MouseEvent, useState } from "react";
import Image from "next/legacy/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileId } from "@/app/component/ContextProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageProfile = () => {
  const { profileId } = useProfileId();
  const [toggleDelete, setToggleDelete] = useState(true);
  const [name, setName] = useState(profileId?.name);

  const router = useRouter();

  const handleDeleteProfile = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      axios.delete("/api/profile", {
        data: { profileId },
      });

      router.replace("/profiles");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const toggleDeleteMessage = () => {
    setToggleDelete((prev) => !prev);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put("/api/profile", {
        profileId: profileId?.id,
        name: name,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="flex items-center h-full justify-center">
        {toggleDelete ? (
          <form className="flex flex-col">
            <h1 className="text-3xl md:text-7xl text-center text-white sm:text-left mb-2">
              Edit Profile
            </h1>
            <div className="flex-grow border-t border-[#2e2e2e]"></div>
            <div className="my-5 flex flex-col sm:flex-row items-center">
              {profileId?.image ? (
                <Image
                  src={profileId.image}
                  width={150}
                  height={150}
                  className="rounded-md"
                  alt="Profile"
                />
              ) : (
                <Skeleton
                  className="animate-pulse"
                  height={150}
                  width={150}
                />
              )}
              <div>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={handleNameChange}
                  className="bg-neutral-700 h-10 md:w-96 md:h-12 text-lg appearance-none py-1 px-2 mx-5 mt-5 sm:mt-0 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-grow border-t border-[#2e2e2e]"></div>
            <div className="">
              <Link
                href={{
                  pathname: "/profiles",
                }}>
                <button
                  type="submit"
                  onClick={handleSaveProfile}
                  className="bg-white text-black px-3 py-2 md:py-2.5 md:px-8 mr-5 mt-10 text-sm md:text-2xl font-bold hover:text-white hover:bg-[#cc0000]">
                  Save
                </button>
              </Link>

              <Link
                href={{
                  pathname: "/manageProfiles",
                }}>
                <button className="border text-sm md:text-2xl border-[#858585] text-[#858585] px-3 py-2 md:py-2.5 md:px-8 mr-5 hover:text-white hover:border-white">
                  Cancel
                </button>
              </Link>
              <button
                onClick={toggleDeleteMessage}
                className="border text-sm md:text-2xl border-[#858585] text-[#858585] px-3 py-2 md:py-2.5 md:px-8 hover:text-white hover:border-white">
                Delete Profile
              </button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col">
            <h1 className="text-3xl md:text-7xl text-white mb-3 text-center sm:text-left">
              Delete Profile?
            </h1>
            <div className="flex-grow border-t border-[#2e2e2e]"></div>
            <div className="my-5 flex items-center justify-center flex-wrap">
              <div className="flex flex-col items-center ">
                {profileId?.image ? (
                  <Image
                    src={profileId.image}
                    width={150}
                    height={150}
                    className="rounded-md"
                    alt="Profile"
                  />
                ) : (
                  <Skeleton
                    className="animate-pulse"
                    height={150}
                    width={150}
                  />
                )}
                <span className="text-[#cccccc] mt-2 text-lg">
                  {profileId.name}
                </span>
              </div>
              <span className="text-white text-sm text-justify md:px-3 px-8 md:text-xl ml-2 w-96">
                This profile's history - including My List, ratings
                and activity - will be gone forever, and you won't be
                able to access it again.
              </span>
            </div>
            <div className="flex-grow border-t border-[#2e2e2e]"></div>
            <div className="flex items-center mt-10 justify-center sm:justify-start">
              <button
                onClick={toggleDeleteMessage}
                className="bg-white text-black px-3 py-2 md:py-2.5 md:px-8 mr-5  text-sm md:text-2xl font-bold hover:text-white hover:bg-[#cc0000]">
                Keep Profile
              </button>

              <Link
                href={{
                  pathname: "/profiles",
                }}>
                <button
                  onClick={handleDeleteProfile}
                  type="submit"
                  className="border text-sm md:text-2xl border-[#858585] text-[#858585] px-3 py-2 md:py-2.5 md:px-8 hover:text-white hover:border-white">
                  Delete Profile
                </button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ManageProfile;
