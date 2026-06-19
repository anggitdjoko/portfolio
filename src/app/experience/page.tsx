'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            My professional journey and growth.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-16 pb-12 last:pb-0"
            >
              <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0a0a0f]" />
              <div className="p-6 rounded-2xl bg-[#111118] border border-white/10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <div className="text-indigo-400 font-medium text-sm">{exp.company}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
