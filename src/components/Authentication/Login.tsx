"use client";

import { pb } from "@/lib/pb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";

type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [data, setData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormType>>({});
  const [processing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // State untuk loading

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

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

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

    try {
      const record = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);

      if (record) {
        router.push("/");
        window.location.reload(); // Paksa refresh untuk memperbarui navigasi
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, email: "Email atau password salah" }));
      }
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
          <h2 className="text-3xl font-bold text-gray-800">
            Selamat Datang Kembali!
          </h2>
          <p className="text-gray-600">
            Silahkan masuk untuk melanjutkan perjalanan kesehatan Anda
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
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
                tabIndex={1}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <Link
                href="/lupa-password"
                className="text-sm text-teal-600 hover:text-teal-500 transition-colors"
              >
                Lupa password?
              </Link>
            </div>
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
                tabIndex={2}
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

          <div>
            <button
              type="submit"
              disabled={processing}
              tabIndex={3}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:transform-none disabled:hover:shadow-none"
            >
              {processing ? (
                <>
                  <span className="animate-pulse">Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
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

          <p className="text-gray-600 mb-2">Belum punya akun?</p>
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-teal-500 text-teal-600 font-medium rounded-xl transition-all duration-200 hover:bg-teal-50 hover:shadow-md"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
