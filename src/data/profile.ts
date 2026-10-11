/**
 * Single source of truth for portfolio content.
 * Every claim here is expected to be verifiable against this repo,
 * the owner's GitHub, or the owner directly.
 */

export const profile = {
  name: "Sane Lakshmidhar Reddy",
  firstName: "SANE",
  lastName: "LAKSHMIDHAR REDDY",
  roles: ["AI ENGINEER", "FULL STACK DEVELOPER", "AI BUILDER"],
  // Supporting identity — interests/interests-framed, not title claims
  supportingIdentity: [
    "AI Research Explorer",
    "Generative AI Explorer",
    "AGI Explorer",
  ],
  tagline:
    "Building intelligent systems, AI-powered applications, full-stack products and immersive digital experiences.",
  explorationLine:
    "Exploring Artificial Intelligence, Generative AI, AGI and the future of Superintelligence.",
  mission:
    "I build, experiment and learn at the intersection of Artificial Intelligence, Software Development and interactive digital experiences.",
  location: "Chennai, Tamil Nadu, India",
  email: "sanelakshmidharreddy@gmail.com",
  phone: "+91 83282 87227",
  github: "https://github.com/sanelakshmidharreddy",
  linkedin: "https://www.linkedin.com/in/sanelakshmidhar-reddy-943b62318/",
  status: "OPEN TO INTERNSHIPS & COLLABORATION",
  education: {
    degree: "B.Tech Computer Science & Engineering (Data Science)",
    institution: "Dr. M.G.R. Educational and Research Institute, Chennai",
    years: "2024 – 2028",
    current: "3rd Year",
    cgpa: "9.45 / 10",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const currentlyExploring = [
  "Artificial Intelligence",
  "Generative AI",
  "AI Agents",
  "AGI — Artificial General Intelligence",
  "Superintelligence",
  "Machine Learning",
  "Voice AI",
  "AI Application Development",
  "3D Web Experiences",
  "Full Stack Development",
  "Automation",
  "AI Research",
];

/** Framing note — AGI/ASI are research *interests*, never claimed achievements. */
export const exploringNote =
  "Exploring AGI, Artificial Superintelligence and the future of intelligent systems — researching emerging directions in autonomous AI.";

/** LEARN → BUILD → EXPERIMENT → IMPROVE → SHARE */
export const approachSteps = [
  { step: "LEARN", note: "Study deeply before building" },
  { step: "BUILD", note: "Turn ideas into working software" },
  { step: "EXPERIMENT", note: "Test, break, refine" },
  { step: "IMPROVE", note: "Iterate toward quality" },
  { step: "SHARE", note: "Publish and learn out loud" },
];

export const experience = [
  {
    role: "Machine Learning Intern",
    org: "ML DLK Solutions",
    period: "April 2026 – May 2026",
    type: "Internship",
    summary:
      "Developed and worked with machine learning solutions using Python for prediction and classification tasks.",
    points: [
      "Data preprocessing, cleaning and dataset preparation",
      "Feature engineering and model training",
      "Model evaluation and performance metrics",
      "Pandas, NumPy, Matplotlib workflows",
      "Analytical problem solving",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    org: "Future Interns",
    period: "September 2025 – December 2025",
    type: "Internship",
    summary:
      "Built and shipped full-stack web features as part of the FS-01 internship program.",
    points: [
      "Web application development — frontend and backend integration",
      "Database-connected features",
      "Testing, debugging and application reliability",
      "Git and GitHub workflows",
    ],
  },
  {
    role: "Independent Development",
    org: "Elite Web Creations",
    period: "Ongoing · Project-based",
    type: "Independent",
    summary:
      "Built and delivered practical websites for real-world local businesses and service providers — presented as independent, project-based development, not formal employment.",
    points: [
      "Healthcare and beauty business websites",
      "Government-service websites",
      "Responsive interfaces and business UX",
      "WhatsApp and Google Maps integrations",
      "Mobile-responsive design",
    ],
  },
];

export interface FeaturedProject {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  bullets: string[];
  tech: string[];
  github?: string;
  live?: string;
  video?: string;
  accent: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "ultron",
    index: "01",
    title: "U.L.T.R.O.N.",
    subtitle: "Voice-First AI Assistant",
    category: "Voice AI",
    description:
      "A voice-first personal AI assistant designed for hands-free interaction, automation, intelligent desktop workflows, browser control and web-assisted tasks.",
    bullets: [
      "Real-time voice interaction and speech processing",
      "Intelligent intent routing and multi-turn interaction",
      "Desktop automation and browser control",
      "Web intelligence and memory/action tracking",
      "AI responses via API integration",
    ],
    tech: ["Python", "AI APIs", "Voice AI", "NLP", "Automation"],
    github: "https://github.com/sanelakshmidharreddy",
    accent: "from-emerald-400/25 via-teal-500/10 to-transparent",
  },
  {
    id: "nexus",
    index: "02",
    title: "NEXUS",
    subtitle: "AI Developer Orchestrator",
    category: "AI Platform",
    description:
      "NEXUS is an AI-powered developer workflow platform organized around CREATE → TEST → DEPLOY → COLLABORATE: understanding ideas and generating structured plans, validating implementations, preparing projects for deployment and supporting collaboration workflows.",
    bullets: [
      "CREATE — turn an idea into a structured development plan",
      "TEST — validate implementations and run checks",
      "DEPLOY — prepare projects for deployment",
      "COLLABORATE — support development workflows",
    ],
    tech: ["React", "TypeScript", "AI APIs", "Vercel"],
    live: "https://nexus-livid-six.vercel.app/",
    github: "https://github.com/sanelakshmidharreddy/nexus",
    video: "https://youtu.be/W4hr0yU-nPQ",
    accent: "from-teal-400/25 via-emerald-500/10 to-transparent",
  },
  {
    id: "top50",
    index: "03",
    title: "Mastering the Top 50 AI Tools",
    subtitle: "AI Resource Platform & Digital Product",
    category: "Full Stack Product",
    description:
      "A full-stack AI resource platform created to distribute a practical handbook covering modern AI tools for students and developers.",
    bullets: [
      "Platform design and product development",
      "Digital product creation and Razorpay integration",
      "Firebase backend and data management",
      "Vercel deployment and GitHub version control",
      "Gemini AI Studio workflow",
    ],
    tech: ["React", "Firebase", "Razorpay", "Vercel", "GitHub", "Gemini AI Studio"],
    live: "https://top-50-ai-tools.vercel.app/",
    accent: "from-cyan-400/20 via-teal-500/10 to-transparent",
  },
  {
    id: "translator",
    index: "04",
    title: "AI Language Translator",
    subtitle: "AI / NLP Application",
    category: "NLP",
    description:
      "AI-powered multilingual translation application supporting 18+ languages.",
    bullets: ["Streamlit interface", "Google AI integration", "18+ languages supported"],
    tech: ["Python", "Streamlit", "Google AI", "NLP", "APIs"],
    accent: "from-emerald-300/20 via-teal-500/10 to-transparent",
  },
  {
    id: "datadoctor",
    index: "05",
    title: "DataDoctor",
    subtitle: "Healthcare Data Processing & EDA",
    category: "Data Analysis",
    description:
      "Healthcare data analysis project focused on data loading, cleaning, validation, exploratory analysis and visualization.",
    bullets: [
      "Pandas loading, inspection, cleaning and invalid-value handling",
      "Statistical analysis, EDA and visualization",
      "Correlation analysis — Age vs Length of Stay: −0.022844 (weak, near-zero)",
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook", "Git", "GitHub"],
    accent: "from-teal-300/20 via-emerald-500/10 to-transparent",
  },
  {
    id: "beauty3d",
    index: "06",
    title: "3D Beauty Website",
    subtitle: "Real-World Interactive Web Experience",
    category: "3D Web",
    description:
      "A 3D/cinematic web experience created for Likitha Beauty Parlour — evidence of 3D web development, frontend engineering, UI/UX and motion design applied to a real business.",
    bullets: [
      "3D/cinematic experience with smooth scrolling",
      "Interactive UI, voice-over and WhatsApp connectivity",
      "Performance-conscious, responsive, business-focused UX",
    ],
    tech: ["React", "Three.js", "Motion Design", "WhatsApp Integration"],
    live: "https://likitha-beauty-parlour.netlify.app/",
    accent: "from-cyan-300/20 via-teal-500/10 to-transparent",
  },
  {
    id: "edith",
    index: "07",
    title: "Edith",
    subtitle: "Real-Time Voice Assistant",
    category: "Voice AI",
    description:
      "A real-time AI voice assistant — an early practical exploration into voice-based AI systems, not enterprise production software.",
    bullets: [
      "Voice command understanding and real-time responses",
      "Application actions and basic automation",
      "External tool/API integration",
    ],
    tech: ["Python", "LiveKit", "API Integrations"],
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
  },
];

export const moreProjects = [
  {
    title: "InsightLens — Titanic EDA",
    description: "Exploratory data analysis of the Titanic dataset with visual insights.",
    tech: ["Python", "Pandas", "EDA"],
  },
  {
    title: "Gold Price Prediction",
    description: "Regression model (Random Forest) on historical data to predict gold price trends.",
    tech: ["Python", "Regression", "Random Forest"],
  },
  {
    title: "Car Price Prediction",
    description: "Decision Tree Regressor estimating vehicle valuation through feature engineering.",
    tech: ["Python", "Decision Tree", "Feature Engineering"],
  },
];

export const clientWork = [
  {
    name: "Likitha Ladies Beauty Parlour",
    url: "https://likitha-beauty-parlour.netlify.app/",
    note: "Responsive site with WhatsApp booking integration",
  },
  {
    name: "Sri Manikanta Meeseva",
    url: "https://sri-manikanta-meeseva.netlify.app/",
    note: "Bilingual (Telugu/English) government-services portal",
  },
  {
    name: "Sai Megha Multi Specialty Hospital",
    url: "https://sai-megha-multi-speciality-hospital.netlify.app",
    note: "Healthcare platform with doctor profiles and map navigation",
  },
  {
    name: "Soundarya Ladies Beauty Parlour",
    url: "https://parvathi-soundarya-beauty-parlour.netlify.app",
    note: "Lead enquiry features and WhatsApp communication",
  },
];

/** Only technologies with concrete evidence in this repo / shipped projects. */
export const skillGroups = [
  {
    title: "AI / Machine Learning",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "NLP",
      "AI Application Development",
      "AI Model/API Integration",
      "Prompt Engineering",
      "Data Analysis",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Streamlit",
    ],
  },
  {
    title: "Programming",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Full Stack",
    items: ["React", "Node.js", "Express.js", "REST APIs", "Firebase", "MongoDB", "Tailwind CSS", "Vite"],
  },
  {
    title: "Tools / Platforms",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Gemini AI", "Groq API", "Jupyter Notebook", "VS Code"],
  },
];

export const achievements = [
  {
    title: "IBM Expert Labs National Hackathon 2026",
    badge: "Top Winning Team",
    detail:
      "Reached the National Finals in Coimbatore. Focus: innovation, teamwork, problem solving, technology and presentation.",
    award: "Certificate of Excellence — Innovation & Teamwork",
  },
  {
    title: "NAKSHATRA '26",
    badge: "1st Prize",
    detail: "THINK TALK — technical event at a National Level Technical Symposium, S.A. Engineering College, Chennai.",
    award: "Team: Sane Laks",
  },
];

export const certifications = [
  { name: "AI Builder Masterclass", issuer: "Airtribe", year: "2026" },
  { name: "Claude101", issuer: "Anthropic", year: "2026" },
  { name: "AI Tools Workshop", issuer: "Be10x", year: "2026" },
  { name: "Deloitte Data Analytics Job Simulation", issuer: "Forage", year: "2026" },
  { name: "Machine Learning Certification", issuer: "DLK Solutions", year: "" },
];

export const journey = [
  {
    year: "2024",
    label: " Foundation",
    state: "done" as const,
    items: ["B.Tech begins — CSE (Data Science), Chennai"],
  },
  {
    year: "2025",
    label: "Full Stack Development",
    state: "done" as const,
    items: ["Future Interns internship", "First full-stack projects", "First hackathons"],
  },
  {
    year: "2026",
    label: "AI Engineering",
    state: "done" as const,
    items: [
      "Machine Learning internship",
      "U.L.T.R.O.N. and NEXUS",
      "AI product development",
      "IBM Expert Labs National Hackathon finals",
    ],
  },
  {
    year: "2027+",
    label: "Next",
    state: "goal" as const,
    items: ["AI engineering at depth", "Advanced projects", "Research-oriented exploration", "Product building"],
  },
];
