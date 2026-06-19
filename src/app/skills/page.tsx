'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/data/portfolio';

export default function SkillsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const categories = [...new Set(portfolioData.skills.map((s) => s.category))];

  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-indigo-400">Tools</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Technologies I work with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/10"
            >
              <h3 className="text-lg font-bold mb-6 text-indigo-400">{category}</h3>
              <div className="space-y-4">
                {portfolioData.skills
                  .filter((s) => s.category === category)
                  .map(({ name, level }, i) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-white">{name}</span>
                        <span className="text-gray-400">{level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
