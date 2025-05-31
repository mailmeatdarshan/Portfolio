// src/data/portfolioData.js
export const personalInfo = {
  name: "Darshan Dubey",
  initials: "DD",
  title: "Full Stack Developer",
  email: "mailmeatdarshan@gmail.com",
  bio: "I craft digital experiences that push boundaries. Specializing in modern web technologies, I transform ideas into stunning, interactive applications that users love.",
  typewriterStrings: [
    "Full Stack Developer",
    "React Specialist", 
    "UI/UX Designer",
    "Problem Solver",
    "Code Artist"
  ]
};

export const projects = [
  {
    id: 1,
    title: "Tint & Orange",
    description: "A revolutionary car modification platform with real-time inventory management, AR visualization, and seamless booking system.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    featured: true
  },
  {
    id: 2,
    title: "Sonic Waves",
    description: "Next-generation music streaming platform with AI-powered recommendations, social features, and immersive audio experience.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    featured: true
  },
  {
    id: 3,
    title: "Isha Tattva",
    description: "Elegant interior design portfolio with 3D room visualization, mood boards, and client collaboration tools.",
    tech: ["React", "Firebase", "Three.js", "Material-UI"],
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    featured: false
  },
  {
    id: 4,
    title: "Granit Architecture",
    description: "Multilingual architectural platform with BIM integration, project management, and real-time collaboration features.",
    tech: ["Next.js", "Tailwind", "Vercel", "Prisma"],
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    featured: false
  }
];

export const skills = [
  { name: "React", icon: "⚛️", level: 95, color: "from-blue-400 to-blue-600" },
  { name: "JavaScript", icon: "🟨", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "Node.js", icon: "🟢", level: 85, color: "from-green-400 to-green-600" },
  { name: "TypeScript", icon: "🔷", level: 80, color: "from-blue-500 to-indigo-600" },
  { name: "Next.js", icon: "▲", level: 88, color: "from-gray-700 to-gray-900" },
  { name: "MongoDB", icon: "🍃", level: 75, color: "from-green-500 to-green-700" },
  { name: "Python", icon: "🐍", level: 70, color: "from-purple-400 to-purple-600" },
  { name: "AWS", icon: "☁️", level: 65, color: "from-orange-400 to-orange-600" }
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/mailmeatdarshan", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/darshandubey25", icon: "Linkedin" },
  { name: "Email", url: "mailto:mailmeatdarshan@gmail.com", icon: "Mail" }
];