"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOut,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <header
        className={`grid items-center ${
          session ? "grid-cols-2" : "grid-cols-2"
        } py-3 bg-[#0e1922] w-full px-8`}
      >
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300 tracking-[1px]"
        >
          TASK APP
        </Link>

        <div className="flex items-center justify-end space-x-4 p-4">
          {session ? (
            <div onClick={toggleOptions} className="cursor-pointer">
              <div className="flex items-center space-x-2">
                <p className=" text-white">{session?.user?.username}</p>
                <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-600 text-xl"
                  />
                </div>
                {showOptions && (
                  <div className="flex flex-col bg-[#172736] p-4 absolute top-20 right-4 rounded-xl shadow-md">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center text-red-600 hover:text-red-800 gap-1"
                    >
                      <FontAwesomeIcon icon={faSignOut} className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div onClick={toggleOptions} className="cursor-pointer">
              <div className="flex items-center space-x-2">
                {showOptions && (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/register"
                      className="flex items-center text-white hover:text-[#ffffffd1] gap-1"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
                      Register
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center text-white hover:text-[#ffffffd1] gap-1"
                    >
                      <FontAwesomeIcon
                        icon={faSignIn}
                        className="text-lg relative right-0.5"
                      />
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
