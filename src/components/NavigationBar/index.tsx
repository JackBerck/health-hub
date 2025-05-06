"use client";

import { useState, useEffect } from "react";
import NavigationLink from "@/components/NavigationBar/NavigationLink";
import { getNavigation } from "@/data/navigation";
import Link from "next/link";
import { pb } from "@/lib/pb";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState<
    Array<{ title: string; url: string }>
  >([]); // Definisikan tipe dengan jelas

  console.log(navigationLinks);
  // Fungsi untuk memperbarui navigasi dengan penanganan error
  const updateNavigation = () => {
    try {
      const links = getNavigation();
      if (Array.isArray(links)) {
        setNavigationLinks(links);
      } else {
        console.error("getNavigation did not return an array:", links);
        setNavigationLinks([]); // Fallback ke array kosong
      }
    } catch (error) {
      console.error("Error updating navigation:", error);
      setNavigationLinks([]); // Fallback ke array kosong pada error
    }
  };

  useEffect(() => {
    // Update navigasi saat komponen dimount
    updateNavigation();

    // Update navigasi saat auth berubah
    pb.authStore.onChange(() => {
      updateNavigation();
    });

    return () => {
      // Cleanup handler
      pb.authStore.onChange(() => {});
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`section-padding-x fixed top-0 w-full z-[998] text-dark-base normal-font-size transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md shadow-md"
          : "lg:bg-transparent shadow-none"
      } py-4 bg-transparent backdrop-blur-md shadow-md`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link href="#">
          <img src="/health-hub.png" className="w-16" alt="HealthHub Logo" />
        </Link>
        <button
          type="button"
          className="xl:hidden text-dark-base relative z-[999] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <div
          className={`w-full xl:block xl:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 border border-gray-400 rounded-lg xl:flex-row rtl:space-x-reverse lg:mt-0 lg:border-none gap-2 lg:gap-4">
            {navigationLinks.map((route, index) => (
              <NavigationLink
                key={index}
                url={route.url}
                addClass={`${
                  route.title === "Register"
                    ? "text-light-base gradient-to-r from-blue-healthhub-base to-blue-healthhub-secondary bg-gradient-to-br"
                    : ""
                }`}
              >
                {route.title}
              </NavigationLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
