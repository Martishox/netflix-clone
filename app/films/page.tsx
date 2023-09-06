"use client";

import Navbar from "@/app/component/Navbar";
import Billboard from "@/app/component/Billboard";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useMovieList from "../hooks/useMovieList";
import MovieList from "../component/MovieList";
import MoviePosterList from "../component/MoviePosterList";

const Films = () => {
  const { data: movies = [] } = useMovieList();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <Navbar />

      <div className="pb-40">
        <MoviePosterList title="Trending Now" data={movies} />
      </div>
    </>
  );
};

export default Films;
