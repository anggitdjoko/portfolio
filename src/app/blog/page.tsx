'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Thoughts and technical explorations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioData.blogs?.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-all"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4">
                {post.category}
              </span>
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
