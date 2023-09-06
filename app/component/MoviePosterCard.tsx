import { FC } from "react";
import Image from "next/legacy/image";
interface MoviePosterCardProps {
  data: Record<string, string>;
}

const MoviePosterCard: FC<MoviePosterCardProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <div>
        <Image
          className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
          width={1920}
          height={1000}
          src={data.poster}
          alt="Thumbnail"
        />
      </div>
    </>
  );
};

export default MoviePosterCard;
