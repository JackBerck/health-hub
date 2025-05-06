"use client";

import { pb } from "@/lib/pb";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Users, ArrowRight } from "lucide-react";
import { useEffect } from "react";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [data, setData] = React.useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  });
  const [errors, setErrors] = React.useState<Partial<RegisterForm>>({});
  const [processing, setProcessing] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); // State untuk loading

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Beri sedikit waktu untuk PocketBase memuat auth dari cookie
        if (pb.authStore.isValid) {
          router.replace("/");
          return; // Keluar dari fungsi untuk mencegah setIsLoading
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Jika loading, tampilkan indikator loading
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    if (!data.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Nama lengkap tidak boleh kosong",
      }));
      setProcessing(false);
      return;
    }
    if (!data.email) {
      setErrors((prev) => ({ ...prev, email: "Email tidak boleh kosong" }));
      setProcessing(false);
      return;
    }
    if (!data.password) {
      setErrors((prev) => ({
        ...prev,
        password: "Password tidak boleh kosong",
      }));
      setProcessing(false);
      return;
    }
    if (data.password !== data.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "Password tidak cocok",
      }));
      setProcessing(false);
      return;
    }

    try {
      const record = await pb.collection("users").create(data);

      console.log("User created:", record);

      router.push("/login");
      setData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
      <div className="max-w-md md:max-w-full mx-auto w-full">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-healthhub-base to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h1 className="font-bold bg-gradient-to-r from-blue-healthhub-base to-teal-500 bg-clip-text text-transparent">
              HealthHub
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h2>
          <p className="text-gray-600">
            Mulai perjalanan kesehatan Anda bersama kami
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nama lengkap"
                value={data.name}
                tabIndex={1}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                autoFocus
                disabled={processing}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-500"></span>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={data.email}
                tabIndex={2}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                disabled={processing}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-500"></span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={data.password}
                tabIndex={3}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                disabled={processing}
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-500"></span>
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700"
            >
              Konfirmasi Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Konfirmasi password"
                value={data.passwordConfirm}
                tabIndex={4}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    passwordConfirm: e.target.value,
                  }))
                }
                required
                disabled={processing}
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-500"></span>
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Jenis Kelamin <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div
                className={`flex items-center p-3 border ${
                  data.gender === "L"
                    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500"
                    : "border-gray-200 hover:bg-gray-50"
                } rounded-xl cursor-pointer transition-all duration-200`}
                onClick={() =>
                  !processing && setData((prev) => ({ ...prev, gender: "L" }))
                }
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded-full mr-3 border ${
                    data.gender === "L" ? "border-teal-500" : "border-gray-300"
                  }`}
                >
                  {data.gender === "L" && (
                    <div className="w-full h-full rounded-full bg-teal-500 transform scale-[0.65]"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <span
                    className={`font-medium ${
                      data.gender === "L" ? "text-teal-700" : "text-gray-700"
                    }`}
                  >
                    Laki-laki
                  </span>
                </div>
              </div>

              <div
                className={`flex items-center p-3 border ${
                  data.gender === "P"
                    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500"
                    : "border-gray-200 hover:bg-gray-50"
                } rounded-xl cursor-pointer transition-all duration-200`}
                onClick={() =>
                  !processing && setData((prev) => ({ ...prev, gender: "P" }))
                }
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded-full mr-3 border ${
                    data.gender === "P" ? "border-teal-500" : "border-gray-300"
                  }`}
                >
                  {data.gender === "P" && (
                    <div className="w-full h-full rounded-full bg-teal-500 transform scale-[0.65]"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <span
                    className={`font-medium ${
                      data.gender === "P" ? "text-teal-700" : "text-gray-700"
                    }`}
                  >
                    Perempuan
                  </span>
                </div>
              </div>
            </div>
            <input type="hidden" name="gender" value={data.gender} required />
            {errors.gender && (
              <p className="mt-1 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-500"></span>
                {errors.gender}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={processing}
              tabIndex={6}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:transform-none disabled:hover:shadow-none"
            >
              {processing ? (
                <>
                  <span className="animate-pulse">Memproses...</span>
                </>
              ) : (
                <>
                  <span>Daftar</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-500">atau</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <p className="text-gray-600 mb-2">Sudah punya akun?</p>
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-teal-500 text-teal-600 font-medium rounded-xl transition-all duration-200 hover:bg-teal-50 hover:shadow-md"
          >
            Masuk Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
