import { FC, useRef, useState } from "react";
import MovieCard from "@/app/component/MovieCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface MovieListProps {
  data: Record<string, string>[];
  title: string;
}

const MovieList: FC<MovieListProps> = ({ data, title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const toggleScroll = (direction: "right" | "left") => {
    if (containerRef.current) {
      const newScrollPosition =
        direction === "right"
          ? scrollPosition - 650
          : scrollPosition + 650;
      setScrollPosition(newScrollPosition);

      setShowLeftButton(direction === "right");
      setShowRightButton(direction === "left");
    }
  };

  return (
    <>
      <div className="md:px-12 px-6 mt-10 space-y-6 no-scrollbar md:overflow-visible overflow-x-auto overflow-y-hidden transition relative w-full">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 ">
          {title}
        </p>
        <div
          className="flex gap-2"
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: "transform 0.3s ease",
          }}
          ref={containerRef}>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
        {data.length > 5 && showRightButton && (
          <button
            className="hidden md:inline absolute right-0 top-0 h-[26vw] md:h-[14vw] sm:h-[22vw] mr-6"
            onClick={() => toggleScroll("right")}>
            <FiChevronRight className="text-[#cccccc] text-3xl xs:text-4xl sm:text-5xl bg-black bg-opacity-50 rounded-full" />
          </button>
        )}

        {showLeftButton && (
          <button
            className="hidden md:inline absolute left-0 top-0 h-[26vw] md:h-[14vw] sm:h-[22vw] ml-14"
            onClick={() => toggleScroll("left")}>
            <FiChevronLeft className="text-[#cccccc] text-3xl xs:text-4xl sm:text-5xl bg-black bg-opacity-50 rounded-full" />
          </button>
        )}
      </div>
    </>
  );
};

export default MovieList;
