"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "../Sidebar/Sidebar";
import Link from "next/link";
import logo from "@/assets/images/default.svg";
import { usePathname } from "next/navigation";
import { SearchField } from "../";
import { useSearchContext } from "@/context/SearchContext";

import UseAnimation from "react-useanimations";
import searchToX from "react-useanimations/lib/searchToX";
import "animate.css";
import { useSidebarContext } from "@/context/SidebarContext";

const Header = () => {
  const pathname = usePathname();
  const { isSearch, setIsSearch } = useSearchContext();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname?.includes("search")) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [pathname]);

  const [scroll, setScroll] = useState(false);

  const getScroll = () => {
    const check = typeof window !== "undefined" && window.scrollY;
    if (check >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", getScroll);
  }, []);
  return (
    <header
      className={`z-50 bg-white ${
        isSearch && scroll ? "shadow fixed w-full top-0" : ""
      }`}
    >
      <nav
        className="flex items-center justify-between pr-4 py-0 sm:p-6 sm:py-3 md:px-8"
        aria-label="Global"
      >
        <div className="flex z-10 md:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Vest Finance</span>

            <Image src={logo} width={200} height={30} alt="vest finance" />
          </Link>
        </div>

        {isSearch && (
          <SearchField
            variant="primary"
            className=" animate__animated animate__fadeInUp !hidden sm:!block "
          />
        )}

        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-end gap-x-8">
          <span
            className="text-sm font-normal cursor-pointer text-gray-900"
            onClick={() => {
              setIsSearch(!isSearch);
            }}
          >
            <UseAnimation
              reverse={isSearch}
              onClick={() => {
                setIsSearch(!isSearch);
              }}
              size={25}
              animation={searchToX}
              className="text-gray-900 font-normal mt-1"
            />
            {/* {isSearch ? (
              ""
            ) : (
              <LuSearch
                className="text-gray-900 font-normal mt-1"
                fontSize={18}
              />
            )} */}
          </span>
          <Link href="/compare">
            <span className="text-sm font-normal cursor-pointer leading-6 ">
              Compare
            </span>
          </Link>
          <span className="text-sm font-normal cursor-default leading-6 text-neutral-50">
            Advisory
          </span>
          <span className="text-sm font-normal cursor-default leading-6 text-neutral-50">
            Learn
          </span>
        </div>
      </nav>

      {/* <!--- Mobile menu, show/hide based on menu open state. --> */}
      {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
    </header>
  );
};

export default Header;
