import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/profiles",
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

export default useProfile;
