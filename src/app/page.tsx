'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GhibliLayout } from '@/components/ghibli';
import { portfolioData } from '@/data/portfolio';

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
};

const HeroSection = () => {
    const { personal } = portfolioData;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center px-6">
            <motion.div style={{ y, opacity }} className="text-center max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                        style={{ background: 'rgba(124, 169, 130, 0.15)', color: '#4A7C59', border: '1px solid rgba(124, 169, 130, 0.2)' }}>
                        Welcome to my magical world
                    </span>
                </motion.div>

                <motion.h1
                    className="ghibli-heading text-5xl md:text-7xl lg:text-8xl mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    {personal.name}
                </motion.h1>

                <motion.p
                    className="ghibli-subheading text-xl md:text-2xl mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    {personal.subtitle}
                </motion.p>

                <motion.p
                    className="text-ghibli-bark/70 text-lg max-w-xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {personal.bio}
                </motion.p>

                <motion.div
                    className="flex gap-4 justify-center flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a href="#projects" className="ghibli-btn">View My Work</a>
                    <a href="#contact" className="ghibli-btn-outline">Say Hello</a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <rect x="1" y="1" width="22" height="34" rx="11" stroke="#8B6F47" strokeWidth="2" />
                    <motion.circle
                        cx="12" cy="10" r="3" fill="#8B6F47"
                        animate={{ cy: [10, 22, 10] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>
            </motion.div>
        </section>
    );
};

const AboutSection = () => {
    const { personal } = portfolioData;
    return (
        <section id="about" className="ghibli-section">
            <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="ghibli-heading mb-2">About Me</h2>
                <div className="ghibli-divider mx-auto max-w-xs" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div {...fadeInUp} className="ghibli-card p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-ghibli-leaf/20">
                        <div className="w-full h-full bg-gradient-to-br from-ghibli-leaf/30 to-ghibli-sunset/30 flex items-center justify-center">
                            <span className="text-5xl">👨‍💻</span>
                        </div>
                    </div>
                    <h3 className="font-[family-name:var(--font-caveat)] text-2xl text-center text-ghibli-bark mb-2">{personal.name}</h3>
                    <p className="text-center text-ghibli-leaf font-medium">{personal.title}</p>
                    <p className="text-center text-ghibli-bark/60 text-sm mt-1">{personal.location}</p>
                </motion.div>

                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                    <div className="ghibli-card p-8">
                        <p className="text-ghibli-bark/80 leading-relaxed mb-6">{personal.bio}</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🎓</span>
                                <div>
                                    <p className="text-sm text-ghibli-bark/60">Education</p>
                                    <p className="text-ghibli-bark font-medium">{personal.education}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🌐</span>
                                <div>
                                    <p className="text-sm text-ghibli-bark/60">Languages</p>
                                    <p className="text-ghibli-bark font-medium">{personal.languages.map(l => `${l.name} (${l.level})`).join(' · ')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6 justify-center">
                            {personal.socialLinks.map(link => (
                                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    style={{ background: 'rgba(124, 169, 130, 0.15)', color: '#4A7C59' }}>
                                    {link.icon === 'github' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>}
                                    {link.icon === 'linkedin' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                                    {link.icon === 'email' && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>}
                                    {link.icon === 'whatsapp' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SkillsSection = () => {
    const skills = [
        { name: 'React / Next.js', level: 90, icon: '⚛️' },
        { name: 'TypeScript', level: 85, icon: '📘' },
        { name: 'Python', level: 88, icon: '🐍' },
        { name: 'Node.js', level: 82, icon: '🟢' },
        { name: 'AI / ML', level: 80, icon: '🤖' },
        { name: 'Database', level: 85, icon: '🗄️' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'Blockchain', level: 70, icon: '⛓️' },
    ];

    return (
        <section id="skills" className="ghibli-section">
            <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="ghibli-heading mb-2">Skills & Magic</h2>
                <div className="ghibli-divider mx-auto max-w-xs" />
                <p className="ghibli-subheading mt-4">The tools I wield in my adventures</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill.name}
                        {...stagger}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="ghibli-card p-5 text-center group cursor-default"
                    >
                        <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{skill.icon}</span>
                        <h3 className="font-[family-name:var(--font-caveat)] text-lg text-ghibli-bark mb-2">{skill.name}</h3>
                        <div className="w-full h-2 rounded-full bg-ghibli-bark/10 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #4A7C59, #7CA982)' }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                        <span className="text-xs text-ghibli-bark/50 mt-2 block">{skill.level}%</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ExperienceSection = () => {
    const experiences = [
        { title: 'Full-Stack Developer', company: 'Servgo', period: '2024 - Present', desc: 'Building SaaS POS platform with Next.js and Node.js', icon: '💼' },
        { title: 'AI Engineer', company: 'CPS Research Group', period: '2025', desc: 'IoT & Computer Vision research with YOLO and MQTT', icon: '🔬' },
        { title: 'System Analyst', company: 'Voices Unheard', period: '2025', desc: 'Secure anonymous platform for conflict-affected stories', icon: '🛡️' },
        { title: 'Backend Developer', company: 'POLABDC', period: '2025', desc: 'AI-powered dental clinic management SaaS', icon: '🏥' },
    ];

    return (
        <section id="experience" className="ghibli-section">
            <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="ghibli-heading mb-2">My Journey</h2>
                <div className="ghibli-divider mx-auto max-w-xs" />
            </motion.div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ghibli-bark/15" />

                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.title}
                        {...stagger}
                        transition={{ delay: i * 0.15, duration: 0.7 }}
                        className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                        <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <div className="ghibli-card p-6 ml-12 md:ml-0">
                                <span className="text-2xl mb-2 block">{exp.icon}</span>
                                <h3 className="font-[family-name:var(--font-caveat)] text-xl text-ghibli-bark">{exp.title}</h3>
                                <p className="text-ghibli-leaf font-medium text-sm">{exp.company} · {exp.period}</p>
                                <p className="text-ghibli-bark/70 text-sm mt-2">{exp.desc}</p>
                            </div>
                        </div>

                        {/* Timeline dot */}
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-ghibli-leaf border-2 border-ghibli-cream -translate-x-1/2 mt-6" />

                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ProjectsSection = () => {
    const { projects } = portfolioData;
    const [showAll, setShowAll] = useState(false);
    const displayProjects = showAll ? projects : projects.slice(0, 6);

    return (
        <section id="projects" className="ghibli-section">
            <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="ghibli-heading mb-2">My Creations</h2>
                <div className="ghibli-divider mx-auto max-w-xs" />
                <p className="ghibli-subheading mt-4">Projects I have built along the way</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        {...stagger}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        className="ghibli-card p-6 flex flex-col"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="ghibli-tag text-xs">{project.category}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {project.status}
                            </span>
                        </div>

                        <h3 className="font-[family-name:var(--font-caveat)] text-xl text-ghibli-bark mb-2">{project.title}</h3>
                        <p className="text-ghibli-bark/70 text-sm flex-1 mb-4 line-clamp-3">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.techStack.slice(0, 4).map(tech => (
                                <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-ghibli-bark/5 text-ghibli-bark/60">
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-ghibli-bark/5 text-ghibli-bark/60">
                                    +{project.techStack.length - 4}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {project.repoUrl && project.repoUrl !== '#' && (
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-ghibli-leaf hover:text-ghibli-bark transition-colors">
                                    Code →
                                </a>
                            )}
                            {project.demoUrl && project.demoUrl !== '#' && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-ghibli-sunset hover:text-ghibli-bark transition-colors">
                                    Demo →
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {projects.length > 6 && (
                <motion.div {...fadeInUp} className="text-center mt-8">
                    <button onClick={() => setShowAll(!showAll)} className="ghibli-btn-outline">
                        {showAll ? 'Show Less' : `View All ${projects.length} Projects`}
                    </button>
                </motion.div>
            )}
        </section>
    );
};

const ContactSection = () => {
    const { personal } = portfolioData;
    return (
        <section id="contact" className="ghibli-section pb-32">
            <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="ghibli-heading mb-2">Say Hello</h2>
                <div className="ghibli-divider mx-auto max-w-xs" />
                <p className="ghibli-subheading mt-4">Let us create something magical together</p>
            </motion.div>

            <motion.div {...fadeInUp} className="max-w-xl mx-auto">
                <div className="ghibli-card p-8 text-center">
                    <span className="text-5xl mb-4 block">✉️</span>
                    <h3 className="font-[family-name:var(--font-caveat)] text-2xl text-ghibli-bark mb-4">Get in Touch</h3>
                    <p className="text-ghibli-bark/70 mb-6">
                        I am always open to new opportunities and collaborations.
                        Feel free to reach out!
                    </p>

                    <div className="space-y-3 mb-6">
                        <a href={`mailto:${personal.email}`}
                            className="flex items-center gap-3 justify-center text-ghibli-bark hover:text-ghibli-leaf transition-colors">
                            <span>📧</span> {personal.email}
                        </a>
                        <a href={`tel:${personal.phone}`}
                            className="flex items-center gap-3 justify-center text-ghibli-bark hover:text-ghibli-leaf transition-colors">
                            <span>📱</span> {personal.phone}
                        </a>
                        <p className="flex items-center gap-3 justify-center text-ghibli-bark/60">
                            <span>📍</span> {personal.location}
                        </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                        {personal.socialLinks.map(link => (
                            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="ghibli-btn-outline px-4 py-2 text-sm">
                                {link.platform}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const Footer = () => (
    <footer className="relative z-20 py-8 text-center border-t border-ghibli-bark/10"
        style={{ background: 'rgba(253, 246, 227, 0.9)' }}>
        <p className="text-ghibli-bark/50 text-sm font-[family-name:var(--font-quicksand)]">
            Crafted with magic by Anggit Djoko Wibowo
        </p>
    </footer>
);

export default function HomePage() {
    return (
        <GhibliLayout>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </GhibliLayout>
    );
}
