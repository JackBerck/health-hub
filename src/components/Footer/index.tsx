"use client";

import mindfulnessChannel from "@/data/mindfulness-channel";
import { getNavigation } from "@/data/navigation";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pb";

function GroupFooterLink({
  title,
  links,
}: {
  title: string;
  links: { title: string; url: string }[];
}) {
  return (
    <div className="max-w-sm lg:max-w-sm">
      <h5 className="font-semibold mb-2">{title}</h5>
      <ul className="flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="footer-link">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [navigationLinks, setNavigationLinks] = useState<Array<any>>([]); // Definisikan tipe dengan jelas

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

  return (
    <footer
      id="footer"
      className="bg-light-base text-dark-base dark:bg-dark-base dark:text-light-base section-padding-x py-4"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap md:grid md:grid-cols-4 lg:flex lg:flex-wrap gap-8 lg:gap-16 justify-between mb-4 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-sm lg:max-w-sm md:max-w-none md:col-span-4">
            <a href="#" className="mb-4 block">
              <img
                src="/health-hub.png"
                className="w-32"
                alt="HealthHub Logo"
              />
            </a>
            <small className="mb-4 block text-gray-700 dark:text-gray-400">
              Komunitas programmer Indonesia yang bertujuan membantu semua orang
              belajar programming dengan cara yang menyenangkan.
            </small>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/groups/programmerhandal"
                target="_blank"
              >
                <svg
                  className="footer-social-media-link"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </a>
              <a href="https://discord.gg/W4XyRAmPSD" target="_blank">
                <svg
                  className="footer-social-media-link"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                </svg>
              </a>
              <a href="https://x.com">
                <svg
                  className="footer-social-media-link"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/healthhub.dev/"
                target="_blank"
              >
                <svg
                  className="footer-social-media-link"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a href="https://github.com/IMPHNEN" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="footer-social-media-link"
                  fill="currentColor"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </a>
              <a href="https://youtube.com">
                <svg
                  className="footer-social-media-link"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                </svg>
              </a>
            </div>
          </div>
          <GroupFooterLink title="Tautan Cepat" links={navigationLinks} />
          <GroupFooterLink title="Mindfulness" links={mindfulnessChannel} />
          <div className="max-w-sm lg:max-w-sm md:max-w-none md:col-span-2">
            <h5 className="font-semibold mb-2">Calm</h5>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a
                  href="/meditation-tools"
                  className="py-1 px-2 bg-blue-tertiary text-blue-base rounded-md text-sm"
                >
                  Meditation Tools
                </a>
              </li>
              <li>
                <a
                  href="/mental-health-assessment"
                  className="py-1 px-2 bg-green-tertiary text-green-base rounded-md text-sm"
                >
                  Self Assessment
                </a>
              </li>
              <li>
                <a
                  href="/community-support"
                  className="py-1 px-2 bg-purple-tertiary text-purple-base rounded-md text-sm"
                >
                  Community Support
                </a>
              </li>
              <li>
                <a
                  href="/therapeutic-games"
                  className="py-1 px-2 bg-yellow-tertiary text-yellow-base rounded-md text-sm"
                >
                  Mini-Games
                </a>
              </li>
              <li>
                <a
                  href="/mental-health-resources"
                  className="py-1 px-2 bg-red-tertiary text-red-base rounded-md text-sm"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="/progress-tracking"
                  className="py-1 px-2 bg-cyan-tertiary text-cyan-base rounded-md text-sm"
                >
                  Progress Tracking
                </a>
              </li>
              <li>
                <a
                  href="/professional-help"
                  className="py-1 px-2 bg-orange-tertiary text-orange-base rounded-md text-sm"
                >
                  Professional Help
                </a>
              </li>
              <li>
                <a
                  href="/wellness-activities"
                  className="py-1 px-2 bg-pink-tertiary text-pink-base rounded-md text-sm"
                >
                  Wellness Activities
                </a>
              </li>
              <li>
                <a
                  href="/mood-journal"
                  className="py-1 px-2 bg-teal-tertiary text-teal-base rounded-md text-sm"
                >
                  Mood Journal
                </a>
              </li>
              <li>
                <a
                  href="/crisis-support"
                  className="py-1 px-2 bg-violet-tertiary text-violet-base rounded-md text-sm"
                >
                  Crisis Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-center text-gray-700 dark:text-gray-400">
          © 2025 HealthHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
