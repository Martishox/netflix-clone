import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

const useProfiles = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/profiles",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3000,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfiles;
