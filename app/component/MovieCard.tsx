import { FC, useState } from "react";
import Image from "next/legacy/image";
import { BsPlayFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import FavoriteButton from "@/app/component/FavoriteButton";
import { useRouter } from "next/navigation";
import useInfoModalStore from "@/app/hooks/useInfoModalStore";

interface MovieCardProps {
  data: Record<string, string>;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  window.addEventListener("resize", handleResize);
  return (
    <>
      <div className="group bg-zinc-900 col-span relative ">
        <div
          className="h-[15vw] sm:h-[12vw] w-[28vw] md:w-[18vw]"
          onClick={() => openModal(data?.id)}>
          <Image
            className={`cursor-pointer object-cover transition duration shadow-xl rounded-md ${
              isMobile
                ? ""
                : "group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
            } w-full h-[12vw]`}
            width={1920}
            height={1000}
            src={data.thumbnailUrl}
            alt="Thumbnail"
          />
        </div>
        <div
          className={`opacity-0 rounded-t-md absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 bg-zinc-800 ${
            isMobile
              ? ""
              : "group-hover:scale-110 group-hover:-translate-y-[10vw] group-hover:translate-x-[1.5vw] group-hover:opacity-100"
          }`}>
          <Image
            className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
            width={1920}
            height={1000}
            src={data.thumbnailUrl}
            alt="Thumbnail"
          />
          <div className="bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={() => router.push(`/watch/${data?.id}`)}
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                <BsPlayFill size={30} />
              </div>
              <FavoriteButton movieId={data?.id} />
              <div
                onClick={() => openModal(data?.id)}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                <FiChevronDown
                  size={30}
                  className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
                />
              </div>
            </div>
            <p className="text-green-400 font-semibold mt-4">
              New <span className="text-white">2023</span>
            </p>

            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">
                {data.duration}
              </p>
              <p className="text-white text-[10px] lg:text-sm">
                {data.genre}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
