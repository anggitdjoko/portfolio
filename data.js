// Portfolio content data for Anggit Djoko Wibowo
window.PORTFOLIO = {
  name: "Anggit Djoko Wibowo",
  role: "Software Engineer",
  tagline: "I build web apps and software products, from the first idea to real users.",
  location: "Indonesia · Remote",
  availability: "Open to full-time roles, freelance & collabs",
  languages: "Indonesian (Native) · English (Professional)",
  email: "anggitdjokow00@gmail.com",
  phone: "+62 813 5033 8618",
  whatsapp: "https://wa.me/6281350338618",
  github: "https://github.com/anggitdjoko",
  linkedin: "https://linkedin.com/in/anggitdjoko",

  // Professional proficiency tiers (no self-rated percentages)
  skills: [
    { name: "Next.js / React", tier: "Expert" },
    { name: "TypeScript / JavaScript", tier: "Expert" },
    { name: "Node.js", tier: "Advanced" },
    { name: "Supabase / PostgreSQL", tier: "Advanced" },
    { name: "Tailwind CSS", tier: "Advanced" },
    { name: "REST & API Design", tier: "Advanced" },
    { name: "Vercel / Edge Functions", tier: "Proficient" },
    { name: "Data Analysis & Dashboards", tier: "Proficient" }
  ],

  // Real work history (from LinkedIn)
  experience: [
    {
      period: "Nov 2025 - Present",
      role: "Software Engineer",
      org: "Independent · Freelance · Remote",
      desc: "Building web applications and software products end to end. My main project right now is Servgo, a POS and digital storefront platform for F&B businesses that's live in 2 locations with real daily transactions.",
      tech: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"]
    },
    {
      period: "Sep 2022 - Sep 2025",
      role: "Store Assistant & Data Support",
      org: "Pangkalan Gas 3kg Joeherman · Kubu Raya",
      desc: "Managed daily transaction records, checked that payments added up, kept an eye on stock discrepancies, and documented sales and inventory patterns for reporting and internal audits. This is the data work that eventually pulled me into software.",
      tech: ["Data Verification", "Reporting", "Inventory"]
    },
    {
      period: "Aug 2023 - Apr 2024",
      role: "Warehouse & Data Reporting",
      org: "PT Daya Kobelco Construction Machinery Indonesia · Pontianak",
      desc: "Validated delivery orders and stock positions to reduce data discrepancies, prepared operational reports on fuel, storage and maintenance spend, and improved picking-workflow efficiency across cross-functional teams.",
      tech: ["Data Reporting", "SOP", "Logistics"]
    },
    {
      period: "May 2024 - Jun 2024",
      role: "Field Data Collector & Research Assistant",
      org: "Untan × Stanford University Research Collaboration",
      desc: "Collected and validated peatland field data (water quality, wind speed) with strict scientific methodology, cleaned datasets for researchers, and flagged measurement anomalies for resolution.",
      tech: ["Data Collection", "Data Cleaning", "QA"]
    },
    {
      period: "May 2023 - Jun 2023",
      role: "Project Assistant",
      org: "PT Permata Sawit Mandiri · Sandai",
      desc: "Collected environmental quality data (water, air, soil) for impact evaluations, documented sampling results and field conditions, and prepared summary reports and recommendations.",
      tech: ["Environmental Data", "Reporting"]
    },
    {
      period: "Apr 2023 - May 2023",
      role: "Project Assistant",
      org: "Stanford University · Remote",
      desc: "Conducted peat-water sampling and recorded measurement data for chemical analysis, ensuring data quality through filtering and verification before submission.",
      tech: ["Sampling", "Data Quality"]
    },
    {
      period: "Oct 2022 - Nov 2022",
      role: "Project Assistant",
      org: "Universitas Tanjungpura · Pontianak",
      desc: "Performed groundwater data collection using standardized procedures and organized labeled datasets for university research teams.",
      tech: ["Data Collection", "Documentation"]
    }
  ],

  // Real projects
  projects: [
    {
      category: "Web App",
      title: "Servgo, POS and digital storefront",
      desc: "A point of sale and storefront platform for cafes and restaurants. Cashier with dine in, take away and delivery, five payment methods, kitchen display, ingredient level inventory, customer loyalty, six analytics tabs, and multi outlet switching. Each merchant also gets a public storefront with a QR menu. Running in 2 outlets with real daily transactions.",
      tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel", "PWA"],
      video: "assets/video/servgo-demo.mp4",
      loop: "assets/video/servgo-hook.mp4",
      poster: "assets/video/servgo-poster.jpg",
      reelLabel: "Product demo · 81s"
    },
    {
      category: "Full-Stack",
      title: "GearGrid, equipment mapping and maintenance",
      desc: "Equipment mapping and maintenance app with interactive floor plans. Locate assets, view equipment details, manage corrective maintenance tickets and technician assignments, plan preventive maintenance by zone, and record inspection results. Includes maintenance history and dashboards for tracking inspection progress and ticket status.",
      tech: ["PHP 8.3", "SQLite", "JavaScript", "Canvas / DXF", "AES-256", "RBAC"],
      video: "assets/video/geargrid-demo.mp4",
      poster: "assets/video/geargrid-poster.jpg",
      reelLabel: "Product demo · 70s"
    },
    {
      category: "Full-Stack",
      title: "HK Farm, agri investment management",
      desc: "Investment platform for agricultural land. Thirteen modules, two roles, land mapping on Leaflet, per project ROI, IDR reporting, and an audit log over every change.",
      tech: ["React", "Vite", "JavaScript", "Leaflet", "Chart.js", "RBAC"],
      video: "assets/video/hkfarm-demo.mp4",
      loop: "assets/video/hkfarm-hook.mp4",
      poster: "assets/video/hkfarm-poster.jpg",
      reelLabel: "Product demo · 101s"
    },
    {
      category: "Full-Stack",
      title: "SIMRS Rumkit KTP, hospital management system",
      desc: "Hospital information system with a separate workspace for every role: administrator, receptionist, nurse, doctor, pharmacist and patient. Covers the activity dashboard, appointment and front desk worklists, vital sign entry, patient record search, medicine inventory with a drug interaction check, and a patient portal for booking appointments and keeping personal health notes.",
      tech: ["Laravel 13", "Vue 3", "TypeScript", "Tailwind CSS", "MySQL", "Flutter"],
      video: "assets/video/simrs-demo.mp4",
      loop: "assets/video/simrs-hook.mp4",
      poster: "assets/video/simrs-poster.jpg",
      reelLabel: "Product demo · 70s"
    },
    {
      category: "Web",
      title: "This Portfolio",
      desc: "Cinematic single-page developer portfolio with a Three.js particle universe that converges into one glowing sphere on scroll.",
      tech: ["Three.js", "GSAP", "JavaScript"],
      demo: "https://anggitdjoko.github.io/portfolio/"
    },
    {
      category: "Data",
      title: "Data Reporting Dashboards",
      desc: "Analytics dashboards built from real transaction data across three companies in LPG distribution, heavy equipment, and F&B. Covers revenue breakdowns, customer concentration, top-product analysis, and demand forecasting.",
      tech: ["Data Analysis", "Dashboards", "SQL"],
      demo: "data.html"
    }
  ]
};
