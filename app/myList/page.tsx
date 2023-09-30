"use client";

import Navbar from "@/app/component/Navbar";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useMovieList from "@/app/hooks/useMovieList";
import MovieList from "@/app/component/MovieList";
import { useProfile } from "@/app/component/ContextProvider";
import useFavorites from "@/app/hooks/useFavorites";

const MyList = () => {
  const { profile } = useProfile();
  const { data: favorites = [] } = useFavorites(profile?.id);
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
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default MyList;
