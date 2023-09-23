import { FC, useRef, useState } from "react";
import MovieCard from "@/app/component/MovieCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface MovieListProps {
  data: Record<string, string>[];
  title: string;
}

const MovieList: FC<MovieListProps> = ({ data, title }) => {
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // const toggleScroll = () => {
  //   if (containerRef.current) {
  //     const newScrollPosition = scrollPosition + -650;

  //     // Set the new left position
  //     containerRef.current.style.left = `-${newScrollPosition}px`;

  //     // Update the scroll position
  //     setScrollPosition(newScrollPosition);
  //   }
  // };

  return (
    <div
      className="md:px-12 mt-4 space-y-8 no-scrollbar transition relative overflow-visible"
      style={{ width: "100%", whiteSpace: "nowrap" }}>
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      <div
        className="flex space-x-2"
        // style={{
        //   transform: `translateX(${scrollPosition}px)`,
        //   transition: "transform 0.3s ease",
        // }}
        //ref={containerRef}
      >
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
        {/* <button
          className=" absolute inset-0 bg-black bg-opacity-50 h-[9.4vw] w-[2.1vw] float-right z-15"
          onClick={toggleScroll}>
          <FiChevronRight size={50} className="text-[#cccccc]" />
        </button> */}
      </div>
    </div>
  );
};

export default MovieList;
