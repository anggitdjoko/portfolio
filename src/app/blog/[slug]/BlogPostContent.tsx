'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Copy, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BlogPostContent({ post }: { post: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0f] pb-24 pt-32">
            <div className="container max-w-7xl mx-auto px-6 mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 mb-6">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl">{post.excerpt}</p>
                </motion.div>
            </div>
            <div className="container max-w-4xl mx-auto px-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
                    <span>{post.author?.name}</span>
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} min read</span>
                    <button onClick={handleCopy} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium", copied ? "bg-indigo-500 text-white" : "bg-white/5 text-gray-400 hover:text-white")}>
                        {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Share</>}
                    </button>
                </div>
                <div className="prose prose-invert max-w-none">
                    <p>{post.content}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                    {post.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-sm">{tag}</span>
                    ))}
                </div>
            </div>
        </main>
    );
}
