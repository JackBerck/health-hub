"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  MessageCircle,
  BarChart2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      text: "Anda belum melakukan mood check hari ini",
      time: "Baru saja",
      isNew: true,
    },
    {
      id: 2,
      text: "Anda mendapatkan badge baru: Konsisten 3 Hari",
      time: "2 jam yang lalu",
      isNew: true,
    },
    {
      id: 3,
      text: "Balasan baru di forum 'Mengatasi Kecemasan'",
      time: "Kemarin",
      isNew: false,
    },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">
                HealthHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-teal-600 bg-teal-50"
            >
              Beranda
            </Link>
            <Link
              href="/assessment"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Assessment
            </Link>
            <Link
              href="/games"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Games
            </Link>
            <Link
              href="/community"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Komunitas
            </Link>
            <Link
              href="/progress"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Progress
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-1 rounded-full text-gray-500 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
              >
                <span className="sr-only">Notifikasi</span>
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-rose-500"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifikasi
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start">
                          {notification.isNew && (
                            <span className="h-2 w-2 mt-1.5 mr-2 bg-teal-500 rounded-full"></span>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">
                              {notification.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-2 px-4 border-t border-gray-100 text-center">
                    <Link
                      href="/notifications"
                      className="text-xs text-teal-600 hover:text-teal-500"
                    >
                      Lihat semua notifikasi
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
              >
                <span className="sr-only">Buka menu profil</span>
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                  <User size={16} />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} className="mr-3 text-gray-500" />
                      Profil Saya
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MessageCircle size={16} className="mr-3 text-gray-500" />
                      Pesan
                    </Link>
                    <Link
                      href="/statistics"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <BarChart2 size={16} className="mr-3 text-gray-500" />
                      Statistik
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} className="mr-3 text-gray-500" />
                      Pengaturan
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={16} className="mr-3 text-gray-500" />
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 bg-teal-50"
            >
              Beranda
            </Link>
            <Link
              href="/assessment"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Assessment
            </Link>
            <Link
              href="/games"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Games
            </Link>
            <Link
              href="/community"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Komunitas
            </Link>
            <Link
              href="/progress"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              Progress
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
