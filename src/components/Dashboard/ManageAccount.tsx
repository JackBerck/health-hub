"use client";

import { useState, useRef } from "react";
import { User, Camera, Key, X } from "lucide-react";
import { pb } from "@/lib/pb";

export default function ManageAccount() {
  const [user, setUser] = useState(pb.authStore.model);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk membuka file picker
  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  // Fungsi untuk menangani upload foto profil
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        throw new Error('File harus berupa gambar');
      }
      
      // Upload ke PocketBase
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Update user record
      const updatedUser = await pb.collection('users').update(user.id, formData);
      
      // Update local state
      setUser(updatedUser);
      
      // Refresh auth store
      pb.authStore.save(pb.authStore.token, updatedUser);
      
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Fungsi untuk menangani ganti password
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validasi input
    if (!passwordData.oldPassword) {
      setErrors(prev => ({ ...prev, oldPassword: "Password lama diperlukan" }));
      return;
    }
    
    if (!passwordData.password) {
      setErrors(prev => ({ ...prev, password: "Password baru diperlukan" }));
      return;
    }
    
    if (passwordData.password !== passwordData.passwordConfirm) {
      setErrors(prev => ({ ...prev, passwordConfirm: "Password tidak cocok" }));
      return;
    }
    
    try {
      // Verifikasi password lama
      await pb.collection('users').authWithPassword(
        user.email,
        passwordData.oldPassword
      );
      
      // Update password
      await pb.collection('users').update(user.id, {
        password: passwordData.password,
        passwordConfirm: passwordData.passwordConfirm
      });
      
      // Reset form dan tutup modal
      setPasswordData({
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      });
      
      setShowPasswordModal(false);
      
      // Feedback sukses bisa ditambahkan di sini
    } catch (error) {
      console.error('Error changing password:', error);
      setErrors({ oldPassword: "Password lama tidak valid" });
    }
  };

  // Jika user belum login, tampilkan pesan
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
            <User size={16} className="text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Akun Saya</h2>
        </div>
        <p className="text-sm text-gray-500">Silakan login untuk melihat detail akun Anda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
          <User size={16} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Akun Saya</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-4">
        <div className="relative mr-4 mb-4 sm:mb-0">
          <div 
            className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleProfilePicClick}
          >
            {user.avatar ? (
              <img 
                src={pb.files.getURL(pb.authStore.record, user.avatar)} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
            
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md">
              <Camera size={12} />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            className="hidden"
            onChange={handleFileChange} 
          />
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Nama:</span>
              <span className="ml-2 font-medium text-gray-800">{user.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <span className="ml-2 font-medium text-gray-800">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-500">Jenis Kelamin:</span>
              <span className="ml-2 font-medium text-gray-800">
                {user.gender === 'L' ? 'Laki-laki' : user.gender === 'P' ? 'Perempuan' : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowPasswordModal(true)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-purple-500 text-purple-600 font-medium rounded-lg transition-all duration-200 hover:bg-purple-50"
      >
        <Key size={16} />
        <span>Ubah Password</span>
      </button>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ubah Password</h3>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Password Lama <span className="text-rose-500">*</span>
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {errors.oldPassword && (
                  <p className="mt-1 text-sm text-rose-500">{errors.oldPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password Baru <span className="text-rose-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={passwordData.password}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-rose-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                  Konfirmasi Password Baru <span className="text-rose-500">*</span>
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  value={passwordData.passwordConfirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, passwordConfirm: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-sm text-rose-500">{errors.passwordConfirm}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}