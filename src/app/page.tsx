import type { Metadata } from "next";
// import DashboardHeader from "@/components/Homepage/Header";
import MoodTracker from "@/components/Dashboard/MoodTracker";
import RecommendedGames from "@/components/Dashboard/RecommendedGames";
import CommunityHighlights from "@/components/Dashboard/CommunityHighlights";
import ProgressInsights from "@/components/Dashboard/ProgressInsights";
import AIChatCompanion from "@/components/Dashboard/AIChatCompanion";
import DailyTip from "@/components/Dashboard/DailyTip";
import UpcomingActivities from "@/components/Dashboard/UpcomingActivities";
import ManageAccount from "@/components/Dashboard/ManageAccount";

export const metadata: Metadata = {
  title: "Beranda | HealthHub Connect",
  description:
    "Platform Integratif untuk Kesehatan Mental Melalui Gamifikasi dan Dukungan Komunitas",
};

export default function Home() {
  return (
    <main className="min-h-screen text-dark-base pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50 section-padding-x">
      {/* <DashboardHeader /> */}

      <div className="container max-w-screen-xl">
        <h1 className="font-bold mb-2 lg:mb-4">
          Selamat Datang di{" "}
          <span className="bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">
            HealthHub Connect
          </span>
        </h1>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - 1/3 width on large screens */}
          <div className="lg:col-span-1 space-y-6">
            <MoodTracker />
            <AIChatCompanion />
            <DailyTip />
            <ManageAccount />
          </div>

          {/* Middle and Right Columns - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressInsights />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecommendedGames />
              <UpcomingActivities />
            </div>
            <CommunityHighlights />
          </div>
        </div>
      </div>
    </main>
  );
}
