"use client";

import Navbar from "@/app/component/Navbar";
import Billboard from "@/app/component/Billboard";
import MovieList from "@/app/component/MovieList";
import useMovieList from "@/app/hooks/useMovieList";
import useFavorites from "@/app/hooks/useFavorites";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useProfileId } from "@/app/component/ContextProvider";
import useInfoModalStore from "@/app/hooks/useInfoModalStore";
import InfoModal from "@/app/component/InfoModal";

export default function Home() {
  const { profileId } = useProfileId();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites(profileId?.id);
  const { isOpen, closeModal } = useInfoModalStore();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Popular on Netflix" data={movies} />
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
