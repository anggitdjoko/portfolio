"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowDown, ChevronRight, Calendar, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300",
        scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-indigo-400">Anggit.</a>
        <div className="hidden md:flex items-center gap-1">
          {portfolioData.navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              {label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={18} /></a>
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href={`mailto:${portfolioData.personal.email}`} className="text-gray-400 hover:text-white transition-colors"><Mail size={18} /></a>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden bg-[#111118] border-b border-white/5">
          <div className="px-6 py-4 flex flex-col gap-2">
            {portfolioData.navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5">{label}</a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── Particle Background ──────────────────────────────────────────────────
function ParticleBackground() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
  </div>;
}

// ─── Hero Section ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      <ParticleBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for opportunities
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-white">
          Anggit <span className="text-indigo-400">Djoko Wibowo</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 font-medium mb-6">
          {portfolioData.personal.role}
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-2xl text-gray-400 mb-10 mx-auto leading-relaxed">
          {portfolioData.personal.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 justify-center mb-16">
          <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors">
            <ExternalLink size={16} /> Explore Projects
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors">
            <Mail size={16} /> Get in Touch
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl mx-auto">
          {[{ label: "Experience", value: portfolioData.stats.experience }, { label: "Projects", value: portfolioData.stats.projects }, { label: "Clients", value: portfolioData.stats.clients }, { label: "Commits", value: portfolioData.stats.commits }].map(({ label, value }) => (
            <div key={label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400">{value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-[#0a0a0f]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Know Me <span className="text-indigo-400">Better</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl" />
              <img src={portfolioData.personal.avatar} alt={portfolioData.personal.name} className="relative rounded-2xl object-cover w-full h-full border border-white/10" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <h3 className="text-2xl font-bold mb-6 text-white">I&apos;m {portfolioData.personal.name}, a <span className="text-indigo-400">{portfolioData.personal.role}</span></h3>
            <p className="text-gray-400 mb-4 leading-relaxed">{portfolioData.personal.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[{ icon: "💻", label: "Clean Code", desc: "Writing maintainable code" }, { icon: "🎨", label: "UI/UX Design", desc: "Creating intuitive experiences" }, { icon: "⚡", label: "Performance", desc: "Optimized applications" }, { icon: "📊", label: "Data-Driven", desc: "Analytics-powered solutions" }].map(({ icon, label, desc }) => (
                <div key={label} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                  <div className="text-2xl mb-2">{icon}</div>
                  <h4 className="font-semibold text-sm mb-1 text-white">{label}</h4>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────
function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const categories = [...new Set(portfolioData.skills.map(s => s.category))];

  return (
    <section id="skills" className="py-24 bg-[#111118]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">Skills & Tools</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">My <span className="text-indigo-400">Tech Stack</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div key={category} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: catIdx * 0.1 }} className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-lg font-bold mb-6 text-indigo-400">{category}</h3>
              <div className="space-y-4">
                {portfolioData.skills.filter(s => s.category === category).map(({ name, level }, i) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-white">{name}</span>
                      <span className="text-gray-400">{level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${level}%` } : {}} transition={{ duration: 1, delay: 0.5 + i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────
function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-[#0a0a0f]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured <span className="text-indigo-400">Projects</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="group p-6 rounded-2xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4">{p.category}</span>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{p.description}</p>
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <ChevronRight size={14} className="text-indigo-400" />
                <span className="text-xs font-medium text-indigo-400">{p.impact}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">{t}</span>
                ))}
              </div>
              <div className="absolute top-6 right-6">
                <span className={cn("w-2.5 h-2.5 rounded-full", p.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-gray-500")} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-[#111118]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">My <span className="text-indigo-400">Journey</span></h2>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          {portfolioData.experience.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.2 }} className="relative pl-16 pb-12 last:pb-0">
              <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#111118]" />
              <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 hover:border-indigo-500/30 transition-colors">
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
                  {exp.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In <span className="text-indigo-400">Touch</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Let&apos;s build something amazing together.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s talk</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            <div className="space-y-4">
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-white">{portfolioData.personal.email}</p>
                </div>
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#111118] border border-white/10 hover:border-indigo-500/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Github size={20} /></div>
                <div>
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="font-medium text-white">anggitdjoko</p>
                </div>
              </a>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="space-y-5" onSubmit={e => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Message</label>
              <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors">
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <a href="#home" className="text-2xl font-bold text-indigo-400 mb-4 block">Anggit.</a>
        <div className="flex justify-center gap-4 mb-4">
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Github size={18} /></a>
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Linkedin size={18} /></a>
          <a href={`mailto:${portfolioData.personal.email}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"><Mail size={18} /></a>
        </div>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
