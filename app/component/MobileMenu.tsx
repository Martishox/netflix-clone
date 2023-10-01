import Link from "next/link";
import { FC } from "react";

interface MobileMenuProps {
  visible: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          <Link
            href={{
              pathname: "/",
            }}>
            Home
          </Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link
            href={{
              pathname: "/films",
            }}>
            Films
          </Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link
            href={{
              pathname: "/new",
            }}>
            New & Popular
          </Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link
            href={{
              pathname: "/myList",
            }}>
            My List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
