import React from "react";
import { BsPlusCircle } from "react-icons/bs";

const CreateProfile = () => {
  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        {/* <Image src={profile} alt="Profile" /> */}
        <BsPlusCircle className="text-white" size={80} />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {/* {session?.user?.name} */}Add Profile
      </div>
    </div>
  );
};

export default CreateProfile;
