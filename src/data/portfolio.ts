import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Anggit Djoko Wibowo',
        title: 'Full-Stack Developer',
        subtitle: 'Full-Stack Developer · Data Analyst',
        bio: 'Full-Stack Developer building products from database to deployment. Data-driven, production-focused.',
        avatar: '/portfolio/about/Linkedin.jpg',
        location: 'Pontianak, Indonesia',
        email: 'anggitdjokow00@gmail.com',
        phone: '+62 813 5033 8618',
        resumeUrl: '/resume',
        website: 'https://anggitdjoko.github.io/portfolio',
        education: 'Politeknik Negeri Pontianak',
        languages: [
            { name: 'Indonesian', level: 'Native' },
            { name: 'English', level: 'Professional' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/anggitdjoko',
                icon: 'github',
                username: 'anggitdjoko',
            },
            {
                platform: 'LinkedIn',
                url: 'https://linkedin.com/in/anggitdjoko',
                icon: 'linkedin',
                username: 'Anggit Djoko Wibowo',
            },
            {
                platform: 'Email',
                url: 'mailto:anggitdjokow00@gmail.com',
                icon: 'email',
                username: 'anggitdjokow00@gmail.com',
            },
            {
                platform: 'WhatsApp',
                url: 'https://wa.me/6281350338618',
                icon: 'whatsapp',
                username: '+62 813 5033 8618',
            },
        ],
    },
    projects: [
        {
            id: 'project-1',
            slug: 'browser-automation-agent',
            title: 'Browser Automation Agent',
            description: 'A command-line interface (CLI) tool for AI-driven browser automation.',
            longDescription: 'Agent Browser is a command-line interface (CLI) tool for AI-driven browser automation. Built on top of browser-use, this tool allows you to command an AI agent to perform complex browser interactions, scraping, and testing using natural language.',

            techStack: ['Python 3.11+', 'browser-use', 'Gemini', 'Groq'],
            tools: ['VS Code', 'CLI', 'uv'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Browser-Automation-Agent.git',
            demoUrl: '#',
            startDate: '2026-04-01',
            role: 'AI Engineer',
            customTimeline: 'April 2026',
            team: 'Personal Project',

            highlights: ['Natural Language Control', 'Multiple LLM Support', 'Smart Rate Limiting'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Natural Language Control**: Command the browser to navigate, click, fill forms, and extract information using simple text prompts.',
                        '**Multiple LLM Support**: Easily toggle between powerful models like Google Gemini and Groq.',
                        '**Vision Mode**: Support for standard screen rendering capability for complex sites.'
                    ]
                },
                {
                    title: 'Performance & Optimization',
                    items: [
                        '**Smart Rate Limiting**: Built-in delay mechanism and fallback handling to gracefully circumvent free-tier API rate limits.',
                        '**CLI Workflows**: Execute fast actions directly from your terminal using robust CLI commands.',
                        '**Optimized Setup**: Seamless dependency management using standard virtual environment or uv.'
                    ]
                },
                {
                    title: 'Logging & Outputs',
                    items: [
                        '**Execution Traces**: Application logs are automatically written to the logs/ directory for easy debugging.',
                        '**Data Exports**: Any graphical outputs (like screenshots from Vision mode) or data exports are saved to the outputs/ directory.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone and Setup',
                    code: 'git clone https://github.com/anggitdjoko/Browser-Automation-Agent.git\ncd Browser-Automation-Agent\npython -m venv venv\nvenv\\Scripts\\activate',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -e .',
                    type: 'code'
                },
                {
                    title: 'Environment Configuration',
                    code: 'cp .env.example .env\n# Fill in GOOGLE_API_KEY or GROQ_API_KEY',
                    type: 'code'
                },
                {
                    title: 'Run Agent',
                    code: 'agentbrowser run --help\nagentbrowser run "Cari jadwal libur nasional Indonesia 2026 di Google dan rangkum"',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "API Rate Limits Exhaustion",
                    solution: "Implemented a smart rate limiting delay mechanism and fallback handling to gracefully circumvent free-tier API restrictions (e.g., Gemini 15 RPM Free Tier)."
                },
                {
                    problem: "Complex DOM Navigation",
                    solution: "Integrated a Vision Mode to capture screenshots and allow the LLM to process visual context for dynamically rendered sites."
                },
                {
                    problem: "Command-Line Interface Scalability",
                    solution: "Engineered a robust CLI framework offering specific workflow executions, dynamic LLM toggling (--llm gemini), and vision toggles (--vision)."
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'swarm-agent-orchestrator',
            title: 'Swarm AI Blog Writer',
            description: 'Production-grade multi-agent blog generation engine powered by Pydantic AI and Groq (Llama 3.3 70B).',
            longDescription: 'Swarm AI Blog Writer is a production-grade, multi-agent blog generation engine where multiple specialized AI agents orchestrate in a synchronized pipeline to create long-form, research-backed blog posts exported as professional PDF reports. Powered by Pydantic AI structured validation and Groq\'s Llama 3.3 70B, the system features a Planner, Researcher, Writer, and Editor agent working in harmony. A premium SaaS-grade Vue.js 3 frontend with GSAP animations and a bento-grid layout delivers the interaction layer, while a serverless Flask backend handles AI inference and PDF generation.',

            techStack: ['Vue.js 3', 'Vite 5', 'TypeScript', 'Tailwind CSS 3', 'GSAP 3', 'Python', 'Flask', 'Pydantic v2', 'Groq API', 'Llama 3.3 70B', 'FPDF2'],
            tools: ['VS Code', 'Vercel', 'Postman', 'GitHub'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Swarm-Agent-Orchestrator',
            demoUrl: 'https://swarmagentblog.vercel.app/',
            startDate: '2025-03-01',
            role: 'AI Engineer & Full Stack Developer',
            customTimeline: 'March 2025',
            team: 'Personal Project',

            highlights: ['Multi-Agent Orchestration', '70B LLM via Groq', 'Professional PDF Export'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Multi-Agent Orchestration',
                    items: [
                        '**Planner Agent**: Generates a structured 5-section blog outline validated by Pydantic v2 schemas before passing to the next stage.',
                        '**Researcher Agent**: Performs deep-dive research for each section using Llama 3.3 70B, enriching content with factual context.',
                        '**Writer Agent**: Crafts the final 1000+ word Markdown article from the research data, ensuring stylistic coherence.',
                        '**Editor Agent**: Reviews and refines the draft for clarity, grammar, and professional tone before PDF export.'
                    ]
                },
                {
                    title: 'Premium SaaS Frontend',
                    items: [
                        '**Vue.js 3 + GSAP**: Fluid, GSAP-powered animations on a high-contrast minimalist interface for a premium feel.',
                        '**Bento-Grid Layout**: Modern card-based feature showcase using Tailwind CSS 3 for a polished SaaS aesthetic.',
                        '**Live Generation Panel**: Real-time progress feed showing agent pipeline status as the blog is being generated.',
                        '**Lucide VueNext Icons**: Consistent, scalable icon system integrated throughout the UI components.'
                    ]
                },
                {
                    title: 'AI & Validation Pipeline',
                    items: [
                        '**Pydantic v2 Schemas**: Strict structured validation (BlogPlan, FinalBlog) enforced at each agent handoff to prevent hallucinated outputs.',
                        '**Groq Inference**: Standardized on Llama 3.3 70B via Groq API for superior reasoning speed and schema adherence.',
                        '**5-Section Planning**: Comprehensive outline generation covering introduction, body sections, and conclusion for long-form articles.'
                    ]
                },
                {
                    title: 'Infrastructure & Deployment',
                    items: [
                        '**Serverless Architecture**: Flask backend structured as a flat, serverless-compatible API for Vercel deployment.',
                        '**Professional PDF Export**: Automatic Markdown-to-PDF rendering via FPDF2 with automated artifact cleanup after delivery.',
                        '**Vercel Routing**: `vercel.json` routes all `/api/*` requests to the Flask serverless handler; Vite-built frontend served from `dist/`.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/anggitdjoko/Swarm-Agent-Orchestrator.git\ncd Swarm-Agent-Orchestrator',
                    type: 'code'
                },
                {
                    title: 'Install Frontend Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Install Backend Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Environment Configuration',
                    code: '# Create .env in the root directory\nGROQ_API_KEY=your_groq_key_here',
                    type: 'code'
                },
                {
                    title: 'Run Development Servers',
                    code: '# Terminal 1 — Frontend\nnpm run dev\n\n# Terminal 2 — Backend\npython api/index.py\n# Visit http://localhost:5173',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Agent Pipeline Validation Failures',
                    solution: 'Enforced strict Pydantic v2 schemas (BlogPlan, FinalBlog) at every agent handoff boundary. Any malformed LLM output triggers a re-prompt before the pipeline advances, ensuring 100% schema-valid data flow.'
                },
                {
                    problem: 'Serverless Cold-Start Latency',
                    solution: 'Restructured the Flask application into a flat, serverless-compatible API layout for Vercel, minimizing dependency loading overhead and achieving sub-400ms cold-start initialization.'
                },
                {
                    problem: 'PDF Encoding Artifacts',
                    solution: 'Built a custom Markdown sanitization layer before FPDF2 rendering that strips unsupported Unicode characters and normalizes heading/emphasis syntax, producing clean, professional PDF output without encoding errors.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'creative-portfolio-website',
            title: 'Creative Portfolio Website',
            description: 'Modern, animated portfolio with 3D elements and smooth animations.',
            longDescription: 'A production-grade creative portfolio engineered to demonstrate high-level proficiency in Artificial Intelligence, Blockchain, and Modern Web Architectures. This platform transcends traditional static websites by offering a high-performance interactive experience powered by advanced WebGL shaders, physics-based simulations, and real-time data integration. It serves as a living laboratory for experimenting with cutting-edge frontend technologies while maintaing strict accessibility and SEO standards.',

            techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'GSAP'],
            tools: ['VS Code', 'Figma', 'GitHub'],
            status: 'completed',
            demoUrl: 'https://syahrilarfianalmazril.vercel.app',
            repoUrl: 'https://github.com/anggitdjoko/PersonalBlog',
            startDate: '2025-01-20',
            highlights: ['3D animations', 'Scroll effects', 'Bilingual EN/ID'], // Keep for backward compatibility if needed, or rely on features
            category: 'Creative Tech',
            features: [
                {
                    title: 'Immersive 3D Experience',
                    items: [
                        '**Interactive 3D Lanyard**: A physics-simulated 3D ID Card in the hero section that reacts to mouse movements.',
                        '**Hyperspeed Backgrounds**: Custom shader-based warp effects for a futuristic Web3 aesthetic.',
                        '**Particle Systems**: Dynamic background particles that enhance depth and interactivity.'
                    ]
                },
                {
                    title: 'Professional Insights',
                    items: [
                        '**Real-time Coding Stats**: Integrated WakaTime cards showing your top languages and coding activity.',
                        '**Dynamic GitHub Metrics**: Live cards displaying repository stats and contributions.',
                        '**Interactive Timeline**: A visual journey of your career at CPS Lab, HUMIC, and more.'
                    ]
                },
                {
                    title: 'Performance & UX',
                    items: [
                        '**Bilingual (EN/ID)**: Complete internationalization support.',
                        '**Smooth Scroll**: Lenis-based smooth scrolling for a premium feel.',
                        '**Theme Engine**: System-preferred dark/light mode with a custom "Click Spark" effect.',
                        '**Responsive Architecture**: Pixel-perfect layouts for mobile, tablet, and desktop.'
                    ]
                },
                {
                    title: 'Scalable Ecosystem',
                    items: [
                        '**Modular Components**: Atomic design architecture for maximum reusability.',
                        '**Type Safety**: Full TypeScript implementation for robust code reliability.',
                        '**SEO Optimized**: Semantic HTML and meta tags for maximum visibility.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/anggitdjoko/PersonalBlog.git\ncd PersonalBlog',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environment Variables',
                    type: 'text',
                    code:
                        `Create a .env.local file in the root directory:

NEXT_PUBLIC_GITHUB_USERNAME=anggitdjoko
WAKATIME_API_KEY=your_wakatime_key`
                },
                {
                    title: 'Launch Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Performance Bottlenecks with Heavy 3D Assets",
                    solution: "Engineered a custom rendering pipeline using Instanced Meshes and aggressive DRaco compression, reducing initial load time by 60% while maintaining a consistent 60 FPS on mobile devices through dynamic quality scaling."
                },
                {
                    problem: "Seamless State Synchronization",
                    solution: "Implemented a robust global state management system using Zustand to orchestrate complex interactions between the React UI layer and the 3D Canvas, ensuring perfectly synchronized animations without prop-drilling overhead."
                },
                {
                    problem: "Cross-Browser Shader Compatibility",
                    solution: "Developed fallback materials and uniform-based capability detection to ensure the custom GLSL shaders render correctly across inconsistent WebGL implementations on Safari and older Android browsers."
                }
            ],

        },
        {
            id: 'project-4',
            slug: 'snbtin-platform',
            title: 'SNBTIn - Platform Persiapan SNBT 2025',
            description: 'Platform e-learning #1 di Indonesia untuk persiapan SNBT bagi siswa SMA.',
            longDescription: 'SNBTIn adalah platform persiapan SNBT (Seleksi Nasional Berbasis Tes) terpercaya yang dirancang khusus untuk siswa SMA di Indonesia. Menyediakan ekosistem pembelajaran komprehensif dengan materi berkualitas, latihan soal, forum diskusi, dan fitur-fitur interaktif yang membantu siswa mempersiapkan diri secara optimal. Dengan lebih dari 10,000 siswa aktif dan tingkat kelulusan 85%, platform ini menjadi solusi utama untuk menembus PTN impian.',

            techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
            tools: ['VS Code', 'GitHub', 'Figma', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/SNBTIn',
            demoUrl: 'https://snbtin.vercel.app/',
            startDate: '2025-01-01',
            customTimeline: 'Mar 2025 – Apr 2025',
            team: '4 Developers',
            highlights: ['10,000+ Active Students', '85% Pass Rate', '98% Exam Similarity'],
            category: 'EdTech Platform',
            features: [
                {
                    title: '📚 Comprehensive Learning Ecosystem',
                    items: [
                        '**Materi Lengkap**: Full curriculum coverage for all SNBT subjects with videos, PDFs, and interactive docs.',
                        '**Video Interaktif**: High-quality video explanations from expert instructors.',
                        '**Latihan Soal**: Over 10,000 practice questions with detailed solutions and error analysis.'
                    ]
                },
                {
                    title: '🎯 Exam Mastery & Analytics',
                    items: [
                        '**Tryout Berkala**: Regular simulation exams with latest question patterns.',
                        '**Analisis Kemampuan**: Detailed performance dashboard to track progress and weak points.',
                        '**98% Similarity**: Questions designed to closely mimic actual SNBT exams.'
                    ]
                },
                {
                    title: '💻 Modern Tech Experience',
                    items: [
                        '**Dark/Light Mode**: Comfortable learning environment day or night.',
                        '**Responsive Design**: Optimized for desktop, tablet, and mobile learning.',
                        '**Interactive Visuals**: 3D models and animated backgrounds for engaging UX.'
                    ]
                },
                {
                    title: '🤝 Community & Support',
                    items: [
                        '**Forum Diskusi**: Collaborative learning space for students and teachers.',
                        '**Konsultasi**: Direct access to instructors for difficult topics.',
                        '**Leaderboard**: Gamified progress tracking to motivate students.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/anggitdjoko/SNBTIn.git\ncd SNBTIn',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environmental Setup',
                    code: 'NEXT_PUBLIC_API_URL=your_api_url\nNEXTAUTH_URL=http://localhost:3000\nDATABASE_URL=your_db_connection',
                    type: 'code'
                },
                {
                    title: 'Run Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling High-Concurrency Tryouts",
                    solution: "Implemented serverless architecture with scalable database connections to handle thousands of concurrent users during national simulation events without latency."
                },
                {
                    problem: "Real-time Analytics Processing",
                    solution: "Utilized efficient data aggregation pipelines to provide instant feedback and detailed performance analytics immediately after exam submission."
                },
                {
                    problem: "Interactive Content Delivery",
                    solution: "Integrated a custom video player and PDF viewer with lazy loading and adaptive streaming to ensure smooth content delivery even on low-bandwidth connections."
                }
            ],

        },
        {
            id: 'project-5',
            slug: 'terraflow-platform',
            title: 'Terraflow Platform',
            description: 'Enterprise-grade IoT solution for precision agriculture.',
            longDescription: 'TerraFlow Platform is an intelligent IoT solution designed for precision agriculture and environmental monitoring. It features a robust Direct-to-Cloud architecture where ESP32 sensor nodes communicate directly with Firebase Realtime Database, ensuring instant data synchronization. The system combines a high-performance Go (Gin) backend for configuration management with a modern Next.js 14 frontend for real-time visualization and remote control of actuators like pumps and servos.',

            techStack: ['Next.js', 'Go', 'Gin', 'Firebase', 'Docker', 'ESP32', 'C++', 'React', 'Tailwind CSS'],
            tools: ['VS Code', 'Docker', 'Firebase Console', 'PlatformIO'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/TerraflowPlatform',
            demoUrl: 'https://terraflowio.vercel.app/',
            startDate: '2025-10-01',
            customTimeline: 'Oct 2025 - Dec 2025',
            team: '2 Developer',
            role: 'Software Engineering',
            highlights: ['Direct-to-Cloud Architecture', 'Real-time Monitoring', 'Go High-Performance API'],
            category: 'IoT & Embedded',
            features: [
                {
                    title: '🤖 Smart Firmware (ESP32)',
                    items: [
                        '**Direct HTTP Communication**: Efficient data transmission using `HTTPClient.h` directly to Firebase REST API.',
                        '**Smart Control Logic**: Automated actuation of pumps and servos based on real-time sensor readings.',
                        '**Robust Connectivity**: Built-in auto-reconnect and retry mechanisms to handle unstable field networks.'
                    ]
                },
                {
                    title: '🖥️ Modern Dashboard',
                    items: [
                        '**Real-time Visualization**: Dynamic charts using `recharts` that update instantly with Firebase data.',
                        '**Interactive Control**: Remote manual overrides for field actuators directly from the UI.',
                        '**Responsive Design**: Built with Next.js 14 and Tailwind CSS for optimal experience on all devices.'
                    ]
                },
                {
                    title: '⚡ High-Performance Backend',
                    items: [
                        '**Go (Gin) Server**: Ultra-fast API for centralized configuration management.',
                        '**Secure Distribution**: Safe delivery of Firebase credentials to authenticated clients.',
                        '**Health Monitoring**: Dedicated endpoints for container and service status checks.'
                    ]
                },
                {
                    title: '☁️ Direct-to-Cloud Architecture',
                    items: [
                        '**Zero-Gateway Latency**: Edge devices write directly to the cloud, bypassing intermediate gateways for millisecond-level updates.',
                        '**Scalable Infrastructure**: Containerized deployment with Docker ensures consistent environments across development and production.',
                        '**Firebase Sync**: Leverages Firebase Realtime Database for instant state synchronization between hardware and all connected clients.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'PORT=8080\nALLOWED_ORIGINS=http://localhost:3000\nFIREBASE_API_KEY=your_key\n# Add other Firebase credentials',
                    type: 'code'
                },
                {
                    title: 'Deploy with Docker',
                    code: 'cd deployments\ndocker-compose up -d --build',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Unstable Field Connectivity",
                    solution: "Implemented a robust state machine in C++ firmware with exponential backoff retries and auto-reconnection logic to ensure zero data loss during network interruptions."
                },
                {
                    problem: "Real-time Latency",
                    solution: "Adoption of a Direct-to-Cloud architecture where edge devices bypass intermediate gateways and write directly to Firebase, reducing latency to milliseconds."
                },
                {
                    problem: "Secure Config Management",
                    solution: "Developed a centralized Go (Gin) backend service to manage and distribute sensitive configuration and credentials securely, decoupling them from the frontend code."
                }
            ],
        },
        {
            id: 'project-6',
            slug: 'docsinsight-engine',
            title: 'DocsInsight Engine',
            description: 'Enterprise RAG System for intelligent document analysis.',
            longDescription: 'DocsInsight Engine is a high-performance, private Retrieval-Augmented Generation (RAG) platform. It allows users to upload complex documents and interact with them through a neural search interface powered by local Large Language Models (LLMs). Built on a robust Python/Flask backend and orchestrated by LangChain, it ensures sensitive data never leaves your infrastructure while delivering enterprise-grade search capabilities.',

            techStack: ['Python', 'Flask', 'LangChain', 'Ollama', 'ChromaDB', 'Docker'],
            tools: ['VS Code', 'Docker', 'Ollama'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/RAG-DocsInsight-Engine',
            demoUrl: '#', // Set to '#' to trigger specific disabled state
            startDate: '2024-11-01',
            role: 'AI Engineer',
            customTimeline: 'Oct - Nov 2025',

            highlights: ['Local LLM Execution', 'Multi-Format Support', 'Neural Retrieval'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Multi-Format Support**: Seamlessly process PDF, DOCX, XLSX, CSV, and TXT files.',
                        '**Privacy-Centric**: Fully local execution using **Ollama**. Your sensitive data never leaves your infrastructure.',
                        '**Neural Retrieval**: Uses **ChromaDB** for high-speed vector similarity search.'
                    ]
                },
                {
                    title: 'Modern Interface',
                    items: [
                        '**Glassmorphism UI**: A sleek, dark-themed interface with real-time markdown rendering.',
                        '**Code Highlighting**: Automatic syntax highlighting for technical responses.',
                        '**Source Verification**: Every answer comes with citations from uploaded documents to prevent hallucinations.'
                    ]
                },
                {
                    title: 'Technical Architecture',
                    items: [
                        '**Backend**: Python 3.11 with Flask and LangChain orchestration.',
                        '**Vector DB**: ChromaDB for persistent document embeddings.',
                        '**One-Command Setup**: Production-ready deployment with Docker and Docker Compose.'
                    ]
                },
                {
                    title: 'System Insights',
                    items: [
                        '**Scalability**: The `VectorStoreManager` handles multiple documents simultaneously by filtering searches based on unique file hashes.',
                        '**Performance**: Document chunking is optimized with a `1000` character size and `200` character overlap.',
                        '**Security**: Strictly enforced policies to prevent sensitive credentials (`.env`) or local databases from being exposed.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone and Setup',
                    code: 'git clone https://github.com/anggitdjoko/RAG-DocsInsight-Engine.git\ncd rag-docsinsight-engine',
                    type: 'code'
                },
                {
                    title: 'Launch with Docker',
                    code: 'docker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Access Application',
                    code: 'Open http://localhost:5000',
                    type: 'text'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Scalability with Multiple Documents",
                    solution: "Designed a `VectorStoreManager` that filters searches based on unique file hashes, allowing the system to handle multiple uploaded documents simultaneously without cross-contamination."
                },
                {
                    problem: "Context Window Efficiency",
                    solution: "Optimized document chunking with a 1000-character size and 200-character overlap to maintain context coherence while fitting within the Llama 3 context window."
                },
                {
                    problem: "Data Security",
                    solution: "Implemented strict `.dockerignore` and `.gitignore` policies to prevent sensitive credentials (`.env`) or local vector databases from being leaked to version control."
                }
            ]
        },
        {
            id: 'project-7',
            slug: 'donasiaku',
            title: 'Donasiaku',
            description: 'Platform Penyaluran Donasi Barang Layak Pakai.',
            longDescription: 'Donasiku adalah platform modern yang dirancang untuk memfasilitasi penyaluran donasi barang fisik layak pakai secara efisien dan transparan. Menghubungkan Donatur dengan Penerima melalui ekosistem digital yang dilengkapi fitur pelacakan status, chat real-time, dan verifikasi akun untuk memastikan bantuan sampai ke tangan yang tepat.',

            techStack: ['Laravel 12', 'React 19', 'Tailwind CSS 3.4', 'MySQL', 'Vite', 'Sanctum'],
            tools: ['VS Code', 'Docker', 'Postman', 'MySQL Workbench'],
            status: 'completed',
            repoUrl: 'https://github.com/Mazkad12/DONASIKU-WEBPRO',
            demoUrl: 'https://donasiku.site/',
            startDate: '2024-10-01',
            role: 'Full Stack Developer',
            customTimeline: 'Oct - Dec 2025',
            team: '6 Developers',

            highlights: ['Monorepo Architecture', 'Real-time Chat', 'Sanctum Authentication'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Donation Management',
                    items: [
                        '**Postingan Donasi**: Donatur dapat mengunggah barang dengan foto, deskripsi, dan kategori.',
                        '**Permintaan Barang**: Penerima dapat menelusuri katalog dan mengirim permintaan langsung.',
                        '**Status Tracking**: Pelacakan status transparan mulai dari Dipesan hingga Diterima.'
                    ]
                },
                {
                    title: 'Security & Trust',
                    items: [
                        '**Otentikasi Aman**: Didukung oleh **Laravel Sanctum** untuk manajemen sesi yang kuat.',
                        '**Verifikasi Akun**: Sistem validasi dokumen untuk memastikan kredibilitas Penerima.',
                        '**Role-Based Access**: Antarmuka yang dioptimalkan khusus untuk Donatur dan Penerima.'
                    ]
                },
                {
                    title: 'Communication',
                    items: [
                        '**Real-time Chat**: Koordinasi langsung antara donor dan penerima dalam platform.',
                        '**Sistem Notifikasi**: Pemberitahuan instan untuk pesan baru dan perubahan status donasi.',
                        '**Responsive UI**: Desain yang dioptimalkan untuk akses dari seluler hingga desktop.'
                    ]
                },
                {
                    title: 'User Intelligence',
                    items: [
                        '**Manajemen Profil**: Pengaturan informasi pribadi, avatar, dan preferensi donasi.',
                        '**Riwayat Aktivitas**: Rekam jejak lengkap donasi yang pernah diberikan atau diterima.',
                        '**Analitik Sederhana**: Statistik kontribusi sosial bagi pengguna aktif.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/Mazkad12/DONASIKU-WEBPRO.git\ncd donasiaku',
                    type: 'code'
                },
                {
                    title: 'Docker Setup (Recommended)',
                    code: 'docker-compose -f docker-compose.dev.yml up -d --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\ncomposer install\ncp .env.example .env\nphp artisan key:generate\nphp artisan migrate\nphp artisan serve',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\nnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Secure Document Verification",
                    solution: "Developed a robust backend pipeline with Laravel Sanctum and manual admin verification workflows to ensure high trust levels for beneficiary accounts."
                },
                {
                    problem: "Real-time Coordination Complexity",
                    solution: "Integrated a custom chat system with instant state updates to facilitate direct communication without relying on third-party messaging apps."
                },
                {
                    problem: "Monorepo Environment Sync",
                    solution: "Orchestrated a containerized development environment using Docker to ensure seamless integration between the PHP/Laravel API and React 19 client."
                }
            ]
        },
        {
            id: 'project-8',
            slug: 'security-automation-genai',
            title: 'Security Automation with GenAI',
            description: 'AI-driven cybersecurity threat detection system using Transformers.',
            longDescription: 'Security Automation with GenAI is a research-driven project exploring the intersection of deep learning and cybersecurity. It leverages state-of-the-art Transformer architectures and Adaptive Attention mechanisms to automate the detection of complex threats like SQL Injection, DDoS, and network intrusions, providing a robust defense framework for modern digital infrastructures.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Transformers', 'Pandas', 'Scikit-learn', 'Adaptive Attention'],
            tools: ['VS Code', 'Jupyter Notebook', 'Google Colab', 'Wireshark'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Security-Automation-GenAI',
            demoUrl: '#', // Research-based platform
            startDate: '2024-09-01',
            role: 'AI Developer',
            customTimeline: 'Nov - Dec 2025',
            team: 'SOC Intern Project',

            highlights: ['Transformer-Based SQLi Detection', 'Adaptive Attention for DDoS', 'Multi-Modal Data Fusion'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Threat Intelligence',
                    items: [
                        '**SQLi Transformer**: Contextual learning model that recognizes malicious SQL patterns in HTTP requests.',
                        '**Phishing BERT**: Bidirectional analysis of URLs and email text to identify deceptive social engineering attempts.',
                        '**Malware Classification**: Network traffic sequence analysis to detect C2 communications.'
                    ]
                },
                {
                    title: 'Network Defense',
                    items: [
                        '**Adaptive DDoS Protection**: Real-time traffic analysis using dynamic attention weights for spike detection.',
                        '**Intrusion Detection**: High-precision classification of unauthorized access patterns using UNSW-NB15 datasets.',
                        '**MitM Identification**: Anomaly detection in communication sequences to identify packet interception.'
                    ]
                },
                {
                    title: 'Research Domains',
                    items: [
                        '**Zero-Day Detection**: Unsupervised learning approach to identify previously unmapped attack behaviors.',
                        '**Ransomware Prediction**: Sequence modeling for sudden encryption patterns in packet data.',
                        '**Insider Threat Analysis**: Comprehensive user activity log analysis for unusual access patterns.'
                    ]
                },
                {
                    title: 'Performance Analytics',
                    items: [
                        '**Comprehensive Metrics**: Evaluation using precision-recall curves, F1-scores, and confusion matrices.',
                        '**Visual Insights**: Deep data distribution analysis using Matplotlib and Seaborn.',
                        '**Temporal Analysis**: Understanding data flow over time to identify slow-burning APT (Advanced Persistent Threats).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Setup Environment',
                    code: 'git clone https://github.com/anggitdjoko/Security-Automation-GenAI.git\ncd security-automation-ai-genai\n# Recommended: use a virtual environment',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install tensorflow pandas numpy matplotlib seaborn scikit-learn jupyter',
                    type: 'code'
                },
                {
                    title: 'Run Research Notebooks',
                    code: 'cd [target_source_dir]\njupyter notebook\n# Open the .ipynb files in the notebook subdirectory',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Signature-Based Limitations",
                    solution: "Transformed security operations by implementing Transformer models that learn from behavior and context rather than static signatures."
                },
                {
                    problem: "Dynamic Attack Patterns",
                    solution: "Developed an Adaptive Attention mechanism that dynamically adjusts focus to specific traffic segments during active DDoS attempts."
                },
                {
                    problem: "Multi-Modal Data Synchronization",
                    solution: "Engineered a data fusion pipeline to integrate network traffic, file logs, and process behavior into a unified Transformer input layer."
                }
            ]
        },
        {
            id: 'project-9',
            slug: 'web3-guestbook-dapp',
            title: 'Web3 Guestbook DApp',
            description: 'Decentralized guestbook on Ethereum allowing for immutable messages.',
            longDescription: 'Web3GuestbookDapp is a decentralized application that bridges modern Web2 interfaces with the Ethereum blockchain. It allows users to connect their MetaMask wallets and sign a persistent guestbook, creating immutable records of their visit. The project demonstrates the full lifecycle of a DApp, from smart contract development with Solidity to a responsive frontend built with Next.js.',

            techStack: ['Solidity', 'Hardhat', 'Next.js', 'Ethereum', 'Web3.js', 'MetaMask', 'Ethers.js'],
            tools: ['VS Code', 'MetaMask', 'Remix IDE', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Web3GuestbookDapp',
            demoUrl: 'https://metamaskguestbook.vercel.app/',
            startDate: '2025-01-01',
            role: 'Blockchain Developer',
            customTimeline: 'Jan - Feb 2026',
            team: 'Personal Project',

            highlights: ['Immutable Blockchain Records', 'MetaMask Integration', 'Smart Contract Automation'],
            category: 'Blockchain',
            features: [
                {
                    title: 'Wallet Integration',
                    items: [
                        '**MetaMask Connection**: Seamless user authentication through industry-standard Web3 providers.',
                        '**Account Status**: Real-time monitoring of wallet connection and network synchronization.',
                        '**Auto-Recovery**: Graceful handling of network switches and account changes.'
                    ]
                },
                {
                    title: 'Blockchain Logic',
                    items: [
                        '**Solidity Smart Contract**: Robust logic for managing guestbook entries stored on-chain.',
                        '**Hardhat Environment**: Comprehensive suite for testing, compiling, and deploying contracts.',
                        '**Immutable Logs**: Every signature is a permanent transaction on the Ethereum network.'
                    ]
                },
                {
                    title: 'Real-time Interaction',
                    items: [
                        '**Auto-Fetch Feed**: Instant update of guestbook entries upon successful blockchain confirmation.',
                        '**Transaction Feedback**: Visual indicators for transaction pending, success, and error states.',
                        '**Wave Reactions**: Interactive "Wave" feature that sends a blockchain-verified greeting.'
                    ]
                },
                {
                    title: 'Optimized Frontend',
                    items: [
                        '**Next.js 14**: High-performance interface with optimized rendering and asset delivery.',
                        '**Tailwind Styling**: Modern, clean UI designed for a professional Web3 experience.',
                        '**ABI Bridge**: Secure integration between Javascript logic and the smart contract interface.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Install',
                    code: 'git clone https://github.com/anggitdjoko/Web3GuestbookDapp.git\ncd web3guestbookdapp\nnpm install',
                    type: 'code'
                },
                {
                    title: 'Blockchain Setup',
                    code: 'cd backend\nnpx hardhat node\n# In a new terminal:\nnpx hardhat run scripts/deploy.js --network localhost',
                    type: 'code'
                },
                {
                    title: 'Frontend Configuration',
                    code: 'cd ../frontend\n# Update contract-address.json with the deployed address\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Blockchain Nonce Desynchronization",
                    solution: "Implemented a custom activity reset workflow and state-sync logic to handle cases where local blockchain resets caused mismatching nonces in MetaMask."
                },
                {
                    problem: "Contract ABI Management",
                    solution: "Automated the ABI extraction process into the frontend environment to ensure the bridge between Web2 and Web3 remains perfectly aligned during contract updates."
                },
                {
                    problem: "Ethereum Event Handling",
                    solution: "Utilized Ethers.js event listeners to trigger UI updates directly from the blockchain state, ensuring the feed remains real-time without polling."
                }
            ]
        },
        {
            id: 'project-10',
            slug: 'digilibzx',
            title: 'Digilibzx',
            description: 'Modern full-stack digital library management system with AI-powered features.',
            longDescription: 'Digilibzx is a comprehensive digital library management solution designed to streamline library operations. Built with a robust Java Spring Boot backend and a high-performance Next.js frontend, it integrates Google Gemini and OpenAI to provide automated book summaries. The system features a multi-layered security framework, real-time activity analytics, and a seamless borrowing system for an enhanced user experience.',

            techStack: ['Java', 'Spring Boot 3', 'Next.js 14', 'TypeScript', 'MySQL', 'Spring Security', 'Hibernate', 'Docker', 'Tailwind CSS', 'Shadcn UI', 'Google Gemini', 'OpenAI', 'Swagger', 'Recharts'],
            tools: ['IntelliJ IDEA', 'VS Code', 'Docker Desktop', 'MySQL Workbench', 'Maven', 'pnpm'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Digilibzx',
            demoUrl: '#', // Internal system
            startDate: '2024-08-01',
            role: 'Lead & Full Stack Dev',
            customTimeline: 'December 2025',
            team: '5 Developers',

            highlights: ['AI-Powered Book Summaries', 'Real-time Analytics Dashboard', 'Docker Containerization Ready'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'User Experience',
                    items: [
                        '**Smart Search**: Advanced book discovery by title, category, or author with real-time filtering.',
                        '**Self-Service Circulation**: Integrated shopping cart for borrowing requests and return tracking.',
                        '**Review System**: Community-driven ratings and reviews for every book in the collection.'
                    ]
                },
                {
                    title: 'AI Capabilities',
                    items: [
                        '**AI Summarize**: Automatic generation of book summaries using Google Gemini & OpenAI API integration.',
                        '**Smart Recommendations**: Data-driven book suggestions based on user borrowing patterns.',
                        '**Content Analysis**: Intelligent categorization and tagging of new library additions.'
                    ]
                },
                {
                    title: 'Admin Controls',
                    items: [
                        '**Analytics Dashboard**: Visualized insights into borrowing trends and popular books using Recharts.',
                        '**Transaction Validation**: Streamlined approval/rejection workflow for borrowing requests.',
                        '**Inventory Control**: Comprehensive book and category management with cover upload support.'
                    ]
                },
                {
                    title: 'System Integrity',
                    items: [
                        '**Secure Authentication**: Multi-layered protection using Spring Security and JWT signatures.',
                        '**PDF Reporting**: Automated generation of analytics and inventory reports for library auditing.',
                        '**Docker Ready**: Optimized orchestration for easy deployment and scalability across environments.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Docker Method (Recommended)',
                    code: 'git clone https://github.com/anggitdjoko/Digilibzx.git\ncd digilibzx\n# Update .env and application.properties\ndocker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\nmvn clean install\n# Setup MySQL (digilibz_db) and update application.properties\nmvn spring-boot:run',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\npnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Model Token Constraints",
                    solution: "Implemented a text-shredding and summarization pipeline to handle large book descriptions without exceeding Google Gemini's token limits."
                },
                {
                    problem: "Real-time Chart Performance",
                    solution: "Optimized database queries and integrated Recharts with memoized components to ensure smooth rendering of library activity dashboards."
                },
                {
                    problem: "Multi-Role Security Complexity",
                    solution: "Configured a granular Spring Security filter chain to manage distinct access levels for Admins, Lecturers, and Students securely."
                }
            ]
        },
        {
            id: 'project-12',
            slug: 'polabdc-dental-management',
            title: 'POLABDC Dental Management',
            description: 'AI-powered Dental Clinic Management SaaS for digitized operations.',
            longDescription: 'RoxyDental (POLABDC) is a high-performance SaaS solution designed to digitize dental clinic operations. It integrates Artificial Intelligence to assist dentists with disease prediction and data analysis while providing a seamless experience for patients, nurses, and administrators. Built as a Monorepo, the system ensures scalability by separating the Next.js client, Express.js server, and dynamic Python AI processing unit.',

            techStack: ['Next.js 14', 'Express.js', 'Prisma', 'Supabase', 'PostgreSQL', 'Python', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'JWT', 'Google Gemini'],
            tools: ['VS Code', 'Supabase Dashboard', 'Prisma Studio', 'Figma', 'Postman'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/POLABDC',
            demoUrl: 'https://polabdc.my.id/',
            startDate: '2024-07-01',
            role: 'Backend Developer',
            customTimeline: 'Nov 2025 - Jan 2026',
            team: '3 Developers',

            highlights: ['AI-Driven EMR System', 'Monorepo Architecture', 'Real-time Queue Management'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Dentist Experience',
                    items: [
                        '**Smart Dashboard**: Overview of daily appointments and financial stats at a glance.',
                        '**Digital EMR**: Comprehensive Electronic Medical Records with full history tracking.',
                        '**AI Assistant**: Intelligent disease prediction and clinical data analysis for diagnosis support.',
                        '**Treatment Planning**: Record treatments, prescriptions, and detailed clinical notes.'
                    ]
                },
                {
                    title: 'Nursing Workflow',
                    items: [
                        '**Queue Management**: Real-time handling of patient queues for efficient clinic flow.',
                        '**Vitals Recording**: Pre-consultation checks including blood pressure and symptom logging.',
                        '**Rapid Registration**: Streamlined onboarding process for new patients.'
                    ]
                },
                {
                    title: 'Operational Logic',
                    items: [
                        '**Scheduling System**: Conflict-free calendar for managing clinic-wide appointments.',
                        '**Billing & Invoicing**: Automated revenue tracking and invoice generation.',
                        '**RBAC Security**: Granular Role-Based Access Control for different clinic personnel.'
                    ]
                },
                {
                    title: 'AI & Infrastructure',
                    items: [
                        '**AI Service Integration**: Python-based microservice for high-speed disease prediction models.',
                        '**Monorepo Scaling**: Structured architecture connecting Next.js, Express.js, and AI modules.',
                        '**Database Architecture**: High-performance schema design using Prisma ORM and PostgreSQL.',
                        '**Real-time Synchronization**: Leveraging Supabase subscriptions for instant state updates across the clinic.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Database Setup',
                    code: 'cd backend\nnpm install\n# Configure .env with DATABASE_URL (Supabase)\nnpx prisma migrate dev --name init',
                    type: 'code'
                },
                {
                    title: 'Backend & AI Setup',
                    code: 'npm run dev # Backend starts at port 5000\ncd ../roxydental-ai\npip install -r requirements.txt\npython api.py',
                    type: 'code'
                },
                {
                    title: 'Frontend Launch',
                    code: 'cd ../frontend\nnpm install\n# Configure .env.local with NEXT_PUBLIC_API_URL\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Service Latency",
                    solution: "Isolated the AI engine into a separate Python microservice to prevent heavy ML processing from blocking the main Express.js event loop."
                },
                {
                    problem: "Monorepo Orchestration",
                    solution: "Implemented a structured directory system with shared environment configurations to maintain synchronization across Frontend, Backend, and AI modules."
                },
                {
                    problem: "Real-time Queue Sync",
                    solution: "leveraged Supabase real-time subscriptions and optimistic UI updates to ensure nurses and doctors see patient status changes instantly."
                }
            ]
        },
        {
            id: 'project-13',
            slug: 'deep-learning-image-classifier',
            title: 'Deep Learning Image Classifier',
            description: 'Interactive educational platform for visualizing CNN and Transfer Learning mechanics.',
            longDescription: 'The Deep Learning Image Classifier is an interactive educational platform designed to demystify the inner workings of Convolutional Neural Networks (CNN) and Transfer Learning. Built with Streamlit and TensorFlow, the application provides real-time visualizations of image preprocessing, RGB channel analysis, convolution operations, and intermediate feature maps, allowing users to watch as the model extracts features and reaches a classification decision.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Streamlit', 'Plotly', 'NumPy', 'SciPy', 'MobileNetV2', 'Pillow'],
            tools: ['Jupyter Notebook', 'Google Colab', 'Streamlit Cloud', 'VS Code'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/CA-Modul03-HandsOn',
            demoUrl: 'https://ca-modul03-handson.streamlit.app/',
            startDate: '2024-06-01',
            role: 'AI Research Engineer',
            customTimeline: 'Nov 2025',
            team: 'Personal Project',

            highlights: ['Real-time Feature Map Visualization', 'Interactive Layer Breakdown', 'CNN vs Transfer Learning Comparison'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Interactive Analytics',
                    items: [
                        '**RGB Matrix Analysis**: Dynamic heatmaps and histograms for detailed color channel decomposition.',
                        '**Feature Map Extraction**: Live visualization of intermediate layer outputs to understand what the model "sees".',
                        '**Prediction Confidence**: Interactive probability distributions and confidence meters for classification results.'
                    ]
                },
                {
                    title: 'Architecture Deep-Dive',
                    items: [
                        '**Custom CNN Workflow**: Step-by-step breakdown of a 3-layer convolutional network for hand gesture recognition.',
                        '**Conv Operations**: Real-time demonstration of filters extracting edges, textures, and patterns.',
                        '**MobileNetV2 Integration**: Implementation of pre-trained ImageNet models for high-accuracy Cheetah vs Hyena classification.'
                    ]
                },
                {
                    title: 'Model Learning',
                    items: [
                        '**Transfer Learning Mechanics**: Visual explanation of frozen base models and custom classifier fine-tuning.',
                        '**Hyperparameter Insights**: Interactive Sliders to adjust visualization parameters and model thresholds.',
                        '**Performance Reporting**: Detailed accuracy and loss metrics comparison between custom and pre-trained architectures.'
                    ]
                },
                {
                    title: 'Educational UX',
                    items: [
                        '**Progressive Visualization**: Managed learning path from raw image input to final classification probability.',
                        '**Interactive Documentation**: Integrated explanations of convolution, pooling, and activation functions.',
                        '**Dual-Model Comparison**: Parallel demonstration of standard CNN vs state-of-the-art Transfer Learning (MobileNetV2).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone https://github.com/anggitdjoko/CA-Modul03-HandsOn.git\ncd CA-Modul03-HandsOn\npython -m venv venv\nsource venv/bin/activate',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Launch Platform',
                    code: 'streamlit run app.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermediate Activation Capture",
                    solution: "Constructed sub-models using the Keras Functional API to extract output tensors from specific intermediate layers without interrupting the main inference pipeline."
                },
                {
                    problem: "High-Resolution Heatmap Lag",
                    solution: "Optimized RGB intensity distributions using Plotly's WebGL-accelerated rendering and data downsampling for ultra-smooth interactive charts."
                },
                {
                    problem: "Limited Computation on Edge",
                    solution: "Utilized depthwise separable convolutions from MobileNetV2 to achieve 96%+ accuracy while maintaining low-latency inference on standard CPU-based instances."
                }
            ]
        },
        {
            id: 'project-14',
            slug: 'ai-book-discovery-platform',
            title: 'AI Book Discovery Platform',
            description: 'Local RAG-based book recommendation system with semantic search.',
            longDescription: 'The AI Book Discovery Platform is an intelligent recommendation system that moves beyond simple keyword matching to understand the semantic context of user queries. Powered by Ollama, it leverages the \"nomic-embed-text\" model for vector-based search and \"llama3.2:1b\" for expert-level book analysis. The entire system runs 100% locally, ensuring complete user privacy while providing deep insights into search intent and reader profiling.',

            techStack: ['Python', 'Streamlit', 'Ollama', 'LangChain', 'Nomic Embed', 'Llama 3.2', 'Pandas', 'Scikit-learn'],
            tools: ['VS Code', 'Ollama Runtime', 'Streamlit Cloud', 'Jupyter Notebook'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/OllamaLLM-RecomendationSystem',
            demoUrl: '#', // Local AI service
            startDate: '2024-05-01',
            role: 'Ai & Software Developer',
            customTimeline: 'Oct - Nov 2025',
            team: 'Personal Project',

            highlights: ['Semantic Search Engine', '100% Local LLM Inference', 'Privacy-First Architecture'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Search Architecture',
                    items: [
                        '**Semantic Discovery**: Natural language understanding using vector embeddings to find books by theme and intent.',
                        '**Vector Search**: Implementation of Cosine Similarity algorithms to rank matches by semantic relevance.',
                        '**Contextual Logic**: Ability to find relevant titles even without matching exact keywords in descriptions.'
                    ]
                },
                {
                    title: 'Local AI Intelligence',
                    items: [
                        '**LLM Analysis**: Leveraging Llama 3.2 to generate expert book reviews, summaries, and audience insights.',
                        '**Query Decomposition**: Intelligent breakdown of user search descriptions to identify hidden reading preferences.',
                        '**Reader Profiling**: AI-generated reports on the user\'s reading style based on their historical search history.'
                    ]
                },
                {
                    title: 'Data Management',
                    items: [
                        '**Curated Datasets**: Pre-loaded collection of diverse literature for immediate discovery.',
                        '**Custom Ingestion**: Support for user-uploaded CSV datasets to enable search across personal libraries.',
                        '**Dynamic Tabulation**: Real-time processing and ranking of large book catalogs using optimized Pandas pipelines.'
                    ]
                },
                {
                    title: 'Privacy & Performance',
                    items: [
                        '**Edge Computing**: 100% local inference via Ollama, ensuring no data ever leaves the user\'s machine.',
                        '**Inference Optimization**: Fine-tuned model parameters (top_k, temperature) to balance generation speed and analytical depth.',
                        '**Responsive UI**: Instant feedback loops in Streamlit for embedding generation and generation status.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Ollama Setup',
                    code: 'ollama pull nomic-embed-text\nollama pull llama3.2:1b\n# Ensure Ollama serve is running',
                    type: 'code'
                },
                {
                    title: 'Environment Launch',
                    code: 'git clone https://github.com/anggitdjoko/OllamaLLM-RecomendationSystem.git\npip install -r requirements.txt\nstreamlit run OllamaLLM.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Vector Storage Overhead",
                    solution: "Developed an on-demand embedding generation and caching strategy for local datasets to eliminate the need for an external vector database."
                },
                {
                    problem: "LLM Hallucination Control",
                    solution: "Implemented strict system prompts and few-shot examples within the RAG pipeline to ensure generated reviews stay grounded in the provided book metadata."
                },
                {
                    problem: "System Resource Management",
                    solution: "Optimized the transition between the embedding model and generative model to prevent VRAM spikes on machines with limited hardware."
                }
            ]
        },
        {
            id: 'project-15',
            slug: 'mytelkomsel-sentiment-analysis',
            title: 'MyTelkomsel Sentiment Analysis',
            description: 'Comparing ML/DL architectures for Indonesian app review sentiment classification.',
            longDescription: 'This project provides a comprehensive sentiment analysis pipeline for MyTelkomsel application reviews scraped from the Google Play Store. It features a robust Indonesian text preprocessing engine and compares three distinct architectural approaches: TF-IDF with Linear SVM, Word2Vec with Random Forest, and a Deep Learning BiLSTM network to identify user sentiment with high accuracy.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Gensim', 'Pandas', 'NumPy', 'google-play-scraper'],
            tools: ['Jupyter Notebook', 'Git LFS', 'VS Code', 'Google Play Store API'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/MyTelkomsel-Sentiment-Insights',
            demoUrl: '#', // Internal Data Tool
            startDate: '2024-03-01',
            role: 'Data Scientist',
            customTimeline: 'Aug - Oct 2025',
            team: 'Personal Project',

            highlights: ['BiLSTM Deep Learning Model', 'Automated Play Store Scraping', 'Indonesian NLP Pipeline'],
            category: 'Data Science',
            features: [
                {
                    title: 'Data Acquisition',
                    items: [
                        '**Automated Scraping**: Direct review extraction from Google Play Store using `google-play-scraper`.',
                        '**Star Rating Mapping**: Automated labeling logic (1-2 stars → Negative, 3 → Neutral, 4-5 → Positive).',
                        '**Indonesian Focus**: Targeted collection logic specifically for the `id:id` locale.'
                    ]
                },
                {
                    title: 'Text Preprocessing',
                    items: [
                        '**Tokenization & Cleaning**: Robust removal of URLs, mentions, hashtags, and whitespace normalization.',
                        '**Indonesian NLP**: Specific normalization rules to handle local slang and formal/informal Indonesian text.',
                        '**Vectorization Pipelines**: Comparative implementation of TF-IDF, Word2Vec, and Keras Tokenizer.'
                    ]
                },
                {
                    title: 'Model Architectures',
                    items: [
                        '**Scheme A (Linear SVM)**: High-speed production model using TF-IDF feature extraction (86.15% accuracy).',
                        '**Scheme B (Random Forest)**: Ensemble learning approach using 200D custom Word2Vec embeddings.',
                        '**Scheme C (BiLSTM)**: State-of-the-art Deep Learning architecture for capturing sequential context (86.82% accuracy).'
                    ]
                },
                {
                    title: 'Analytical Insights',
                    items: [
                        '**Performance Benchmarking**: Detailed F1-score and accuracy comparison across all three model types.',
                        '**CLI Inference Tool**: Cross-platform command-line tool for real-time sentiment prediction.',
                        '**Model Persistence**: Efficient storage and versioning of large `.keras` and `.joblib` files via Git LFS.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Base Setup',
                    code: 'git clone https://github.com/anggitdjoko/MyTelkomsel-Sentiment-Insights.git\ncd mytelkomsel-sentiment-analysis\ngit lfs install\ngit lfs pull\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Data Collection',
                    code: 'python src/scraping/scrape_playstore.py\npython src/prepare_dataset.py',
                    type: 'code'
                },
                {
                    title: 'Inference',
                    code: 'python src/train/inference.py --text "Aplikasi sangat bagus dan membantu!"',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalanced Neutral Sentiment",
                    solution: "Applied custom weights and refined text normalization to improve F1-scores for the neutral class, which is inherently more ambiguous in Indonesian app reviews."
                },
                {
                    problem: "Large Model Storage",
                    solution: "Integrated Git LFS (Large File Storage) to manage model binary persistence while keeping the source repository lightweight and performant."
                },
                {
                    problem: "Casual Language Variance",
                    solution: "Developed a robust preprocessing script to handle Indonesian-specific linguistic nuances, slang, and common typos found in Play Store reviews."
                }
            ]
        },
        {
            id: 'project-16',
            slug: 'neurovision-real-time-detection',
            title: 'NeuroVision (Real-time Detection)',
            description: 'Advanced real-time object detection using YOLOv3 and Darknet-53.',
            longDescription: 'NeuroVision is a high-performance computer vision system that implements real-time object detection using the YOLOv3 (You Only Look Once) algorithm. By leveraging the Darknet-53 backbone and OpenCV\'s DNN module, the platform can simultaneously detect and classify 80 categories of objects from the COCO dataset with massive throughput and minimal latency, even on edge-computing hardware.',

            techStack: ['Python', 'OpenCV', 'YOLOv3', 'Darknet-53', 'NumPy', 'CUDA', 'OpenCL', 'COCO Dataset'],
            tools: ['VS Code', 'Darknet CLI', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/NeuroVision-Smarter-RealTime-Detection',
            demoUrl: '#', // Hardware-dependent live feed
            startDate: '2025-01-01',
            role: 'CV Developer',
            customTimeline: 'Oct 2025',
            team: 'Personal Project',

            highlights: ['Real-time 45+ FPS Detection', 'Multi-scale Object Recognition', 'GPU-Accelerated Inference'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Vision Engine',
                    items: [
                        '**Real-Time Processing**: Ultra-low latency detection logic capable of handling high-resolution webcam feeds.',
                        '**Object Localization**: Precise bounding box generation with adaptive color-coding for 80 distinct classes.',
                        '**Confidence Scoring**: Integrated probability mapping to filter low-confidence detections and ensure visual accuracy.'
                    ]
                },
                {
                    title: 'Architecture Logic',
                    items: [
                        '**Darknet-53 Backbone**: High-accuracy feature extraction using 53 convolutional layers for balanced speed and precision.',
                        '**Feature Pyramid Network (FPN)**: Multi-scale detection heads for identifying small, medium, and large objects simultaneously.',
                        '**Efficient Inference**: Single-pass forward propagation for holistic image analysis in one neural network execution.'
                    ]
                },
                {
                    title: 'Engineering Optimization',
                    items: [
                        '**GPU Acceleration**: Optional integration with CUDA and OpenCL for maximizing FPS on compatible hardware.',
                        '**Threshold Management**: Interactive configuration for Confidence and Non-Maximum Suppression (NMS) thresholds.',
                        '**I/O Versatility**: Support for diverse input sources including built-in webcams, external USB cameras, and RTSP streams.'
                    ]
                },
                {
                    title: 'Live Controls',
                    items: [
                        '**Interactive Commands**: Real-time hotkeys for pausing detection, capturing screenshots, and graceful exit.',
                        '**Performance Benchmarks**: On-screen FPS counters and object counters for real-time system monitoring.',
                        '**Adaptive Resizing**: Intelligent preprocessing pipeline using `dnn.blobFromImage` for standardized model input.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Repository & Env',
                    code: 'git clone https://github.com/anggitdjoko/NeuroVision-Smarter-RealTime-Detection.git\ncd neurovision-real-time-detection\npip install opencv-python numpy',
                    type: 'code'
                },
                {
                    title: 'Model Downloads',
                    code: 'wget https://pjreddie.com/media/files/yolov3.weights\n# Verify yolov3.cfg and coco.names are present',
                    type: 'code'
                },
                {
                    title: 'Launch Vision',
                    code: 'python Vision.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low FPS on CPU Instances",
                    solution: "Implemented frame-skipping logic and resized the input blob to 320x320 to maintain smooth UI interactivity without sacrificing significant detection accuracy."
                },
                {
                    problem: "Overlapping Bounding Boxes",
                    solution: "Fine-tuned the NMS (Non-Maximum Suppression) threshold to 0.4, effectively merging redundant detections for the same object."
                },
                {
                    problem: "Environmental Lighting Noise",
                    solution: "Applied adaptive confidence thresholding to dynamically filter false positives in varying light conditions typical of diverse webcam environments."
                }
            ]
        },
        {
            id: 'project-17',
            slug: 'voices-unheard',
            title: 'Voices Unheard',
            description: 'Secure, anonymous digital sanctuary for conflict-affected story sharing.',
            longDescription: 'Voices Unheard is a mission-critical digital platform designed to provide a safe space for war victims, refugees, and survivors of discrimination to share their stories anonymously. As a System Analyst, I defined the technical architecture to ensure \"Zero Digital Refoulement\"—guaranteeing that no identifiable user data is ever collected or tracked. The platform integrates trauma-informed UI principles with AI-assisted pre-moderation, enabling vulnerable individuals to document their experiences with absolute technical security and emotional support.',

            techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'React.js', 'AI (NLP)', 'TLS 1.3', 'AES-256'],
            tools: ['VS Code', 'Redis', 'UML Design', 'Figma'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Voices-Unheard-ASE',
            demoUrl: '#', // Restricted secure platform
            startDate: '2025-07-01',
            role: 'System Analyst',
            customTimeline: 'July - September 2025',
            team: '5 Developers',

            highlights: ['Secure Managed Anonymity', 'Trauma-Informed UX', 'Zero-Refoulement Architecture'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Anonymous Protection',
                    items: [
                        '**Metadata Cleaning**: Automated removal of EXIF data and GPS coordinates from all uploaded files to protect user location.',
                        '**Zero IP Logging**: Privacy-first logging system that ensures no tracking of user identities or network signatures.',
                        '**Token-based Deletion**: Secure token system allowing users to delete their submissions without requiring a persistent account.'
                    ]
                },
                {
                    title: 'Trauma-Informed UI',
                    items: [
                        '**Quick Exit**: Always-visible emergency exit button that instantly redirects to neutral sites for physical safety.',
                        '**Content Warnings**: Layered consent mechanism requiring users to confirm before viewing potentially triggering media.',
                        '**Empathetic Design**: Minimalist, calming interface designed to reduce cognitive load and secondary trauma for survivors.'
                    ]
                },
                {
                    title: 'AI & Moderation',
                    items: [
                        '**Pre-screening Logic**: AI-driven NLP system that pre-moderates content for hate speech and high-risk triggers.',
                        '**Crisis Escalation**: Automated protocols for identifying crisis situations (suicide threats, etc.) and providing resource lists.',
                        '**Secure Dashboard**: Moderator interface designed for reviewing stories without any access to submitter metadata.'
                    ]
                },
                {
                    title: 'Security Infrastructure',
                    items: [
                        '**End-to-End Encryption**: Mandatory TLS 1.3 for all communications and AES-256 for data encryption at rest.',
                        '**OWASP Compliance**: Hardened backend implementation adhering to top-10 security practices for web applications.',
                        '**PostgreSQL Vault**: Database architecture utilizing at-rest encryption to protect sensitive narrative content.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'System Requirements',
                    code: 'Node.js 18+\nPostgreSQL 13+\nRedis (Session Management)',
                    type: 'code'
                },
                {
                    title: 'Security Configuration',
                    code: 'DATABASE_URL=postgres://...\nENCRYPTION_KEY=aes256_...\nAI_MODERATION_KEY=nlp_...',
                    type: 'code'
                },
                {
                    title: 'Platform Launch',
                    code: 'npm install\nnpm run seed (Optional: Sample AI prompts)\nnpm start',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Survivor Geolocation Risks",
                    solution: "Implemented a server-side interceptor that strips all binary metadata (EXIF/JFIF) from library-level upload requests before the file reaches the database."
                },
                {
                    problem: "AI Moderation Accuracy",
                    solution: "Utilized dual-layer moderation—AI for initial risk classification and human review for nuanced emotional context—ensuring survivors feel heard but not judged."
                },
                {
                    problem: "Quick Exit Latency",
                    solution: "Developed the Emergency Exit as a client-side listener that bypasses standard routing logic for a sub-100ms response time when clicked."
                }
            ]
        },
        {
            id: 'project-18',
            slug: 'smart-motion-detection-system',
            title: 'Smart Motion Detection System',
            description: 'AIoT motion detection using YOLO11-Pose and MQTT for smart home automation.',
            longDescription: 'The Smart Motion Detection System is an advanced IoT solution that leverages YOLO11n pose estimation to detect and analyze human movement patterns in real-time. Unlike traditional motion detectors that rely on simple pixel changes, this system performs sophisticated skeletal analysis (17 keypoints) to distinguish between meaningful human activity and environmental noise. Integrated with EMQX Cloud via secure MQTT, it enables precise automated control of smart home devices like lamps and fans with sub-second latency.',

            techStack: ['Python', 'YOLO11-Pose', 'OpenCV', 'MQTT', 'Raspberry Pi', 'EMQX Cloud'],
            tools: ['VS Code', 'Raspberry Pi 5', 'Mosquitto', 'Git LFS'],
            status: 'completed',
            repoUrl: 'https://github.com/CPS-TelU/AIoT-dmouv2025',
            demoUrl: '#', // Hardware-dependent IoT system
            startDate: '2025-07-01',
            role: 'CV Researcher Intern',
            customTimeline: 'July - September 2025',
            team: 'CPS Research Group',

            highlights: ['Skeletal 17-Keypoint Tracking', 'Secure SSL/TLS MQTT', 'Raspberry Pi 5 Optimization'],
            category: 'IoT & Embedded',
            features: [
                {
                    title: 'Intelligent Motion Analysis',
                    items: [
                        '**Advanced Pose Detection**: YOLO11n-based skeleton tracking with 17 keypoint analysis for human activity recognition.',
                        '**Smart Movement Filtering**: Intelligent algorithms to distinguish between meaningful motion and environmental noise (pets, shadows).',
                        '**Stability Analysis**: Multi-frame pose stability verification using normalized motion calculation independent of frame position.'
                    ]
                },
                {
                    title: 'Smart Device Integration',
                    items: [
                        '**Multi-Device Control**: Automated GPIO-level control for lamps, fans, and relays with precise state management.',
                        '**Operation Modes**: Support for Automatic (motion-based), Manual (remote override), and Scheduled control modes.',
                        '**Intelligent Auto-Off**: Highly configurable delay logic that turns off devices only when sustained inactivity is verified.'
                    ]
                },
                {
                    title: 'IoT Connectivity',
                    items: [
                        '**Secure MQTT Communication**: SSL/TLS encrypted messaging via EMQX Cloud for cross-network device orchestration.',
                        '**Remote Command API**: Standardized JSON topic structure for status updates, sensor events, and remote configuration.',
                        '**Dynamic Updates**: Remote parameter tuning for thresholds and cooldowns without requiring system restarts.'
                    ]
                },
                {
                    title: 'Performance Monitoring',
                    items: [
                        '**Real-time Analytics**: On-screen FPS counters and movement pattern visualizations for system health monitoring.',
                        '**Edge Optimization**: Tailored for Raspberry Pi 5 with buffer management and efficient deque structures for history data.',
                        '**Error Handling**: Comprehensive logging system and automatic MQTT reconnection logic for 24/7 uptime.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Hardware Setup',
                    code: 'Raspberry Pi 5 (4GB recommended)\nUSB Camera (640x480+)\nRelay Modules for GPIO Pin 26 (Lamp) and 19 (Fan)',
                    type: 'code'
                },
                {
                    title: 'Dependencies & Repo',
                    code: 'git clone https://github.com/CPS-TelU/AIoT-dmouv2025\npip install opencv-python ultralytics paho-mqtt',
                    type: 'code'
                },
                {
                    title: 'MQTT Configuration',
                    code: '# Edit MQTTConfig in AIoT-dmouv2025.py\nBROKER = "your-emqx-node.emqxsl.com"\nPORT = 8883 # Use SSL',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Environmental Pixel Flutter",
                    solution: "Moved away from frame-differencing to skeletal pose estimation, ensuring that only validated human keypoint movements trigger device actions."
                },
                {
                    problem: "IoT Latency in Unstable Networks",
                    solution: "Implemented an asynchronous Paho-MQTT client with local state caching, allowing the system to continue local processing during brief connectivity drops."
                },
                {
                    problem: "Hardware Resource Constraints",
                    solution: "Optimized model inference using the YOLO11n-pose variant and limited frame resolution to 640x480, achieving stable 30+ FPS on Raspberry Pi gear."
                }
            ]
        },
        {
            id: 'project-19',
            slug: 'solar-energy-pinn-prediction',
            title: 'Solar Energy PINN Prediction',
            description: 'AI-powered solar energy prediction system integrating Physics-Informed Neural Networks (PINN).',
            longDescription: 'This research-driven project introduces a Physics-Informed Neural Network (PINN) framework for optimizing solar energy prediction in Indonesia. By integrating fundamental solar radiation laws and thermal efficiency equations directly into the neural network\'s loss function, the system overcomes the intermittency challenges of renewable energy and data scarcity. The model achieves an R² of 0.834, significantly outperforming traditional data-only models while maintaining strict adherence to physical conservation laws.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Physics-Informed Neural Network', 'NSRDB API'],
            tools: ['Jupyter Notebook', 'Google Colab', 'Matplotlib', 'Seaborn', 'LaTeX'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Photovoltaic-Physics-Informed-Neural-Network',
            demoUrl: '#', // Research-based model
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July - August 2025',
            team: '3 Developers',

            highlights: ['Physics-Loss Integration', '25% RMSE Improvement', 'National Energy Research'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Physics-Driven AI',
                    items: [
                        '**Hukum Fisika Terintegrasi**: Penggabungan persamaan radiasi matahari (G_eff) dan efisiensi termal panel ke dalam arsitektur AI.',
                        '**Smart Loss Function**: Desain custom loss function yang mengombinasikan data loss dengan physics residuals (Conseravation Laws).',
                        '**Auto-Differentiation**: Optimasi gradient berbasis automatic differentiation untuk pemenuhan hukum fisika yang presisi.'
                    ]
                },
                {
                    title: 'Advanced PINN Architecture',
                    items: [
                        '**Progressive Reduction**: Arsitektur neural network 5-layer dengan 8,673 parameter untuk ekstraksi fitur yang optimal.',
                        '**Physics Continuity**: Implementasi lambda weighting (λ=0.1) untuk menyeimbangkan pembelajaran dari data empiris dan teori fisika.',
                        '**Robust Generalization**: Kemampuan prediksi yang tetap akurat bahkan pada dataset terbatas melalui physics-guided learning.'
                    ]
                },
                {
                    title: 'Data & API Integration',
                    items: [
                        '**NREL NSRDB API**: Integrasi otomatis dengan National Solar Radiation Database untuk akuisisi data cuaca presisi tinggi.',
                        '**Nusantara Coverage**: Pengambilan data berbasis koordinat (Lat/Lon) untuk berbagai titik strategis PLTS di Indonesia.',
                        '**Automated Cleaning**: Pipeline preprocessing untuk outlier detection dan normalisasi data radiasi matahari secara real-time.'
                    ]
                },
                {
                    title: 'Predictive Analytics',
                    items: [
                        '**Scenario Analysis**: Simulasi output energi pada 6 variasi skenario cuaca ekstrim (Rainy vs Dry season).',
                        '**Metric Evaluation**: Pengujian performa mendalam menggunakan MAE, RMSE, dan R² dibandingkan dengan model baseline.',
                        '**SHAP Analysis**: Interpretasi model untuk memahami variabel cuaca paling berpengaruh terhadap fluktuasi energi.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone https://github.com/anggitdjoko/Photovoltaic-Physics-Informed-Neural-Network.git\npip install tensorflow pandas scikit-learn matplotlib',
                    type: 'code'
                },
                {
                    title: 'NREL API Hook',
                    code: '# Get key from developer.nrel.gov\napi_key = "YOUR_NREL_API_KEY"\nlat, lon = -1.93, 125.50',
                    type: 'code'
                },
                {
                    title: 'Model Execution',
                    code: 'python PINN.py\n# Generates predictions vs actuals with physics constraints',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermittency Energi Surya",
                    solution: "Mengintegrasikan model temperatur panel (T_cell) ke dalam jaringan saraf untuk memprediksi penurunan efisiensi akibat panas secara fisik."
                },
                {
                    problem: "Data Historis Berkualitas Terbatas",
                    solution: "PINN menggunakan hukum fisika sebagai regularizer, memungkinkan training model yang robust dengan jumlah data yang lebih sedikit dibandingkan deep learning standar."
                },
                {
                    problem: "Kompleksitas Custom Loss",
                    solution: "Menggunakan TensorFlow GradientTape untuk menghitung derivatif parsial dari persamaan fisika selama proses backpropagation."
                }
            ]
        },
        {
            id: 'project-20',
            slug: 'credit-risk-analysis-lstm',
            title: 'Credit Risk Analysis LSTM',
            description: 'High-precision loan default prediction using stacked LSTM layers and sequential financial modeling.',
            longDescription: 'This project focuses on predicting credit risk using Long Short-Term Memory (LSTM), a variant of Recurrent Neural Networks (RNNs) optimized for financial sequential data. By capturing long-term temporal dependencies in credit history and financial behavior, the system identifies high-risk loan applicants with significantly higher accuracy than traditional linear models. The analysis incorporates business-critical metrics such as Default Capture Rate and Approval Rate to maximize institutional profitability.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'Scikit-learn', 'SMOTE'],
            tools: ['Jupyter Notebook', 'Hugging Face Spaces', 'Pandas', 'Seaborn', 'SMOTE'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/CreditRisk_Analysis',
            demoUrl: 'https://huggingface.co/spaces/Alfazril/CreditRisk_Analysis',
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July 2025',
            team: '3 Developers',

            highlights: ['Stacked LSTM Neural Network', 'SMOTE Imbalance Handling', 'Financial ROI Analysis'],
            category: 'Data Science',
            features: [
                {
                    title: 'Sequential Model Architecture',
                    items: [
                        '**LSTM Layers**: Stacked Long Short-Term Memory layers to capture complex temporal patterns in debt behavior.',
                        '**Dropout Optimization**: Integrated dropout layers to prevent overfitting on specific credit profiles.',
                        '**Binary Optimization**: Sigmoid activation output with Adam optimizer and binary cross-entropy loss function.'
                    ]
                },
                {
                    title: 'Financial Data Preprocessing',
                    items: [
                        '**3D Reshaping**: Data transformation into `[samples, timesteps, features]` format for deep learning sequential input.',
                        '**SMOTE Sampling**: Implementation of Synthetic Minority Over-sampling to balance default vs. non-default cases.',
                        '**Feature Scaling**: Numerical normalization and categorical encoding for employment and loan-type stability.'
                    ]
                },
                {
                    title: 'Risk & ROI Analytics',
                    items: [
                        '**Profitability Analysis**: Comparative study on ROI/cost savings from avoiding defaults vs baseline approval rates.',
                        '**Risk Segmentation**: Automatic classification of applicants into Low, Medium, and High-risk tiers based on probability scores.',
                        '**Advanced AUC Tuning**: Hyperparameter tuning via GridSearchCV to maximize Default Capture Rate.'
                    ]
                },
                {
                    title: 'Comprehensive Evaluation',
                    items: [
                        '**Default Capture Rate**: Measuring the exact proportion of actual defaults identified by the model.',
                        '**Business Metrics**: Evaluating model impact via Approval Rate vs institutional Risk Appetite.',
                        '**Interactive Visualization**: Deployment on Hugging Face Spaces for real-time model interaction and prediction testing.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Model Environment',
                    code: 'git clone https://github.com/anggitdjoko/CreditRisk_Analysis\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Preprocessing Data',
                    code: '# Data must be reshaped for LSTM\nX_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))',
                    type: 'code'
                },
                {
                    title: 'Training & Eval',
                    code: 'python train_lstm.py\n# Outputs Accuracy, Precision, Recall, and AUC metrics',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalance Financial Datasets",
                    solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to ensure the LSTM model learns to identify rare default events as effectively as frequent low-risk ones."
                },
                {
                    problem: "Vanishing Gradient in Deep RNNs",
                    solution: "Utilized LSTM gates (Input, Forget, Output) to maintain long-term memory gradients, essential for capturing years of credit history."
                },
                {
                    problem: "Overfitting on Loan Profiles",
                    solution: "Implemented early stopping and dropout strategies to ensure the model generalizes across diverse demographic and financial sectors."
                }
            ]
        },
        {
            id: 'project-21',
            slug: 'hand-gesture-recognition',
            title: 'Hand Gesture Recognition',
            description: 'Real-time hand tracking and skeletal landmark detection using MediaPipe and OpenCV.',
            longDescription: 'Hand Gesture Recognition is a high-performance computer vision system that utilizes MediaPipe’s Hands solution for robust, real-time hand landmark detection. By extracting 21 coordinate points from a video stream, the system performs dynamic finger counting and gesture analysis. This project serves as a foundational framework for human-computer interaction (HCI), enabling non-contact control systems for various software applications with high skeletal stability.',

            techStack: ['Python', 'MediaPipe', 'OpenCV'],
            tools: ['VS Code', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Hand-Gesture-Recognition',
            demoUrl: '#', // Desktop CV application
            startDate: '2024-12-01',
            role: 'CV Developer',
            customTimeline: 'December 2024',
            team: 'Personal Project',

            highlights: ['MediaPipe Hands Integration', 'Real-time 21-Landmark Tracking', 'Dynamic Finger Counting'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Real-Time Hand Tracking',
                    items: [
                        '**MediaPipe Hands Integration**: Leveraging Google’s sophisticated machine learning pipeline for sub-millisecond hand tracking.',
                        '**21-Landmark Detection**: Accurate extraction of 21 key coordinate points representing joints and fingertips in 3D space.',
                        '**Static/Dynamic Mode Support**: Configurable landmark detection that works for both single frames and high-speed video streams.'
                    ]
                },
                {
                    title: 'Gesture Recognition Logic',
                    items: [
                        '**Dynamic Finger Counting**: Custom algorithms to count raised fingers by comparing tip positions with joint landmarks (MCP/PIP).',
                        '**Coordinate Analysis**: Real-time calculation of Euclidean distances between landmarks for gesture classification.',
                        '**Stability Filtering**: Signal smoothing to ensure counting accuracy even with minor hand tremors or sensor noise.'
                    ]
                },
                {
                    title: 'Cross-Platform Architecture',
                    items: [
                        '**OpenCV Integration**: Robust video processing and frame visualization with real-time landmark rendering.',
                        '**Low Hardware Overhead**: Optimized for standard laptop webcams without requiring dedicated GPU acceleration.',
                        '**Modular Code Structure**: Decoupled AI tracking logic from UI rendering for easy integration into larger projects.'
                    ]
                },
                {
                    title: 'Interactive UI & Output',
                    items: [
                        '**Live Landmark Rendering**: Real-time projection of skeletal joint maps onto the video feed for user feedback.',
                        '**Real-time Event Logging**: Instant detection feedback via console logs and on-screen text overlays.',
                        '**Customizable Gestures**: Extensible architecture that allows adding new symbolic recognitions (peace signs, thumbs up).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment & Setup',
                    code: 'git clone https://github.com/anggitdjoko/Hand-Gesture-Recognition.git\npython -m venv HandTracking-env',
                    type: 'code'
                },
                {
                    title: 'Dependency Install',
                    code: 'HandTracking-env\\Scripts\\Activate\npip install opencv-python mediapipe',
                    type: 'code'
                },
                {
                    title: 'Run AI Application',
                    code: 'python HandsTrackingAI.py\n# Press "q" to exit camera feed',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low Lighting Conditions",
                    solution: "Adjusted MediaPipe's min_detection_confidence threshold and applied OpenCV histogram equalization to improve landmark stability in dark environments."
                },
                {
                    problem: "Hand-to-Camera Distance Variance",
                    solution: "Normalized landmark coordinates relative to the palm center, ensuring finger counting logic remains accurate regardless of how close the hand is to the camera."
                },
                {
                    problem: "Frame Rate Latency",
                    solution: "Optimized frame processing by disabling static_image_mode during streaming, allowing the system to use temporal information for faster tracking."
                }
            ]
        },
        {
            id: 'project-22',
            slug: 'data-analyst-dashboard',
            title: 'Data Analyst Dashboard',
            description: 'Interactive analytics tool for e-commerce data exploration using Dash and Plotly.',
            longDescription: 'The Data Analyst Dashboard is a comprehensive, interactive analytic platform designed to streamline e-commerce data exploration. Built with Python and Streamlit, it allows analysts to move beyond static reports by providing real-time data filtering, dynamic chart generation (bar, line, pie), and automated summary statistics. The system features a robust preprocessing pipeline for handling missing data and outliers, ensuring that decision-makers have access to high-quality insights on sales performance and product category trends.',

            techStack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy', 'Dash'],
            tools: ['VS Code', 'Jupyter Notebook', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/anggitdjoko/Data-Analyst-Dashboard',
            demoUrl: '#', // Desktop/Server application
            startDate: '2024-07-01',
            role: 'Data Analyst',
            customTimeline: 'July - August 2024',
            team: 'Personal Project',

            highlights: ['Interactive Real-time Visuals', 'Automated Data Preprocessing', 'E-commerce Trends Analysis'],
            category: 'Data Science',
            features: [
                {
                    title: 'Interactive Data Exploration',
                    items: [
                        '**Dynamic Chart Generation**: Real-time rendering of bar, line, and pie charts based on multi-variable user selections.',
                        '**Drill-down Analytics**: Ability to focus on specific time periods or product categories with instant visual feedback.',
                        '**Metric Customization**: Dynamic dashboard layout that adjusts according to the selected Key Performance Indicators (KPIs).'
                    ]
                },
                {
                    title: 'Data Filtering & Manipulation',
                    items: [
                        '**Smart Preprocessing**: Automated handling of missing values, duplicate entries, and data type transformations.',
                        '**Advanced Filtering**: Multi-layered filters for product categories, price ranges, and sales dates.',
                        '**Outlier Detection**: Integrated statistical methods to identify and isolate anomalies in e-commerce transaction data.'
                    ]
                },
                {
                    title: 'Customizable Dashboards',
                    items: [
                        '**Modular UI Layout**: Flexible dashboard design using Streamlit containers for a clean and professional analytics interface.',
                        '**Real-time State Management**: Instant synchronization between dropdown selections and data visualization components.',
                        '**Export Capabilities**: One-click functionality to export processed data and summary statistics for offline reporting.'
                    ]
                },
                {
                    title: 'E-Commerce Deep-Dive',
                    items: [
                        '**Sales Trend Analysis**: Visualizing historical sales growth and forecasting potential seasonal patterns.',
                        '**Category Performance**: Deep-dive into product category rankings based on volume, revenue, and profit margins.',
                        '**Reader Profiling**: (In context of related projects) Identifying high-value segments and customer behavior archetypes.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Environment',
                    code: 'git clone https://github.com/anggitdjoko/Data-Analyst-Dashboard.git\ncd Data-Analyst-Dashboard',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install pandas streamlit plotly dash numpy',
                    type: 'code'
                },
                {
                    title: 'Launch Dashboard',
                    code: 'streamlit run Dashboard/EcomersDashboard.py\n# Access at http://localhost:8501',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling Large Unstructured Datasets",
                    solution: "Developed a robust Pandas-based cleaning pipeline that standardizes data formats and handles null values before they reach the visualization layer."
                },
                {
                    problem: "Real-time UI Responsiveness",
                    solution: "Leveraged Streamlit caching (`@st.cache_data`) to ensure that heavy data processing operations only run when the underlying dataset changes."
                },
                {
                    problem: "Visualization Over-cluttering",
                    solution: "Implemented hierarchical filtering (Category -> Sub-category) to keep visualizations focused and easy to interpret for non-technical stakeholders."
                }
            ]
        },
        {
            id: 'project-23',
            slug: 'restaurant-sales-analytics',
            title: 'Restaurant Sales & Menu Analytics',
            description: 'Full exploratory data analysis on restaurant transactions: best/worst selling menu items, peak hours, payment methods, sales channels, daily trends.',
            longDescription: 'Full exploratory data analysis on restaurant transactions: best and worst selling menu items, peak hours, payment methods, sales channels, daily trends, and customer behavior analysis for PT Jar Andalan Rasa.',

            techStack: ['Python', 'Excel', 'EDA', 'Data Visualization'],
            tools: ['Excel', 'Python', 'Jupyter Notebook'],
            status: 'completed',
            repoUrl: null,
            demoUrl: '#',
            startDate: '2025-01-01',
            role: 'Data Analyst',
            customTimeline: '2025',
            team: 'Freelance',

            highlights: ['7.4K Records', 'Rp 164.8M Net Sales', '2,254 Transactions'],
            category: 'Data Analytics',
            features: [
                {
                    title: 'Analysis Scope',
                    items: [
                        '**Menu Performance**: Best and worst selling menu items with revenue contribution analysis.',
                        '**Peak Hours Analysis**: Transaction volume patterns throughout the day and week.',
                        '**Payment Methods**: Distribution of cash, QRIS, and digital wallet transactions.',
                        '**Sales Channels**: Dine-in vs delivery platform comparison (GoFood, GrabFood).',
                    ]
                },
                {
                    title: 'Key Impact',
                    items: [
                        '**Revenue Opportunity**: Quantified Rp 30-50M annual revenue opportunity from underutilized GoFood/GrabFood channels (only 2.8% of current sales).',
                        '**Customer Behavior**: Identified ordering patterns and preferences for menu optimization.',
                    ]
                },
            ],
            challengesAndSolutions: [
                {
                    problem: "Underutilized Delivery Channels",
                    solution: "Quantified Rp 30-50M annual revenue opportunity from GoFood/GrabFood channels contributing only 2.8% of current sales."
                }
            ]
        },
        {
            id: 'project-24',
            slug: 'lpg-distribution-analysis',
            title: 'LPG 3Kg Distribution Analysis 2023-2024',
            description: 'Comprehensive 2-year analysis of LPG distribution: baseline establishment, YoY growth tracking, government policy impact analysis.',
            longDescription: 'Comprehensive 2-year analysis: from establishing the 2023 baseline (31,459 txn) to tracking +19.9% YoY growth in 2024 (37,723 txn). Analyzed government policy impact on Household vs SME segmentation and adaptive distribution strategies for Pangkalan Gas Joeherman.',

            techStack: ['Excel', 'SQL', 'Tableau', 'YoY Analysis', 'Demand Analysis'],
            tools: ['Excel', 'Tableau', 'SQL'],
            status: 'completed',
            repoUrl: null,
            demoUrl: '#',
            startDate: '2023-01-01',
            role: 'Data Analyst',
            customTimeline: '2023 - 2024',
            team: 'Freelance',

            highlights: ['69.2K Transactions', '+19.9% YoY Growth', 'Rp 207.5M Combined Profit'],
            category: 'Data Analytics',
            features: [
                {
                    title: 'Analysis Scope',
                    items: [
                        '**2-Year Trend Analysis**: Baseline 2023 (31,459 txn) to 2024 (37,723 txn) with +19.9% YoY growth.',
                        '**Segmentation**: Household vs SME distribution patterns and government policy impact.',
                        '**Profit Tracking**: Documented +18.9% profit increase YoY (Rp 94.3M to Rp 113.2M).',
                    ]
                },
                {
                    title: 'Key Impact',
                    items: [
                        '**Growth Documentation**: 69,182 transactions analyzed over 2 years.',
                        '**Policy Analysis**: Government policy impact on distribution strategies.',
                    ]
                },
            ],
            challengesAndSolutions: [
                {
                    problem: "Government Policy Impact",
                    solution: "Analyzed policy changes affecting Household vs SME segmentation and developed adaptive distribution strategies."
                }
            ]
        },
        {
            id: 'project-25',
            slug: 'kobelco-spare-parts-analytics',
            title: 'Spare Parts Sales & Inventory Analytics',
            description: 'Analyzed 7,153 spare parts transactions worth Rp 17.6 Billion for KOBELCO heavy machinery.',
            longDescription: 'Analyzed 7,153 spare parts transactions worth Rp 17.6 Billion. Evaluated sales trends, customer concentration, fast-moving items, material group performance, and inventory optimization for KOBELCO heavy machinery at PT DKCMI.',

            techStack: ['Excel', 'Tableau', 'WMS', 'Inventory Analysis'],
            tools: ['Excel', 'Tableau', 'WMS'],
            status: 'completed',
            repoUrl: null,
            demoUrl: '#',
            startDate: '2023-01-01',
            role: 'Logistics Analyst',
            customTimeline: 'Jan - Sep 2023',
            team: 'PT DKCMI (KOBELCO)',

            highlights: ['7,153 Transactions', 'Rp 17.6B Total Sales', '319 Unique Parts'],
            category: 'Data Analytics',
            features: [
                {
                    title: 'Analysis Scope',
                    items: [
                        '**Transaction Analysis**: 7,153 spare parts transactions worth Rp 17.6 Billion.',
                        '**Inventory Optimization**: ABC analysis to classify fast-moving items for 319 unique parts.',
                        '**Sales Trends**: Customer concentration and material group performance evaluation.',
                    ]
                },
                {
                    title: 'Key Impact',
                    items: [
                        '**Stock-out Reduction**: Contributed to 20% stock-out reduction through predictive reorder analysis.',
                        '**Management Reporting**: Weekly performance reports and dashboards for decision-making.',
                    ]
                },
            ],
            challengesAndSolutions: [
                {
                    problem: "Inventory Stock-outs",
                    solution: "Implemented ABC analysis to classify fast-moving items, reducing stock-outs by 20% through predictive reorder analysis on Rp 17.6B inventory."
                }
            ]
        }
    ],
    experiences: [
        // 1. CURRENT ROLES (from CV)
        {
            id: 'prof-0a',
            company: 'Independent',
            position: 'Full-Stack Developer',
            description: 'Building web applications and SaaS platforms with modern tech stack.',
            responsibilities: [
                'Building Servgo, a SaaS platform combining POS, digital storefront, and analytics for cafés & restaurants. Live, serving 2 outlets.',
                'End-to-end product development: database design (31 tables), authentication, payments, real-time dashboards, multi-tenant architecture.',
                'Stack: Next.js 14, React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, Vercel.',
                'Open to new web app, SaaS, and automation projects.',
            ],
            skills: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
            startDate: '2024-01-01',
            endDate: null,
            isOngoing: true,
            location: 'Remote',
            type: 'freelance',
            logo: null,
            externalLink: 'https://github.com/anggitdjoko',
        },
        {
            id: 'prof-0b',
            company: 'Independent',
            position: 'Freelance Data Analyst',
            description: 'End-to-end data analysis projects for clients across F&B, logistics, and distribution industries.',
            responsibilities: [
                'Conduct end-to-end data analysis projects for clients across F&B, logistics, and distribution industries.',
                'Build interactive dashboards and visualizations using Tableau and Python to present actionable insights.',
                'Deliver comprehensive analytical reports covering sales trends, customer segmentation, and operational optimization.',
            ],
            skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Data Visualization', 'Pandas'],
            startDate: '2024-01-01',
            endDate: null,
            isOngoing: true,
            location: 'Remote',
            type: 'freelance',
            logo: null,
            externalLink: null,
        },
        {
            id: 'prof-0c',
            company: 'PT DKCMI (KOBELCO)',
            position: 'Logistics Analyst',
            description: 'Analyzed 7,153 spare parts transactions worth Rp 17.6 Billion using Excel, SQL, and Tableau.',
            responsibilities: [
                'Analyzed 7,153 spare parts transactions worth Rp 17.6 Billion using Excel, SQL, and Tableau.',
                'Managed Warehouse Management System (WMS) and optimized inventory levels for 319 unique parts.',
                'Implemented ABC analysis to classify fast-moving items, reducing stock-outs by 20%.',
                'Created weekly performance reports and dashboards for management decision-making.',
            ],
            skills: ['Excel', 'SQL', 'Tableau', 'WMS', 'Inventory Analysis', 'ABC Analysis'],
            startDate: '2023-01-01',
            endDate: '2023-09-01',
            isOngoing: false,
            location: 'Pontianak',
            type: 'contract',
            logo: null,
            externalLink: null,
        },
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Politeknik Negeri Pontianak',
            degree: 'Diploma',
            major: 'Information Technology',
            startDate: '2021-08-01',
            isOngoing: false,
            endDate: '2024-06-30',
            gpa: null,
            activities: [],
            achievements: [],
        },
    ],
    achievements: [
        {
            id: 'ach-1',
            title: 'Top 15/90 - Data Mining ADIKARA 2024',
            issuer: 'Telkom University',
            date: '2024-10-01',
            description: 'Achieved top 15 ranking in data mining competition, applying advanced ML models to complex datasets.',
            category: 'award',
        },
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Politeknik Negeri Pontianak',
            degree: 'Diploma',
            major: 'Information Technology',
            startDate: '2021-08-01',
            isOngoing: false,
            endDate: '2024-06-30',
            gpa: null,
            activities: [],
            achievements: [],
        },
    ],
    achievements: [
        {
            id: 'ach-1',
            title: 'Top 15/90 - Data Mining ADIKARA 2024',
            issuer: 'Telkom University',
            date: '2024-10-01',
            description: 'Achieved top 15 ranking in data mining competition, applying advanced ML models to complex datasets.',
            category: 'award',
        },
    ],
};
