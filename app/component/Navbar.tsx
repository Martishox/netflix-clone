import Image from "next/legacy/image";
import logo from "@/app/public/logo.png";
import NavbarItem from "@/app/component/NavbarItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BsChevronDown } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import MobileMenu from "@/app/component/MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "@/app/component/AccountMenu";
import { useProfileId } from "./ContextProvider";
import Link from "next/link";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const { profileId } = useProfileId();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-50 top-0">
      <div
        className={` px-4 md-px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } `}>
        <div className="sm:inline hidden">
          <Image height={31} width={120} src={logo} />
        </div>

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <Link
            href={{
              pathname: "/",
            }}>
            <NavbarItem label="Home" />
          </Link>
          <Link
            href={{
              pathname: "/films",
            }}>
            <NavbarItem label="Films" />
          </Link>
          <Link
            href={{
              pathname: "/new",
            }}>
            <NavbarItem label="New & Popular" />
          </Link>
          <Link
            href={{
              pathname: "/myList",
            }}>
            <NavbarItem label="My List" />
          </Link>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BiBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              {profileId?.image ? (
                <Image
                  src={profileId.image}
                  width={40}
                  height={40}
                  alt="Profile"
                />
              ) : (
                <Skeleton
                  className="animate-pulse"
                  height={40}
                  width={40}
                />
              )}
            </div>
            <BsChevronDown
              className={`text-white transition hidden md:inline ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
