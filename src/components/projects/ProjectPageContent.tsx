'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';

export default function ProjectPageContent({ project }: { project: any }) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 mb-8">
            ← Back to Projects
          </Link>

          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4">
            {project.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-gray-400 mb-8">{project.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {project.stats?.map((stat: any) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-[#111118] border border-white/10">
                <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech?.map((t: string) => (
              <span key={t} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium">
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
          <ul className="space-y-2 mb-8">
            {project.features?.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <ChevronRight size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
