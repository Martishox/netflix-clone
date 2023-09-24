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

  console.log(scrollPosition);

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
    <div className="md:px-12 mt-4 space-y-8 no-scrollbar transition relative w-full whitespace-nowrap">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      <div
        className="flex space-x-2"
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
          className="absolute right-0 top-0 h-[20vw] md:h-[12vw] mr-6 "
          onClick={() => toggleScroll("right")}>
          <FiChevronRight className="text-[#cccccc] md:text-xl lg:text-5xl bg-black bg-opacity-50 rounded-full" />
        </button>
      )}

      {showLeftButton && (
        <button
          className="absolute left-0 top-0 h-[13vw] ml-14"
          onClick={() => toggleScroll("left")}>
          <FiChevronLeft
            size={50}
            className="bg-black bg-opacity-50 rounded-full text-[#cccccc]"
          />
        </button>
      )}
    </div>
  );
};

export default MovieList;
