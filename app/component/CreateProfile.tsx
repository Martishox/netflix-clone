import { ChangeEvent, FC, useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import Image from "next/legacy/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateProfile = () => {
  const imageKids =
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207889/default-kids_cowvea.png";

  const imagesCount = [
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207690/default-slate_ocqrun.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207664/default-green_bitm7b.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207663/default-red_vtifur.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207663/default-blue_fj1iye.png",
  ];
  const randomIndex = Math.floor(Math.random() * imagesCount.length);

  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: "",
    image: "",
    kid: false,
  });

  const [selectedImage, setSelectedImage] = useState(
    imagesCount[randomIndex]
  );

  const handleImageChange = () => {
    setSelectedImage(
      profileData.kid === false ? imageKids : imagesCount[randomIndex]
    );
  };

  const toggleIsCheck = () => {
    setProfileData((prevData) => ({
      ...prevData,
      kid: !prevData.kid,
    }));
    handleImageChange();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, name: e.target.value });
  };

  const handleCreateProfile = () => {
    const newProfileData = {
      name: profileData.name,
      image: selectedImage,
      kid: profileData.kid,
    };

    axios
      .post("/api/profile", newProfileData)
      .then((response) => {
        console.log("Profile created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  const Icon = profileData.kid
    ? MdOutlineCheckBox
    : MdOutlineCheckBoxOutlineBlank;

  return (
    <>
      <div className="flex items-center h-full justify-center">
        <form className="flex flex-col">
          <h1 className="text-3xl md:text-7xl text-white text-left">
            Add Profile
          </h1>
          <h3 className=" my-4 text-md md:text-2xl text-[#545454] text-left">
            Add a profile for another person watching Netflix.
          </h3>
          <div className="flex-grow border-t border-[#2e2e2e]"></div>
          <div className="my-5 flex items-center">
            <Image
              className="rounded-md mx-2"
              width={150}
              height={150}
              src={selectedImage}
              alt="Profile"
            />

            <input
              type="text"
              placeholder="Name"
              value={profileData.name}
              onChange={handleNameChange}
              className="bg-neutral-700 w-96 h-12 text-lg appearance-none py-1 px-2 mx-5 text-white focus:outline-none"
            />
            <div
              onClick={toggleIsCheck}
              className="cursors-pointer group/item">
              <Icon
                className="text-[#545454] cursor-pointer"
                size={50}
              />
            </div>
            <span className="text-white text-xl ml-2">Kid?</span>
          </div>
          <div className="flex-grow border-t border-[#2e2e2e]"></div>
          <div>
            <Link
              href={{
                pathname: "/profiles",
              }}>
              <button
                type="submit"
                onClick={() => {
                  handleCreateProfile();
                }}
                className="bg-white text-black py-2.5 px-8 mr-5 mt-10 text-xl md:text-2xl font-bold hover:text-white hover:bg-[#cc0000]">
                Continue
              </button>
            </Link>

            <button
              onClick={() => router.back()}
              className="border text-xl md:text-2xl border-[#858585] text-[#858585] py-2.5 px-8 hover:text-white hover:border-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfile;
