import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

const useCurrentProfile = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? `/api/profiles/${profileId}` : null,
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

export default useCurrentProfile;
