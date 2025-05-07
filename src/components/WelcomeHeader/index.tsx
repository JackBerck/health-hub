// components/WelcomeHeader.tsx
import React from "react";

interface WelcomeHeaderProps {
  userName: string;
  mood: string;
  moodIcon: string;
  moodDescription: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  mood,
  moodIcon,
  moodDescription,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-md mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        👋 Hello, <span className="text-purple-600">{userName}</span>!
      </h1>
      <p className="text-lg text-gray-700 mt-1">
        💭 Bagaimana perasaanmu hari ini?
      </p>
      <div className="mt-4 flex items-center space-x-3">
        <span className="text-3xl">{moodIcon}</span>
        <div>
          <p className="text-sm text-gray-600">Mood Hari Ini:</p>
          <p className="text-md font-medium text-gray-800">
            {mood} – {moodDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
