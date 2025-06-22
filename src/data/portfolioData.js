// src/data/portfolioData.js
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
  ]
};

export const projects = [
  {
    id: 1,
    title: "Chitti-The Robot",
    description: "Chitti-The Robot brings OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and Grok AI into one sleek interface.",
    tech: ["React", "Vite", "JavaScript", "APIs", "CSS3"],
    image: "/images/projects/welcome.png",
    featured: true,
    liveUrl: "https://chitti-the-robot.vercel.app/",
    githubUrl: "https://github.com/mailmeatdarshan/Chitti-the-Robot"
  },
  {
    id: 2,
    title: "Comfy",
    description: "A revolutionary car modification platform with real-time inventory management, AR visualization, and seamless booking system.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/comfy2.png",
    featured: true,
    liveUrl: "https://comfy-neon.vercel.app/",
    githubUrl: "https://github.com/mailmeatdarshan/Comfy"
  },
  {
    id: 3,
    title: "Gitters",
    description: "Gitters is an interactive web app that allows users to seamlessly browse and explore GitHub profiles offering a visually engaging and user-friendly experience.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/gitters2.png",
    featured: false,
    liveUrl: "https://gitters.netlify.app/",
    githubUrl: "https://github.com/mailmeatdarshan/Gitters"
  },
  {
    id: 4,
    title: "WikiExplorer",
    description: "Wikipedia is one of the largest and most popular sources of general knowledge on the internet. This is a simple, interactive web application that allows users to search Wikipedia",
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
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/worldweatherweb.png",
    featured: false,
    liveUrl: "https://world-weather-web-new.netlify.app/",
    githubUrl: "https://github.com/mailmeatdarshan/WorldWeatherWeb"
  },
  {
    id: 6,
    title: "RazorpayClone(Frontend)",
    description: "Razorpay is a finance platform that primarily provides businesses with tools to accept, process, and disburse payments online. This project replicates the sleek and user-friendly design of Razorpays payment system",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/razorpay.png",
    featured: false,
    liveUrl: "https://razor-pay-clone-ten-flame.vercel.app/",
    githubUrl: "https://github.com/mailmeatdarshan/RazorPayClone"
  },
  {
    id: 7,
    title: "DiscordClone(Frontend)",
    description: "Discord is an instant messaging and VoIP social platform which allows communication through voice calls, video calls, text messaging, and media.",
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
  tech: ["HTML", "CSS", "JavaScript"],
  image: "/images/projects/passwordgen.png",
  featured: false,
  liveUrl: "https://your-passwordgenerator.netlify.app/",
  githubUrl: "https://github.com/mailmeatdarshan/PasswordGen"
  },
  {
  id: 9,
  title: "YourMap",
  description: "YourMap is a custom web-based mapping application powered by the MapTiler API. ",
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
  tech: ["HTML", "CSS", "JavaScript"],
  image: "/images/projects/grocery.png",
  featured: false,
  liveUrl: "https://your-groceries.netlify.app/",
  githubUrl: "https://github.com/mailmeatdarshan/GroceryList"
  },
  {
  id: 12,
  title: "Dribble",
  description: "Dribble The world's leading platform to discover top designers, their design work, and the services they offer. This is just the frontend of the original website using Html and CSS",
  tech: ["HTML", "CSS"],
  image: "/images/projects/dribble.png",
  featured: false,
  liveUrl: "https://mailmeatdarshan.github.io/Dribble-/",
  githubUrl: "https://github.com/mailmeatdarshan/Dribble-"
  }

];

export const skills = [
  { 
    name: "React", 
    icon: "⚛️", 
    level: 95, 
    color: "from-blue-400 to-blue-600",
    description: "Building dynamic UIs with hooks & state management",
    category: "Frontend",
  },
  { 
    name: "JavaScript", 
    icon: "🚀", 
    level: 90, 
    color: "from-yellow-400 to-yellow-600",
    description: "ES6+, async/await, DOM manipulation & modern JS",
    category: "Language",
  },
  { 
    name: "Node.js", 
    icon: "🟢", 
    level: 85, 
    color: "from-green-400 to-green-600",
    description: "RESTful APIs, Express.js & server-side development",
    category: "Backend",
  },
  { 
    name: "TailwindCSS", 
    icon: "🎨", 
    level: 80, 
    color: "from-cyan-400 to-blue-600",
    description: "Utility-first CSS framework for rapid UI development",
    category: "Styling",
  },
  { 
    name: "Angular", 
    icon: "🅰️", 
    level: 80, 
    color: "from-red-500 to-red-700",
    description: "Component-based architecture & TypeScript integration",
    category: "Frontend",
  },
  { 
    name: "Next.js", 
    icon: "▲", 
    level: 88, 
    color: "from-gray-700 to-gray-900",
    description: "Full-stack React framework with SSR & API routes",
    category: "Framework",
  },
  { 
    name: "MongoDB", 
    icon: "🍃", 
    level: 75, 
    color: "from-green-500 to-green-700",
    description: "NoSQL database design & aggregation pipelines",
    category: "Database",
  },
  { 
    name: "Python", 
    icon: "🐍", 
    level: 70, 
    color: "from-blue-500 to-green-500",
    description: "Data analysis, automation & web scraping",
    category: "Language",
  },
  { 
    name: "Oracle", 
    icon: "🗄️", 
    level: 65, 
    color: "from-red-400 to-orange-600",
    description: "SQL queries, stored procedures & database optimization",
    category: "Database",
  },
  { 
    name: "C++", 
    icon: "⚡", 
    level: 65, 
    color: "from-blue-600 to-purple-600",
    description: "Object-oriented programming & algorithm implementation",
    category: "Language",
  },
  { 
    name: "Java", 
    icon: "☕", 
    level: 65, 
    color: "from-orange-500 to-red-600",
    description: "Enterprise applications & object-oriented design",
    category: "Language",
  },
  { 
    name: "Linux", 
    icon: "🐧", 
    level: 65, 
    color: "from-gray-800 to-yellow-600",
    description: "Command line, system administration & shell scripting",
    category: "System",
  },
];


export const socialLinks = [
  { name: "GitHub", url: "https://github.com/mailmeatdarshan", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/darshandubey25", icon: "Linkedin" },
  { name: "Email", url: "mailto:mailmeatdarshan@gmail.com", icon: "Mail" }
];