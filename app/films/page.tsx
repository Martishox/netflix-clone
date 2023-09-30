"use client";

import Navbar from "@/app/component/Navbar";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useMovieList from "@/app/hooks/useMovieList";
import MovieList from "@/app/component/MovieList";
import InfoModal from "@/app/component/InfoModal";
import Billboard from "@/app/component/Billboard";
import useInfoModalStore from "@/app/hooks/useInfoModalStore";
import useFavorites from "@/app/hooks/useFavorites";
import { useProfile } from "@/app/component/ContextProvider";

const Films = () => {
  const { profile } = useProfile();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites(profile?.id);
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
        <MovieList title="New & Popular" data={movies} />
        <MovieList title="Top Searches" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Films;
