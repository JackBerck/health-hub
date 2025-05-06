"use client";

import { useState, useEffect } from "react";
import NavigationLink from "@/components/NavigationBar/NavigationLink";
import navigation from "@/data/navigation";
import Link from "next/link";
import { pb } from "@/lib/pb";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);

  useEffect(() => {
    const authChangeHandler = () => {
      setIsAuthenticated(pb.authStore.isValid);
    };

    pb.authStore.onChange(authChangeHandler);

    if (!isAuthenticated) {
      navigation.push({
        title: "Register",
        url: "/register",
      });

      navigation.push({
        title: "Login",
        url: "/login",
      });

      const dashboardIndex = navigation.findIndex(item => item.title === "Dashboard");
      if (dashboardIndex !== -1) {
        navigation.splice(dashboardIndex, 1);
      }
    } else {
      navigation.push({
        title: "Dashboard",
        url: "/dashboard",
      });

      const loginIndex = navigation.findIndex((item) => item.title === "Login");
      if (loginIndex !== -1) {
        navigation.splice(loginIndex, 1);
      }

      const registerIndex = navigation.findIndex(
        (item) => item.title === "Register"
      );
      if (registerIndex !== -1) {
        navigation.splice(registerIndex, 1);
      }
    }

    return () => {
      pb.authStore.onChange(authChangeHandler);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
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
          className="lg:hidden text-dark-base relative z-[999] focus:outline-none"
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
          className={`w-full lg:block lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-400 rounded-lg lg:flex-row rtl:space-x-reverse lg:mt-0 lg:border-none gap-2 lg:gap-4">
            {navigation.map((route, index) => (
              <NavigationLink
                key={index}
                url={route.url}
                addClass={`${
                  route.title === "Register"
                    ? "text-light-base gradient-to-r from-blue-imphnen-base to-blue-imphnen-secondary bg-gradient-to-br"
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
