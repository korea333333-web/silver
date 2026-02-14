"use client";

import { motion } from "framer-motion";
import { Bell, Mic, Play, Users, Heart, Home as HomeIcon, Calendar, MessageSquare, User } from "lucide-react";
import { useStore } from "@/lib/store";
import ProfileModal from "@/components/ProfileModal";
import VoiceGymnasticsModal from "@/components/VoiceGymnasticsModal";

export default function Home() {
  const { openVoiceModal, openProfileModal, profile } = useStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pb-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-4">
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={openProfileModal}
            className="relative cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border-2 border-green-500 p-0.5 overflow-hidden">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded-full">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </motion.div>
          <div>
            <p className="text-xs text-blue-400 font-bold tracking-wider">NEXTAGE PLATINUM</p>
            <h1 className="text-xl font-bold">{profile.name}</h1>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active:bg-gray-700 relative"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-800"></span>
        </motion.button>
      </header>

      <main className="px-6 flex flex-col gap-6 relative z-10">
        {/* Daily Routine Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 border border-gray-700 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-lg mb-4 inline-block border border-blue-500/30">
              DAILY ROUTINE
            </span>
            <h2 className="text-2xl font-bold mb-1 leading-tight">오늘의<br />목소리 체조</h2>
            <p className="text-gray-400 text-sm mb-6">Clear speech, confident day.</p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openVoiceModal}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-900/50 transition-colors"
            >
              Start Now
            </motion.button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-gray-900/50 rounded-full flex items-center justify-center border border-gray-700 shadow-inner">
            <Mic className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        {/* Premium Course Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 border border-gray-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              PREMIUM COURSE
            </div>
            <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300">
              <Play className="w-4 h-4 fill-current" />
            </motion.button>
          </div>
          <h3 className="text-lg font-bold mb-1">AI Master Class</h3>
          <p className="text-gray-500 text-xs mb-6">Chapter 4: The Future of Intelligence</p>

          <div className="flex justify-between items-end text-xs text-blue-400 font-bold mb-2">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/60 rounded-3xl p-5 border border-gray-700 relative overflow-hidden group"
          >
            <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mb-10 text-gray-300 group-hover:bg-gray-600 transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
            <h3 className="font-bold text-sm">Lounge</h3>
            <p className="text-xs text-gray-500">12 Members Active</p>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/60 rounded-3xl p-5 border border-gray-700 relative overflow-hidden group"
          >
            <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mb-10 text-gray-300 group-hover:bg-gray-600 transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Health</h3>
            <p className="text-xs text-gray-500">Daily Goal: 80%</p>

            {/* Micro-chart visualization */}
            <svg className="absolute bottom-5 right-5 w-16 h-8 text-red-500/30" stroke="currentColor" fill="none">
              <polyline points="0,30 20,20 40,25 60,5" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 bg-gray-800/90 backdrop-blur-lg rounded-2xl h-16 flex items-center justify-around border border-gray-700 shadow-2xl z-40">
        <motion.button whileTap={{ scale: 0.9 }} className="p-3 text-blue-500 relative">
          <HomeIcon className="w-6 h-6" />
          <motion.div layoutId="nav-glow" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full blur-[2px]" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="p-3 text-gray-500 hover:text-gray-300 transition-colors">
          <Calendar className="w-6 h-6" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="p-3 text-gray-500 hover:text-gray-300 transition-colors relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={openProfileModal}
          className="p-3 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <User className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Modals */}
      <ProfileModal />
      <VoiceGymnasticsModal />
    </div>
  );
}
