"use client";

import Navbar from "@/app/component/Navbar";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useMovieList from "@/app/hooks/useMovieList";
import MovieList from "@/app/component/MovieList";

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

      <div className="pb-40 relative">
        <div className="relative mt-52"></div>
        <MovieList title="Films" data={movies} />
      </div>
    </>
  );
};

export default Films;
