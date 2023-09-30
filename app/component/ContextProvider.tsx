"use client";

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

interface ProfileContextType {
  profile: {
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    kid: boolean | undefined;
  };
  setProfile: Dispatch<
    SetStateAction<{
      id: string | undefined;
      name: string | undefined;
      image: string | undefined;
      kid: boolean | undefined;
    }>
  >;
}

const defaultValue: ProfileContextType = {
  profile: {
    id: undefined,
    name: undefined,
    image: undefined,
    kid: undefined,
  },
  setProfile: () => {},
};

const ProfileContext = createContext(defaultValue);

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({
  children,
}: ContextProviderProps) => {
  const [profile, setProfile] = useState<{
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    kid: boolean | undefined;
  }>(() => {
    return defaultValue.profile;
  });

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedProfile = localStorage.getItem("profile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
