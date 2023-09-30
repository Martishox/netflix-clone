import axios from "axios";
import React, { FC, useCallback, useMemo } from "react";

import useFavorites from "@/app/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentProfile from "@/app/hooks/useCurrentProfile";
import { useProfile } from "@/app/component/ContextProvider";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { profile } = useProfile();
  const { data: currentProfile, mutate } = useCurrentProfile(
    profile?.id
  );

  console.log(profile);

  const { mutate: mutateFavorites } = useFavorites(profile?.id);

  const isFavorite = useMemo(() => {
    const list = currentProfile?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentProfile, movieId]);

  const toggleFavorites = useCallback(async () => {
    try {
      let response;
      if (isFavorite) {
        response = await axios.delete("/api/favorite", {
          data: { movieId, profile },
        });
      } else {
        response = await axios.post("/api/favorite", {
          movieId,
          profile,
        });
      }

      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentProfile,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  }, [movieId, isFavorite, currentProfile, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
