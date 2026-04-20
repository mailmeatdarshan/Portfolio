export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    role?: string; // specific role
    image: string;
    featured: boolean;
    liveUrl: string;
    githubUrl: string;
    status?: 'In Progress' | 'Completed' | 'Development';
}

export interface Skill {
    category: string;
    items: string[];
}

export interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string[];
}

export interface EducationItem {
    id: number;
    institution: string;
    location: string;
    degree: string;
    duration: string;
    grade?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface AboutSection {
    title: string;
    content: string[];
}

export const personalInfo = {
    name: "Darshan Dubey",
    initials: "DD",
    title: "Full Stack Developer",
    email: "mailmeatdarshan@gmail.com",
    bio: "I craft digital experiences that push boundaries. Specializing in modern web technologies, I transform ideas into stunning, interactive applications that users love.",
    typewriterStrings: [
        "Full Stack Developer",
        "Open Source Contributer",
        "React Specialist",
        "UI/UX Designer",
        "Problem Solver",
        "Code Artist"
    ],
    about: {
        whatILove: [
            {
                title: "Anime is my escape",
                description: "Especially One Piece. The story, the philosophy, the madness."
            },
            {
                title: "Japanese culture and language",
                description: "Currently learning Japanese step by step. From Hiragana to full sentences someday."
            },
            {
                title: "Night coding sessions",
                description: "When the world sleeps, I build things that make sense to me."
            },
            {
                title: "Designing UI with feel",
                description: "Not just pretty, but responsive, interactive, and reactive to touch, drag, motion, and mood."
            },
            {
                title: "Shitposting",
                description: "Therapeutic. Kinda my spiritual outlet tbh."
            },
            {
                title: "Reading Masterpieces",
                description: "Life’s a maze. Read Books And Chill"
            }
        ],
        masterplan: [
            "Own a piece of land in Japan. No matter how small, it's my portal to peace.",
            "If I’m not a millionaire before 30, I'm officially gay. Signed, stamped, sealed.",
            "Launch a product people can’t stop using. Not viral, just vital.",
            "Build a system or tool that gets referenced on Reddit without my name on it.",
            "Design UIs that breathe. Motion, feel, personality.",
            "Make enough passive income to disappear and code in the mountains."
        ]
    }
};

export const technicalArsenal: Skill[] = [
    {
        category: "Languages",
        items: ["JavaScript", "Python", "Java", "C/C++", "SQL", "HTML5", "CSS3", "R"]
    },
    {
        category: "Frameworks",
        items: ["React.js", "Node.js", "Flask", "Tailwind CSS", "NumPy", "Pandas", "Matplotlib"]
    },
    {
        category: "Tools",
        items: ["Git", "GitHub", "Docker", "VS Code", "MySQL", "MongoDB", "Redis", "RabbitMQ"]
    },
    {
        category: "Skills",
        items: ["Full-Stack Development", "Database Management", "API Development", "Responsive Design"]
    }
];

export const projects: Project[] = [
    {
        id: 17,
        title: "ShriHariEnterprises",
        description: "A professional business platform for Shri Hari Enterprises, currently under development to streamline their operations and digital presence.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "JWT"],
        image: "/images/projects/shriharienterprises.png",
        featured: false,
        liveUrl: "#",
        githubUrl: "https://github.com/mailmeatdarshan/ShriHariEnterprises",
        status: "Development"
    },
    {
        id: 14,
        title: "MyBhavans",
        description: "A comprehensive college social media app built specifically for Bhavans College. It features a unified feed system, skill-swap marketplace, and student utilities, fostering a connected campus community.",
        tech: ["Android", "Kotlin", "Jetpack Compose", "Firebase"],
        image: "/images/projects/mybhavans.png",
        featured: true,
        liveUrl: "https://github.com/mailmeatdarshan/MyBhavans---Social/releases/download/v1.0/MyBhavans.apk",
        githubUrl: "https://github.com/mailmeatdarshan/MyBhavans---Social"
    },
    {
        id: 13,
        title: "HisabKitab",
        description: "A comprehensive expense tracking application with real-time analytics, recurring expenses, and categorized spending insights. Built to help users manage their finances effectively.",
        tech: ["React", "Node.js", "MongoDB", "Redis", "RabbitMQ", "Chart.js"],
        image: "/images/projects/hisabkitab.png",
        featured: true,
        liveUrl: "https://hisab-kitab-sepia.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/HisabKitab"
    },
    {
        id: 1,
        title: "Chitti-The Robot",
        description: "Chitti-The Robot brings OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and Grok AI into one sleek interface. It solves the problem of navigating multiple AI platforms by unifying them into a single, cohesive user experience.",
        tech: ["React", "Vite", "JavaScript", "APIs", "CSS3"],
        image: "/images/projects/Chitti.png",
        featured: true,
        liveUrl: "https://chitti-the-robot.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/Chitti-the-Robot"
    },
    {
        id: 16,
        title: "BhavansPracbuddy",
        description: "Bhavans PracBuddy is a purpose-built tool for Bhavan's College students to automate the most painful part of college life — practical journals. Upload your practical PDF, fill in your details, optionally generate handwritten-style theory, and get a submission-ready journal in seconds.",
        tech: ["Node.js", "Express", "React", "Firebase", "JavaScript"],
        image: "/images/projects/pracbuddy.png",
        featured: true,
        liveUrl: "https://pracbuddy.vercel.app",
        githubUrl: "https://github.com/mailmeatdarshan/PracBuddy"
    },
    {
        id: 2,
        title: "Comfy",
        description: "A sleek, fully responsive furniture e-commerce app built entirely with vanilla JavaScript. Experience seamless shopping, smart filters, and lightning-fast performance—no frameworks needed.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        image: "/images/projects/comfy2.png",
        featured: true,
        liveUrl: "https://comfy-neon.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/Comfy"
    }
];

export const experience: ExperienceItem[] = [
    {
        id: 1,
        title: "Frontend Intern",
        company: "TeachUS",
        location: "Mumbai, Maharashtra",
        duration: "Sep. 2025 – Nov. 2025",
        description: [
            "During this remote internship, I served as a Frontend Designer within the IT Department, contributing to the design and user experience of the Teachus App",
            "Collaborated with faculty to transform complex educational requirements into intuitive, user-friendly digital interfaces"
        ]
    },
    {
        id: 2,
        title: "Data Management Intern",
        company: "Bhavans College",
        location: "Mumbai, Maharashtra",
        duration: "Nov. 2025 – Dec. 2025",
        description: [
            "Working as a Data Management Intern at Bhavans College, assisting in organizing, maintaining, and updating academic and administrative data",
            "Gained hands-on experience with data handling, record maintenance, digital management systems, and ERP operations."
        ]
    }
];

export const education: EducationItem[] = [
    {
        id: 1,
        institution: "Bhavans College",
        location: "Mumbai, Maharashtra",
        degree: "Bachelor of Science in Computer Science",
        duration: "Aug. 2024 – Present"
    },
    {
        id: 2,
        institution: "Divine Providence High School",
        location: "Mumbai, Maharashtra",
        degree: "Higher Secondary School Certificate",
        duration: "Aug. 2022 – May 2023",
        grade: "Top 10%"
    }
];

// Keeping socialLinks for footer/contact
export const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com/mailmeatdarshan", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/darshandubey25", icon: "Linkedin" },
    { name: "Email", url: "mailto:mailmeatdarshan@gmail.com", icon: "Mail" }
];
