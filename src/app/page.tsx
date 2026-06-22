'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowDown, ChevronRight, Calendar, Send, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const data = {
    name: 'Anggit Djoko Wibowo',
    role: 'Full-Stack Developer',
    subtitle: 'Building Digital Experiences That Matter',
    description: 'Full-Stack Developer specializing in Next.js, React, and TypeScript. Currently building Servgo, a SaaS POS platform for cafés and restaurants. Background in data analytics.',
    email: 'anggitdjoko@gmail.com',
    github: 'https://github.com/anggitdjoko',
    linkedin: 'https://linkedin.com/in/anggitdjoko',
    avatar: '/about/anggit.jpg',
    stats: { experience: '3+', projects: '15+', clients: '10+', commits: '500+' },
    skills: [
        { name: 'Next.js', level: 90, category: 'Frontend' },
        { name: 'React', level: 90, category: 'Frontend' },
        { name: 'TypeScript', level: 85, category: 'Language' },
        { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
        { name: 'Laravel', level: 80, category: 'Backend' },
        { name: 'Node.js', level: 80, category: 'Backend' },
        { name: 'PostgreSQL', level: 75, category: 'Database' },
        { name: 'Python', level: 75, category: 'Language' },
    ],
    projects: [
        { title: 'Servgo — SaaS POS Platform', category: 'SaaS', desc: 'POS platform for cafés and restaurants with real-time order management.', tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'] },
        { title: 'Jarvis — AI Dashboard', category: 'AI/ML', desc: 'Intelligent dashboard for task automation and data analysis.', tech: ['React', 'Python', 'FastAPI', 'OpenAI'] },
        { title: 'Kobelco — Monitoring', category: 'Enterprise', desc: 'Real-time monitoring dashboard for industrial equipment.', tech: ['Next.js', 'MQTT', 'InfluxDB'] },
        { title: 'ShopEase — E-Commerce', category: 'E-Commerce', desc: 'Full-featured e-commerce platform with payment processing.', tech: ['Next.js', 'Laravel', 'MySQL', 'Stripe'] },
    ],
    experience: [
        { role: 'Full-Stack Developer', company: 'Freelance', period: '2023 — Present', desc: ['Building web apps with Next.js, React, and TypeScript', 'Developing Servgo SaaS POS platform', 'Implementing REST APIs with Node.js and Laravel'] },
        { role: 'Data Analyst', company: 'Previous Company', period: '2021 — 2023', desc: ['Analyzed large datasets for business insights', 'Created automated reporting dashboards', 'Collaborated with cross-functional teams'] },
    ],
};

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="bg-[#0a0a0f] text-white min-h-screen">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <a href="#home" className="text-xl font-bold text-indigo-400">Anggit.</a>
                    <div className="hidden md:flex items-center gap-1">
                        {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">{item}</a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <a href={data.github} target="_blank" className="text-gray-400 hover:text-white"><Github size={18} /></a>
                        <a href={data.linkedin} target="_blank" className="text-gray-400 hover:text-white"><Linkedin size={18} /></a>
                        <a href={`mailto:${data.email}`} className="text-gray-400 hover:text-white"><Mail size={18} /></a>
                    </div>
                    <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available for opportunities
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-4">
                        Anggit <span className="text-indigo-400">Djoko Wibowo</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-6">{data.role}</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 max-w-xl mx-auto mb-10">{data.description}</motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4 justify-center mb-16">
                        <a href="#projects" className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors">Explore Projects</a>
                        <a href="#contact" className="px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors">Get in Touch</a>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(data.stats).map(([key, val]) => (
                            <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-2xl font-bold text-indigo-400">{val}</div>
                                <div className="text-xs text-gray-400 uppercase mt-1">{key}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">About Me</span>
                        <h2 className="text-4xl font-bold mt-4">Know Me <span className="text-indigo-400">Better</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl" />
                            <img src={data.avatar} alt={data.name} className="relative rounded-2xl object-cover w-full aspect-square border border-white/10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6">I&apos;m {data.name}, a <span className="text-indigo-400">{data.role}</span></h3>
                            <p className="text-gray-400 mb-4">{data.description}</p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[{ icon: '💻', label: 'Clean Code' }, { icon: '🎨', label: 'UI/UX Design' }, { icon: '⚡', label: 'Performance' }, { icon: '📊', label: 'Data-Driven' }].map(item => (
                                    <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl mb-2">{item.icon}</div>
                                        <h4 className="font-semibold text-sm">{item.label}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-24 bg-[#111118]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">Skills & Tools</span>
                        <h2 className="text-4xl font-bold mt-4">My <span className="text-indigo-400">Tech Stack</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.skills.map(skill => (
                            <div key={skill.name} className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 hover:border-indigo-500/30 transition-colors">
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${skill.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">Portfolio</span>
                        <h2 className="text-4xl font-bold mt-4">Featured <span className="text-indigo-400">Projects</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.projects.map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group p-6 rounded-2xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">{p.category}</span>
                                <h3 className="text-xl font-bold mt-4 mb-3 group-hover:text-indigo-400 transition-colors">{p.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tech.map(t => <span key={t} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">{t}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="py-24 bg-[#111118]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">Experience</span>
                        <h2 className="text-4xl font-bold mt-4">My <span className="text-indigo-400">Journey</span></h2>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative pl-16 pb-12 last:pb-0">
                                <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#111118]" />
                                <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold">{exp.role}</h3>
                                            <div className="text-indigo-400 text-sm">{exp.company}</div>
                                        </div>
                                        <span className="text-sm text-gray-400">{exp.period}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.desc.map((d, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">Contact</span>
                        <h2 className="text-4xl font-bold mt-4">Get In <span className="text-indigo-400">Touch</span></h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Let&apos;s talk</h3>
                            <p className="text-gray-400 mb-8">I&apos;m always open to discussing new projects or opportunities.</p>
                            <a href={`mailto:${data.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400"><Mail size={20} /></div>
                                <div><p className="text-sm text-gray-400">Email</p><p className="font-medium">{data.email}</p></div>
                            </a>
                        </div>
                        <form onSubmit={e => { e.preventDefault(); alert('Message sent!'); }} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-indigo-500" />
                                <input type="email" placeholder="Your email" className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-indigo-500" />
                            </div>
                            <textarea rows={5} placeholder="Your message..." className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-indigo-500 resize-none" />
                            <button type="submit" className="w-full px-6 py-3.5 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <a href="#home" className="text-2xl font-bold text-indigo-400 block mb-4">Anggit.</a>
                    <div className="flex justify-center gap-4 mb-4">
                        <a href={data.github} target="_blank" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Github size={18} /></a>
                        <a href={data.linkedin} target="_blank" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Linkedin size={18} /></a>
                        <a href={`mailto:${data.email}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Mail size={18} /></a>
                    </div>
                    <p className="text-sm text-gray-400">© 2026 {data.name}. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
