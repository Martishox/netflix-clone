"use client";

import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import useMovie from "@/app/hooks/useMovie";
import { useEffect } from "react";

const Watch = ({ params }: { params: { movieId: string } }) => {
  const router = useRouter();

  const { movieId } = params;

  const { data } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <BsArrowLeftShort
          size={30}
          onClick={() => router.push("/")}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        controls
        disablePictureInPicture
        autoPlay
        src={data?.videoUrl}></video>
    </div>
  );
};

export default Watch;
