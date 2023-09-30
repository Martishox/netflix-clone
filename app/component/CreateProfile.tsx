import { ChangeEvent, FC, useCallback, useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import Image from "next/legacy/image";
import axios from "axios";
import { useProfile } from "@/app/component/ContextProvider";

interface CreateProfileProps {
  toggleNewProfile: () => void;
}

const CreateProfile: FC<CreateProfileProps> = ({
  toggleNewProfile,
}) => {
  const imageKids =
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207889/default-kids_cowvea.png";

  const imagesCount = [
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207690/default-slate_ocqrun.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207664/default-green_bitm7b.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207663/default-red_vtifur.png",
    "https://res.cloudinary.com/dthrgdcko/image/upload/v1694207663/default-blue_fj1iye.png",
  ];
  const randomIndex = Math.floor(Math.random() * imagesCount.length);

  const { setProfile } = useProfile();

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

  const handleCreateProfile = useCallback(async () => {
    const newProfileData = {
      name: profileData.name,
      image: selectedImage,
      kid: profileData.kid,
    };

    await axios
      .post("/api/profile", newProfileData)
      .then((response) => {
        setProfile({
          id: response.data.id,
          name: profileData.name,
          image: selectedImage,
          kid: profileData.kid,
        });
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  }, [profileData]);

  const handleBack = () => {
    toggleNewProfile();
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
          <h3 className=" my-4 text-sm md:text-2xl text-[#545454] text-left">
            Add a profile for another person watching Netflix.
          </h3>
          <div className="flex-grow border-t border-[#2e2e2e]"></div>
          <div className="my-5 flex flex-col sm:flex-row items-center max-w-full h-auto">
            <Image
              className="rounded-md mx-2"
              width={150}
              height={150}
              src={selectedImage}
              alt="Profile"
            />
            <div className="flex mt-5 sm:mt-0">
              <input
                required
                type="text"
                placeholder="Name"
                value={profileData.name}
                onChange={handleNameChange}
                className="bg-neutral-700 w-52 sm:w-64 h-10 md:w-96 md:h-12 text-lg appearance-none py-1 px-2 mx-5 text-white focus:outline-none"
              />
              <div className="flex items-center">
                <div
                  onClick={toggleIsCheck}
                  className="cursors-pointer group/item ">
                  <Icon
                    className="text-[#545454] cursor-pointer max-w-full w-8 h-8"
                    size={50}
                  />
                </div>
                <span className="text-white text-md md:text-xl ml-2">
                  Kid?
                </span>
              </div>
            </div>
          </div>
          <div className="flex-grow border-t border-[#2e2e2e]"></div>
          <div>
            <button
              type="submit"
              onClick={() => {
                if (profileData.name !== "") {
                  handleCreateProfile();
                  handleBack();
                }
              }}
              className="bg-white text-black py-2.5 px-8 mr-5 mt-10 text-sm md:text-2xl font-bold hover:text-white hover:bg-[#cc0000]">
              Continue
            </button>

            <button
              onClick={() => handleBack()}
              className="border text-sm md:text-2xl border-[#858585] text-[#858585] py-2.5 px-8 hover:text-white hover:border-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfile;
