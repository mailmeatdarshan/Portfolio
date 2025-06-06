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
    title: "Comfy",
    description: "A revolutionary car modification platform with real-time inventory management, AR visualization, and seamless booking system.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/comfy2.png",
    featured: true
  },
  {
    id: 2,
    title: "Gitters",
    description: "Gitters is an interactive web app that allows users to seamlessly browse and explore GitHub profiles offering a visually engaging and user-friendly experience.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/gitters.png",
    featured: true
  },
  {
    id: 3,
    title: "WikiExplorer",
    description: "Wikipedia is one of the largest and most popular sources of general knowledge on the internet. This is a simple, interactive web application that allows users to search Wikipedia",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/wikiexplorer.png",
    featured: false
  },
  {
    id: 4,
    title: "World-Weather-Web",
    description: "World Weather Web is a sleek, user-friendly application that provides instant access to real-time weather conditions worldwide.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    image: "/images/projects/worldweatherweb.png",
    featured: false
  },
  {
    id: 5,
    title: "RazorpayClone(Frontend)",
    description: "Razorpay is a finance platform that primarily provides businesses with tools to accept, process, and disburse payments online. This project replicates the sleek and user-friendly design of Razorpays payment system",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/razorpay.png",
    featured: false
  },
  {
    id: 6,
    title: "DiscordClone(Frontend)",
    description: "Discord is an instant messaging and VoIP social platform which allows communication through voice calls, video calls, text messaging, and media.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/discord.png",
    featured: false
  },
  {
  id: 7,
  title: "PasswordGen",
  description: "This web-based random password generator creates secure passwords based on your preferences.",
  tech: ["HTML", "CSS", "JavaScript"],
  image: "/images/projects/passwordgen.png",
  featured: false
  },
  {
  id: 8,
  title: "YourMap",
  description: "YourMap is a custom web-based mapping application powered by the MapTiler API. ",
  tech: ["HTML", "CSS", "JavaScript"],
  image: "/images/projects/yourmap.png",
  featured: false
  },
  {
    id: 9,
    title: "Tic-Tac-Toe",
    description: "Tic-Tac-Toe reimagines the classic paper-and-pencil game with modern design.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/tictactoe.png",
    featured: false
  },
  {
  id: 10,
  title: "GroceryList",
  description: "YourGrocery is a simple, easy-to-use web application designed to streamline your grocery shopping experience.",
  tech: ["HTML", "CSS", "JavaScript"],
  image: "/images/projects/grocery.png",
  featured: false
  }

];

export const skills = [
  { name: "React", icon: "⚛️", level: 95, color: "from-blue-400 to-blue-600" },
  { name: "JavaScript", icon: "🟨", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "Node.js", icon: "🟢", level: 85, color: "from-green-400 to-green-600" },
  { name: "TailwindCSS", icon: "🔷", level: 80, color: "from-blue-500 to-indigo-600" },
  { name: "Angular", icon: "🔷", level: 80, color: "from-blue-500 to-indigo-600" },
  { name: "Next.js", icon: "▲", level: 88, color: "from-gray-700 to-gray-900" },
  { name: "MongoDB", icon: "🍃", level: 75, color: "from-green-500 to-green-700" },
  { name: "Python", icon: "🐍", level: 70, color: "from-purple-400 to-purple-600" },
  { name: "Oracle", icon: "⭕", level: 65, color: "from-orange-400 to-orange-600" },
  { name: "C++", icon: "☁️", level: 65, color: "from-green-400 to-orange-600" },
  { name: "Java", icon: "☁️", level: 65, color: "from-blue-400 to-orange-600" },
  { name: "Linux", icon: "☁️", level: 65, color: "from-burgundy-400 to-orange-600" },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/mailmeatdarshan", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/darshandubey25", icon: "Linkedin" },
  { name: "Email", url: "mailto:mailmeatdarshan@gmail.com", icon: "Mail" }
];