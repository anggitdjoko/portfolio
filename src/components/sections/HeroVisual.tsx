import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ArrowDownRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Link from 'next/link';
import { ProfileCard } from "@/components/ui/profile-card";
import { TreeBackground } from "@/components/ui/tree-background";

export function HeroVisual({ isExiting }: { isExiting?: boolean }) {
  const { personal } = portfolioData;
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20"
    >
      {/* Tree Background with Falling Leaves */}
      <TreeBackground />

      <main className="relative flex-1 flex flex-col justify-center pt-40 pb-20 z-10">
        <div className="flex relative gap-4 px-6 md:items-center w-full flex-col justify-center">

          {/* Line 1: AI & DATA */}
          <div className="md:flex gap-8 items-center relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs text-muted-foreground text-start md:text-right leading-relaxed max-w-[200px] md:max-w-[220px] font-medium uppercase tracking-[0.2em]"
            >
              Hi, I'm {personal.name}. {personal.bio}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,8vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
            >
              FULL-STACK
            </motion.h1>
          </div>

          {/* Line 2: SOFTWARE */}
          <div className="md:flex gap-8 items-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,8vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Line 3: ENGINEER */}
          <div className="md:flex gap-8 items-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,8vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
            >
              & DATA ANALYST
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[10px] md:text-xs text-muted-foreground pt-4 md:pt-8 leading-relaxed max-w-[250px] md:max-w-[200px] font-medium uppercase tracking-widest"
            >
              Open to all forms of collaboration, regardless of location and language.
            </motion.p>
          </div>
        </div>

        {/* Separator Section */}
        <div className="mx-auto max-w-[105rem] w-full px-8 md:px-20 mt-12 md:mt-24">
          <div className="flex items-center gap-6">
            <Separator className="flex-1 h-[1px] bg-foreground/10 hidden md:block" />
            <div className="text-[10px] md:text-xs whitespace-nowrap font-bold tracking-[0.3em] text-muted-foreground uppercase">
              PONTIANAK, ID — 2026
            </div>
            <Link
              href="/resume"
              className="group flex items-center"
            >
              <motion.div
                className="relative flex items-center bg-zinc-100 dark:bg-white h-12 w-12 group-hover:w-44 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden shadow-xl"
              >
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-black pl-6 pr-12">
                  View Resume
                </span>
                <div className="absolute right-0 flex items-center justify-center size-12 text-zinc-900 dark:text-black group-hover:rotate-45 transition-transform duration-500">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>



        {/* Award/Badge Vertical - MOVED TO LEFT */}
        <div
          className="absolute left-0 top-1/2 z-50 hidden md:flex items-center transform -translate-y-1/2 group/container"
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          {/* The Badge Trigger */}
          <div className="relative z-50">
            <motion.div
              whileHover={{ x: 10 }}
              className="bg-white text-black py-10 px-4 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl rounded-r-3xl border-r border-y border-zinc-200 cursor-pointer"
            >
              <span className="rotate-0 [writing-mode:vertical-rl]">
                AVAILABLE FOR OPPORTUNITY
              </span>
            </motion.div>
          </div>

          {/* Profile Card Sidebar/Drawer Effect - Connected to avoid gap */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="pl-4 pointer-events-auto"
                style={{ width: 'max-content' }}
              >
                <ProfileCard
                  name={personal.name}
                  title={personal.subtitle}
                  description={personal.bio}
                  imageUrl={personal.avatar}
                  githubUrl={personal.socialLinks.find(s => s.platform === 'GitHub')?.url}
                  linkedinUrl={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url}
                  instagramUrl={personal.socialLinks.find(s => s.platform === 'Instagram')?.url}
                  className="!max-w-4xl scale-[0.8] origin-left"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
