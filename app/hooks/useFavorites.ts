import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

const useFavorites = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? `/api/favorites/${profileId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
