"use client";

import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface ProfileIdContextType {
  profileId: {
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    kid: boolean | undefined;
  };
  setProfileId: Dispatch<
    SetStateAction<{
      id: string | undefined;
      name: string | undefined;
      image: string | undefined;
      kid: boolean | undefined;
    }>
  >;
}

const defaultValue: ProfileIdContextType = {
  profileId: {
    id: undefined,
    name: undefined,
    image: undefined,
    kid: undefined,
  },
  setProfileId: () => {},
};

const ProfileIdContext = createContext(defaultValue);

export const useProfileId = () => {
  return useContext(ProfileIdContext);
};

export const ProfileIdProvider = ({
  children,
}: ContextProviderProps) => {
  const [profileId, setProfileId] = useState<{
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    kid: boolean | undefined;
  }>(() => {
    return defaultValue.profileId;
  });

  // const router = useRouter();

  // useEffect(() => {
  //   if (profileId.id === undefined) {
  //     setTimeout(() => {
  //       router.push("/profiles");
  //     }, 5000);
  //   }
  // }, [profileId]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedProfileId = localStorage.getItem("profileId");
      if (storedProfileId) {
        const parsedProfileId = JSON.parse(storedProfileId);
        setProfileId(parsedProfileId);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("profileId", JSON.stringify(profileId));
    }
  }, [profileId]);

  return (
    <ProfileIdContext.Provider value={{ profileId, setProfileId }}>
      {children}
    </ProfileIdContext.Provider>
  );
};
