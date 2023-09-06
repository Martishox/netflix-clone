"use client";

import Navbar from "@/app/component/Navbar";
import Billboard from "@/app/component/Billboard";
import MovieList from "@/app/component/MovieList";
import useMovieList from "@/app/hooks/useMovieList";
import useFavorites from "@/app/hooks/useFavorites";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useProfileId } from "@/app/component/ContextProvider";

export default function Home() {
  const { profileId } = useProfileId();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites(profileId?.id);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
