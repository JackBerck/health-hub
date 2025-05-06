import type { NavigationLink } from "@/types/global";
import { pb } from "@/lib/pb";

const baseNavigation: NavigationLink[] = [
  {
    title: "Homepage",
    url: "/",
  },
  {
    title: "Self Assessment",
    url: "/self-assessment",
  },
  {
    title: "Mindfulness Games",
    url: "/mindfulness-games",
  },
  {
    title: "Community Hub",
    url: "/community-hub",
  },
];

// Pastikan selalu mengembalikan array
export function getNavigation(): NavigationLink[] {
  try {
    const isAuthenticated = pb.authStore.isValid;
    
    return [
      ...baseNavigation,
      ...(isAuthenticated
        ? [
            {
              title: "Dashboard",
              url: "/dashboard",
            },
          ]
        : [
            {
              title: "Login",
              url: "/login",
            },
            {
              title: "Register",
              url: "/register",
            },
          ]),
    ];
  } catch (error) {
    console.error("Error getting navigation:", error);
    // Fallback ke base navigation jika terjadi error
    return [...baseNavigation];
  }
}

// Tidak perlu export default lagi karena kita selalu memanggil getNavigation()