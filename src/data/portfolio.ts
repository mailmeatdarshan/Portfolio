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
        id: 13,
        title: "HisabKitab",
        description: "A comprehensive expense tracking application with real-time analytics, recurring expenses, and categorized spending insights. Built to help users manage their finances effectively.",
        // role: "Full Stack Developer - Architected the entire application, implemented secure authentication, and integrated Redis/RabbitMQ for background tasks.",
        tech: ["React", "Node.js", "MongoDB", "Redis", "RabbitMQ", "Chart.js"],
        image: "/images/projects/hisabkitab.png",
        featured: true,
        liveUrl: "https://hisab-kitab-sepia.vercel.app",
        githubUrl: "https://github.com/mailmeatdarshan/HisabKitab"
    },
    {
        id: 1,
        title: "Chitti-The Robot",
        description: "Chitti-The Robot brings OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and Grok AI into one sleek interface. It solves the problem of navigating multiple AI platforms by unifying them into a single, cohesive user experience.",
        // role: "Lead Developer - Architected the seamless integration of multiple AI APIs and designed the unified UI.",
        tech: ["React", "Vite", "JavaScript", "APIs", "CSS3"],
        image: "/images/projects/welcome.png",
        featured: true,
        liveUrl: "https://chitti-the-robot.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/Chitti-the-Robot"
    },
    {
        id: 2,
        title: "Comfy",
        description: "A revolutionary car modification platform with real-time inventory management, AR visualization, and seamless booking system. It addresses the lack of digital tools in the custom car modification market.",
        // role: "Full Stack Developer - Built the inventory system and integrated AR visualization features.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        image: "/images/projects/comfy2.png",
        featured: true,
        liveUrl: "https://comfy-neon.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/Comfy"
    },
    {
        id: 3,
        title: "Gitters",
        description: "Gitters is an interactive web app that allows users to seamlessly browse and explore GitHub profiles offering a visually engaging and user-friendly experience. Simplifies GitHub profile discovery.",
        // role: "Frontend Developer - Focused on creating the interactive and visually engaging user interface using GitHub API.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        image: "/images/projects/gitters2.png",
        featured: false,
        liveUrl: "https://gitters.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/Gitters"
    },
    {
        id: 4,
        title: "WikiExplorer",
        description: "Wikipedia is one of the largest and most popular sources of general knowledge on the internet. This is a simple, interactive web application that allows users to search Wikipedia efficiently.",
        // role: "Developer - implemented the search functionality and API integration.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        image: "/images/projects/wikiexplorer.png",
        featured: false,
        liveUrl: "https://wikiexplorer.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/WikiExplorer"
    },
    {
        id: 5,
        title: "World-Weather-Web",
        description: "World Weather Web is a sleek, user-friendly application that provides instant access to real-time weather conditions worldwide.",
        // role: "Frontend Developer - Designed and built the weather dashboard.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        image: "/images/projects/worldweatherweb.png",
        featured: false,
        liveUrl: "https://world-weather-web-new.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/WorldWeatherWeb"
    },
    {
        id: 6,
        title: "RazorpayClone(Frontend)",
        description: "Razorpay is a finance platform that primarily provides businesses with tools to accept, process, and disburse payments online. This project replicates the sleek and user-friendly design of Razorpays payment system.",
        // role: "UI Developer - Recreated the pixel-perfect design of the Razorpay homepage.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/razorpay.png",
        featured: false,
        liveUrl: "https://razor-pay-clone-ten-flame.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/RazorPayClone"
    },
    {
        id: 7,
        title: "DiscordClone(Frontend)",
        description: "Discord is an instant messaging and VoIP social platform which allows communication through voice calls, video calls, text messaging, and media. A frontend clone showcasing layout skills.",
        // role: "UI Developer - Built the complex responsive layout of the Discord interface.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/discord.png",
        featured: false,
        liveUrl: "https://discord-clone-ten-wheat.vercel.app/",
        githubUrl: "https://github.com/mailmeatdarshan/DiscordClone"
    },
    {
        id: 8,
        title: "PasswordGen",
        description: "This web-based random password generator creates secure passwords based on your preferences.",
        // role: "Developer - Implemented the randomization logic and user interface.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/passwordgen.png",
        featured: false,
        liveUrl: "https://your-passwordgenerator.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/PasswordGen"
    },
    {
        id: 9,
        title: "YourMap",
        description: "YourMap is a custom web-based mapping application powered by the MapTiler API.",
        // role: "Developer - Integrated MapTiler API to provide custom mapping features.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/yourmap.png",
        featured: false,
        liveUrl: "https://yourmap.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/YourMap"
    },
    {
        id: 10,
        title: "Tic-Tac-Toe",
        description: "Tic-Tac-Toe reimagines the classic paper-and-pencil game with modern design.",
        // role: "Game Developer - Built the game logic and interactive UI.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/tictactoe.png",
        featured: false,
        liveUrl: "https://mailmeatdarshan.github.io/Tic-Tac-Toe/",
        githubUrl: "https://github.com/mailmeatdarshan/Tic-Tac-Toe"
    },
    {
        id: 11,
        title: "GroceryList",
        description: "YourGrocery is a simple, easy-to-use web application designed to streamline your grocery shopping experience.",
        // role: "Developer - Created the CRUD functionality for grocery items.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/images/projects/grocery.png",
        featured: false,
        liveUrl: "https://your-groceries.netlify.app/",
        githubUrl: "https://github.com/mailmeatdarshan/GroceryList"
    },
    {
        id: 12,
        title: "Dribble",
        description: "Dribble The world's leading platform to discover top designers, their design work, and the services they offer. This is just the frontend of the original website using Html and CSS.",
        // role: "UI Developer - Replicated the Dribbble homepage design.",
        tech: ["HTML", "CSS"],
        image: "/images/projects/dribble.png",
        featured: false,
        liveUrl: "https://mailmeatdarshan.github.io/Dribble-/",
        githubUrl: "https://github.com/mailmeatdarshan/Dribble-"
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
