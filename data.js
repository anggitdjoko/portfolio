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
      title: "Servgo",
      desc: "POS and digital storefront platform for cafes and restaurants. It's live in 2 outlets with real daily transactions, handling orders, menu and storefront end to end.",
      tech: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
      demo: "https://servgo.vercel.app"
    },
    {
      category: "Web",
      title: "This Portfolio",
      desc: "Cinematic single-page developer portfolio with a Three.js particle universe that converges into one glowing sphere on scroll.",
      tech: ["Three.js", "GSAP", "JavaScript"],
      code: "https://github.com/anggitdjoko/portfolio",
      demo: "https://anggitdjoko.github.io/portfolio/"
    },
    {
      category: "Data",
      title: "Data Reporting Dashboards",
      desc: "Analytics dashboards built from real transaction data across three companies in LPG distribution, heavy equipment, and F&B. Covers revenue breakdowns, customer concentration, top-product analysis, and year-over-year growth.",
      tech: ["Data Analysis", "Dashboards", "SQL"],
      demo: "data.html"
    }
  ]
};
