"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { personalInfo, projects, technicalArsenal, experience, education, socialLinks } from "@/data/portfolio";
import { usePathname } from "next/navigation";

// --- File System Simulation ---

type FileData = string;
type DirectoryData = {
  [name: string]: FileData | DirectoryData;
};

const fsRoot: DirectoryData = {
  ".hidden": {
    "masterplan.md": personalInfo.about.masterplan.map((item, i) => `${i + 1}. ${item}`).join("\n")
  },
  "projects": projects.reduce((acc, proj) => {
    acc[proj.title.replace(/\s+/g, "_").toLowerCase() + ".txt"] = `${proj.title}\n${proj.description}\nTech: ${proj.tech.join(", ")}\nLink: ${proj.liveUrl}\nGitHub: ${proj.githubUrl}`;
    return acc;
  }, {} as DirectoryData),
  "certs": {
    "aws_cloud.txt": "AWS Cloud Practitioner Essentials - AWS Training & Certification\nDate: April 18, 2026\nSkills: Cloud Concepts, AWS Core Services, Security & Compliance, Billing & Pricing.\nLearning: Comprehensive overview of AWS Cloud platform, global infrastructure, and core services like EC2, S3, and RDS.",
    "iitkgp_cloud.txt": "Cloud Computing - NPTEL (IIT Kharagpur)\nDate: Jul-Oct 2025 | Score: 63% (Elite)\nSkills: Virtualization, Cloud Architecture, NIST Model, Service Models (IaaS/PaaS/SaaS).\nLearning: Deep dive into cloud infrastructure, resource management, and distributed systems architecture.",
    "devops_sre.txt": "Introduction to DevOps and SRE (LFS162) - The Linux Foundation\nDate: April 15, 2026\nSkills: DevOps Philosophy, SRE Principles, CI/CD, Automation.\nLearning: Explored the intersection of development and operations, focusing on reliability and modern deployment pipelines.",
    "ibm_sql.txt": "SQL and Relational Databases 101 - IBM / Cognitive Class\nDate: May 26, 2025\nSkills: SQL, Relational Database Design, CRUD Operations, Data Modeling.\nLearning: Fundamental SQL statements for data manipulation and understanding relational database schemas.",
    "cpp_programming.txt": "CS107: C++ Programming - Saylor Academy\nDate: April 12, 2026 | Grade: 72.50%\nSkills: C++, OOP (Classes, Inheritance, Polymorphism), Memory Management, Data Structures.\nLearning: Mastered C++ syntax and core programming concepts, focusing on efficient resource management and object-oriented design."
  },
  "experience": experience.reduce((acc, exp) => {
    acc[exp.company.replace(/\s+/g, "_").toLowerCase() + ".txt"] = `${exp.title} @ ${exp.company}\n${exp.location}\n${exp.duration}\n\n${exp.description.join("\n")}`;
    return acc;
  }, {} as DirectoryData),
  "about.txt": `Hi there! I'm Darshan Dubey, a passionate Computer Science student at Bhavans College with a focus on web development, backend, and cloud computing.

My journey in tech began at Divine Providence College in Mumbai where I pursued a Computer Science major. During my studies, I discovered a deeper passion for programming, leading me to transfer to Bhavans College to specialize in Computer Science.

As a student, I've always wanted to help others with what I love the most - computers and IT. I have built PracBuddy and a social media platform for my college.

Now I'm currently seeking a Summer 2026 internship to gain hands-on experience in web dev, cloud computing, or backend while collaborating with innovative teams to build a safer digital future.`,
  "skills.txt": `Skills Acquired

Programming & Languages
• JavaScript & TypeScript – React.js, Next.js, Node.js
• Python – Security automation, API integrations, and log analysis
• Java & C/C++ – Data structures and algorithms
• SQL & NoSQL – Database management (MySQL, MongoDB, Redis)

Frameworks & Tools
• Frontend – Tailwind CSS, Framer Motion, Rough.js
• Backend – Express.js, Flask, RabbitMQ
• Tools – Git, Docker, VS Code, Postman

Web Development
• Full-Stack Development – Building end-to-end applications
• API Development – Designing and implementing RESTful APIs
• Responsive Design – Mobile-first, interactive UIs

Other Skills
• Cloud Computing – Awareness of cloud infrastructure and deployment
• Automation – Writing scripts to solve repetitive tasks
• UI/UX Design – Creating intuitive and interactive digital experiences`,
  "contact.txt": `Email: ${personalInfo.email}\nGitHub: ${socialLinks.find(s => s.name === "GitHub")?.url}\nLinkedIn: ${socialLinks.find(s => s.name === "LinkedIn")?.url}`
};

const resolvePath = (currentPath: string, targetPath: string): string => {
  if (targetPath === "~" || targetPath === "/") return "~";
  
  const pathParts = targetPath.startsWith("/") || targetPath.startsWith("~") 
    ? targetPath.split("/").filter(Boolean) 
    : [...currentPath.split("/").filter(Boolean), ...targetPath.split("/").filter(Boolean)];
    
  if (pathParts[0] === "~") pathParts.shift();
  
  const resolvedParts: string[] = [];
  for (const part of pathParts) {
    if (part === "." || !part) continue;
    if (part === "..") {
      if (resolvedParts.length > 0) resolvedParts.pop();
    } else {
      resolvedParts.push(part);
    }
  }
  return resolvedParts.length === 0 ? "~" : "~/" + resolvedParts.join("/");
};

const getFsNode = (path: string): FileData | DirectoryData | null => {
  if (path === "~") return fsRoot;
  const parts = path.replace(/^~\//, "").split("/").filter(Boolean);
  let current: FileData | DirectoryData | undefined = fsRoot;
  
  for (const part of parts) {
    if (typeof current === "object" && current !== null && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current || null;
};

interface CommandHistoryEntry {
  id: number;
  command: string;
  output: React.ReactNode;
  path: string;
}

export default function TerminalMode() {
  const pathname = usePathname();
  const { theme, setSpaceMode } = useTheme();
  const isTerminal = theme === "terminal" || theme === "transitioning-to-terminal";
  
  const [bootPhase, setBootPhase] = useState<"booting" | "awaiting-start" | "ready">("booting");
  const [bootText, setBootText] = useState<string[]>([]);
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [commandCounter, setCommandCounter] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showLaser, setShowLaser] = useState(false);
  const [isRunningTour, setIsRunningTour] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history, bootText, input]);

  const handleWrapperClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    if (!isTerminal) return;
    setBootPhase("booting");
    setBootText([]);
    setHistory([]);
    setCurrentPath("~");
    setInput("");
    setShowLaser(false);

    const bootLines = [
      "Initializing system components...",
      "Loading security protocols...",
      "Establishing secure connection...",
      "Mounting encrypted drives...",
      "Authenticating credentials...",
      "System ready!",
    ];
    
    // Start boot sequence after loading bar finishes (e.g., 1.5s)
    setTimeout(() => {
        let delay = 0;
        bootLines.forEach((line, index) => {
          delay += Math.random() * 300 + 100;
          setTimeout(() => {
            setBootText((prev) => [...prev, line]);
            if (index === bootLines.length - 1) {
              setBootPhase("awaiting-start");
            }
          }, delay);
        });
    }, 1500);
  }, [isTerminal]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Tab") {
          e.preventDefault();
          const parts = input.split(/\s+/);
          const lastPart = parts[parts.length - 1];
          const isCommand = parts.length === 1;

          let suggestions: string[] = [];

          if (isCommand) {
              const commands = ["ls", "cd", "cat", "whoami", "run", "help", "clear", "exit"];
              suggestions = commands.filter(c => c.startsWith(lastPart.toLowerCase()));
          } else {
              const node = getFsNode(currentPath);
              if (node && typeof node === "object") {
                  suggestions = Object.keys(node).filter(name => name.toLowerCase().startsWith(lastPart.toLowerCase()));
              }
          }

          if (suggestions.length === 1) {
              parts[parts.length - 1] = suggestions[0];
              setInput(parts.join(" ") + (isCommand ? " " : ""));
          } else if (suggestions.length > 1) {
              // Optional: Show multiple suggestions in history if user presses Tab twice? 
              // For now, just complete to the longest common prefix
              let common = suggestions[0];
              for (const s of suggestions) {
                  let i = 0;
                  while (i < common.length && i < s.length && common[i].toLowerCase() === s[i].toLowerCase()) i++;
                  common = common.slice(0, i);
              }
              if (common.length > lastPart.length) {
                parts[parts.length - 1] = common;
                setInput(parts.join(" "));
              }
          }
      } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (commandHistory.length > 0) {
              const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
              setHistoryIndex(newIndex);
              setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          }
      } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (historyIndex > 0) {
              const newIndex = historyIndex - 1;
              setHistoryIndex(newIndex);
              setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          } else if (historyIndex === 0) {
              setHistoryIndex(-1);
              setInput("");
          }
      }
  };

  const evaluateCommand = (cmdStr: string, currentPathArg: string) => {
    let output: React.ReactNode = null;
    let newPath = currentPathArg;
    const args = cmdStr.split(/\s+/);
    const cmd = args[0].toLowerCase();
    
    if (cmdStr === "") {
        // empty
    } else if (cmd === "whoami") {
        output = (
            <div className="my-2 space-y-3 text-gray-300 pl-2">
                <p><span className="text-[#5ec2ff] font-bold">Name:</span> {personalInfo.name}</p>
                <p><span className="text-[#5ec2ff] font-bold">Role:</span> {personalInfo.title}</p>
                <p><span className="text-[#5ec2ff] font-bold">Status:</span> Seeking Summer 2026 Internship</p>
                <p><span className="text-[#5ec2ff] font-bold">Focus Areas:</span> Web Development, Backend, Cloud Computing</p>
                <p className="mt-4 text-[#f0db4f] mt-4 mb-2">Try 'cat about.txt' for more information about me.</p>
            </div>
        );
    } else if (cmd === "help") {
        output = (
            <div className="space-y-1 my-2">
              <p className="text-[#f0db4f] underline">Available Commands:</p>
              <div className="grid grid-cols-[120px_1fr] gap-x-4">
                <span className="text-[#5ec2ff]">ls</span><span>List files and directories</span>
                <span className="text-[#5ec2ff]">cd [dir]</span><span>Change directory</span>
                <span className="text-[#5ec2ff]">cat [file]</span><span>Read file content</span>
                <span className="text-[#5ec2ff]">whoami</span><span>Show user profile summary</span>
                <span className="text-[#89f0a2]">run</span><span>Execute automated portfolio tour</span>
                <span className="text-[#f0db4f]">help</span><span>Show this help message</span>
                <span className="text-white">clear</span><span>Clear terminal screen</span>
                <span className="text-white">exit</span><span>Leave terminal mode</span>
              </div>
            </div>
          );
    } else if (cmd === "ls") {
      const target = args[1] && !args[1].startsWith("-") ? args[1] : (args[2] && !args[2].startsWith("-") ? args[2] : ".");
      const resolved = resolvePath(currentPathArg, target);
      const node = getFsNode(resolved);
      const showHidden = args.includes("-a") || args.includes("-al") || args.includes("-la");

      if (node && typeof node === "object") {
        const keys = Object.keys(node);
        
        // Custom sort orders
        const projectOrder = ["mybhavans", "hisabkitab", "pracbuddy", "chitti", "comfy", "shriharienterprises"];
        const certOrder = ["aws_cloud", "iitkgp_cloud", "devops_sre", "ibm_sql", "cpp_programming"];
        const expOrder = ["teachus", "datamanagement"];

        keys.sort((a, b) => {
            const cleanA = a.replace(".txt", "");
            const cleanB = b.replace(".txt", "");
            
            let order = null;
            if (resolved.endsWith("projects")) order = projectOrder;
            else if (resolved.endsWith("certs")) order = certOrder;
            else if (resolved.endsWith("experience")) order = expOrder;

            if (order) {
                const indexA = order.findIndex(o => cleanA.startsWith(o));
                const indexB = order.findIndex(o => cleanB.startsWith(o));
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
            }
            return a.localeCompare(b);
        });

        output = (
          <div className="flex flex-wrap gap-x-4 my-2">
            {keys.map(name => {
                if (name.startsWith(".") && !showHidden) return null;
                const isDir = typeof node[name] === "object";
                return (
                    <span key={name} className={isDir ? "text-[#89f0a2] font-bold" : "text-white"}>
                        {name}{isDir ? "/" : ""}
                    </span>
                );
            })}
          </div>
        );
      } else {
        output = <div className="text-red-500 my-1">ls: {target}: No such directory</div>;
      }
    } else if (cmd === "cd") {
      const target = args[1];
      if (!target || target === "~") {
          newPath = "~";
      } else {
          const resolved = resolvePath(currentPathArg, target);
          const node = getFsNode(resolved);
          if (!node || typeof node !== "object") {
            output = <div className="text-red-500 my-1">cd: {target}: No such directory</div>;
          } else {
            newPath = resolved;
          }
      }
    } else if (cmd === "cat") {
      const target = args[1];
      if (!target) {
        output = <div className="text-red-500 my-1">cat: missing operand</div>;
      } else {
        const resolved = resolvePath(currentPathArg, target);
        const node = getFsNode(resolved);
        if (node === null) {
          output = <div className="text-red-500 my-1">cat: {target}: No such file</div>;
        } else if (typeof node === "object") {
          output = <div className="text-red-500 my-1">cat: {target}: Is a directory</div>;
        } else {
          const fileName = target.split("/").pop() || "";
          if (fileName === "about.txt") {
              output = (
                  <div className="my-3 space-y-4 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                      <h3 className="text-[#89f0a2] font-bold text-lg underline">About Me</h3>
                      <p className="leading-relaxed">Hi there! I'm Darshan Dubey, a passionate Computer Science student at Bhavans College with a focus on web development, backend, and cloud computing.</p>
                      <p className="leading-relaxed">My journey in tech began at Divine Providence College in Mumbai where I pursued a Computer Science major. During my studies, I discovered a deeper passion for programming, leading me to transfer to Bhavans College to specialize in Computer Science.</p>
                      <p className="leading-relaxed">As a student, I've always wanted to help others with what I love the most - computers and IT. I have built PracBuddy and a social media platform for my college.</p>
                      <p className="leading-relaxed">Now I'm currently seeking a Summer 2026 internship to gain hands-on experience in web dev, cloud computing, or backend while collaborating with innovative teams to build a safer digital future.</p>
                  </div>
              );
          } else if (fileName === "skills.txt") {
              const sections = (node as string).split("\n\n");
              output = (
                  <div className="my-3 space-y-5 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                      <h3 className="text-[#89f0a2] font-bold text-lg underline">Skills</h3>
                      {sections.map((section, idx) => {
                          const lines = section.split("\n");
                          return (
                              <div key={idx}>
                                  <p className="text-[#5ec2ff] font-bold tracking-wide mb-1.5">{lines[0]}</p>
                                  {lines.slice(1).map((line, lIdx) => (
                                      <p key={lIdx} className="ml-2 text-[0.95em] opacity-90">{line}</p>
                                  ))}
                              </div>
                          );
                      })}
                  </div>
              );
          } else if (resolved.includes("certs")) {
              const lines = (node as string).split("\n");
              output = (
                <div className="my-3 space-y-3 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                    <h3 className="text-[#89f0a2] font-bold text-lg">{lines[0].split(" - ")[0]}</h3>
                    <p className="text-[#f0db4f] text-sm tracking-wide opacity-90">{lines[0].split(" - ")[1] || ""}</p>
                    <div className="space-y-2 mt-3">
                        {lines.slice(1).map((line, idx) => {
                            const [key, ...val] = line.split(": ");
                            return (
                                <p key={idx} className="leading-relaxed text-[0.95em]">
                                    <span className="text-[#5ec2ff] font-bold mr-2">•</span>
                                    <span className="font-medium mr-1">{key}:</span>
                                    {val.join(": ")}
                                </p>
                            );
                        })}
                    </div>
                </div>
              );
          } else if (fileName.includes("python") || fileName.includes("web")) {
              output = (
                <div className="my-3 space-y-2 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                    <h3 className="text-[#89f0a2] font-bold text-[1.05rem]">{fileName === "python.txt" ? "IBM Python Certification" : "freeCodeCamp Web Certification"}</h3>
                    <div className="mt-2">
                        <p className="text-[#5ec2ff] font-bold text-[0.7rem] uppercase tracking-wider mb-1 opacity-80">Details:</p>
                        <p className="leading-relaxed">{node as string}</p>
                    </div>
                </div>
              );
          } else if (fileName === "contact.txt") {
              const lines = (node as string).split("\n");
              output = (
                  <div className="my-3 space-y-4 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                      <h3 className="text-[#89f0a2] font-bold text-lg underline">Contact Information</h3>
                      <div className="space-y-2 mt-2">
                          {lines.map((line, idx) => {
                              const [key, ...rest] = line.split(": ");
                              return (
                                  <p key={idx} className="leading-relaxed text-[0.95em]">
                                      <span className="text-[#5ec2ff] font-bold mr-2">•</span>
                                      <span className="font-medium mr-1">{key}:</span>
                                      {rest.join(": ")}
                                  </p>
                              );
                          })}
                      </div>
                      <p className="mt-4 pt-2 text-[#f0db4f] opacity-90 border-t border-[#89f0a2]/20">
                          Feel free to reach out if you have any questions about web development, backend engineering, or if you're interested in collaborating on projects!
                      </p>
                  </div>
              );
          } else if (resolved.includes("projects") || resolved.includes("experience")) {
              const parts = (node as string).split("\n");
              output = (
                <div className="my-3 space-y-3 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1">
                    <h3 className="text-[#89f0a2] font-bold text-xl">{parts[0]}</h3>
                    <p className="text-[#f0db4f] text-sm tracking-wide opacity-90">{parts[1]}</p>
                    {parts[2] && <p className="leading-relaxed text-[0.95em] mt-3">{(parts.slice(3).join(" ").length > 0) ? parts.slice(3).join("\n") : parts[2]}</p>}
                    
                    {resolved.includes("projects") && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-4 space-y-3">
                            <div>
                                <p className="text-[#5ec2ff] font-bold text-[0.65rem] uppercase tracking-widest mb-1 opacity-70">Technologies</p>
                                <p className="text-sm font-medium">{parts[2].replace("Tech: ", "")}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                                <div>
                                    <p className="text-[#5ec2ff] font-bold text-[0.65rem] uppercase tracking-widest mb-0.5 opacity-70">Live Demo</p>
                                    <a href={parts[3].replace("Link: ", "")} target="_blank" className="text-sm hover:text-[#89f0a2] transition-colors line-clamp-1">{parts[3].replace("Link: ", "")}</a>
                                </div>
                                <div>
                                    <p className="text-[#5ec2ff] font-bold text-[0.65rem] uppercase tracking-widest mb-0.5 opacity-70">Source Code</p>
                                    <a href={parts[4].replace("GitHub: ", "")} target="_blank" className="text-sm hover:text-[#89f0a2] transition-colors line-clamp-1">{parts[4].replace("GitHub: ", "")}</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
              );
          } else {
              output = <div className="whitespace-pre-wrap my-3 text-gray-300 border-l-[2px] border-[#89f0a2]/40 pl-4 py-1 leading-relaxed">{node as string}</div>;
          }
        }
      }
    } else {
      output = <div className="text-red-500 my-1">{cmd}: command not found</div>;
    }
    return { output, newPath };
  };

  const runTourSequence = async (cmdId: number) => {
    setIsRunningTour(true);
    const tourCommands = [
        "whoami",
        "ls",
        "cat about.txt",
        "ls projects",
        "cat projects/mybhavans.txt",
        "cd experience",
        "ls",
        "cat teachus.txt",
        "cd ..",
        "ls -a",
        "cat .hidden/masterplan.md",
        "cat contact.txt"
    ];

    let workingPath = currentPath;
    let currentId = cmdId;

    for (const cmd of tourCommands) {
        await new Promise(r => setTimeout(r, 1200));
        
        const { output, newPath } = evaluateCommand(cmd, workingPath);
        
        setHistory(prev => [...prev, {
            id: currentId++,
            command: cmd,
            path: workingPath,
            output
        }]);
        
        workingPath = newPath;
        setCurrentPath(newPath);
    }
    setIsRunningTour(false);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (bootPhase === "booting" || isRunningTour) return;

    const cmdStr = input.trim();
    setInput("");
    setHistoryIndex(-1);
    
    if (cmdStr) setCommandHistory(prev => [...prev, cmdStr]);
    const cid = commandCounter;
    setCommandCounter(prev => prev + 1);

    if (bootPhase === "awaiting-start") {
      if (cmdStr.toLowerCase() === "start") {
        setShowLaser(true);
        setTimeout(() => {
            setShowLaser(false);
            setBootPhase("ready");
        }, 2200);
      } else {
        setHistory(prev => [...prev, {
          id: cid,
          command: cmdStr,
          path: currentPath,
          output: <div className="text-red-500">Command not recognized. Type 'start' to boot portfolio.</div>
        }]);
      }
      return;
    }

    const cmd = cmdStr.split(/\s+/)[0].toLowerCase();

    if (cmd === "clear") {
        setHistory([]);
        return;
    } else if (cmd === "exit") {
        setSpaceMode();
        return;
    } else if (cmd === "run") {
        setHistory(prev => [...prev, { id: cid, command: cmdStr, path: currentPath, output: null }]);
        setTimeout(() => runTourSequence(cid + 1), 300);
        return;
    }

    const { output, newPath } = evaluateCommand(cmdStr, currentPath);
    setHistory(prev => [...prev, {
      id: cid,
      command: cmdStr,
      path: currentPath,
      output
    }]);
    if (newPath !== currentPath) setCurrentPath(newPath);
  };

  const PROMPT_USER = "visitor";
  const PROMPT_HOST = "darshan";
  const displayPath = currentPath;

  if (pathname === "/about") return null;

  return (
    <AnimatePresence>
      {isTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center bg-[#0c0c0c] text-white font-['Courier_New',Courier,monospace] overflow-hidden p-4 md:p-10"
          onClick={handleWrapperClick}
        >
          {/* Laser Scan Animation */}
          {showLaser && (
              <motion.div 
                initial={{ top: "-5%" }}
                animate={{ top: "105%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-[2px] bg-[#89f0a2] z-[205] shadow-[0_0_15px_#89f0a2,0_0_30px_rgba(137,240,162,0.6),0_0_60px_rgba(137,240,162,0.4)] opacity-100"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#89f0a2]/20 to-transparent blur-sm transform scale-y-[15]" />
              </motion.div>
          )}

          {/* Header ASCII Art */}
          <div className="w-full flex flex-col items-center mb-10 select-none">
              <pre className="text-[#89f0a2] font-bold text-[8px] md:text-[14px] leading-[1.1] text-center">
{`
██████╗  █████╗ ██████╗ ███████╗██╗  ██╗ █████╗ ███╗   ██╗    ██████╗ ██╗   ██╗██████╗ ███████╗██╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗████╗  ██║    ██╔══██╗██║   ██║██╔══██╗██╔════╝╚██╗ ██╔╝
██║  ██║███████║██████╔╝███████╗███████║███████║██╔██╗ ██║    ██║  ██║██║   ██║██████╔╝█████╗   ╚████╔╝ 
██║  ██║██╔══██║██╔══██╗╚════██║██╔══██║██╔══██║██║╚██╗██║    ██║  ██║██║   ██║██╔══██╗██╔══╝    ╚██╔╝  
██████╔╝██║  ██║██║  ██║███████║██║  ██║██║  ██║██║ ╚████║    ██████╔╝╚██████╔╝██████╔╝███████╗   ██║   
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝   

                                      ███████╗██╗  ██╗███████╗
                                      ██╔════╝╚██╗██╔╝██╔════╝
                                      █████╗   ╚███╔╝ █████╗  
                                      ██╔══╝   ██╔██╗ ██╔══╝  
                                      ███████╗██╔╝ ██╗███████╗
                                      ╚══════╝╚═╝  ╚═╝╚══════╝
`}
              </pre>
              <div className="text-[#89f0a2] tracking-[0.2em] text-xs md:text-sm mt-4 font-medium uppercase">
                  Portfolio Terminal v2.0.5
              </div>
          </div>

          {/* Left-aligned Loading Line for Booting */}
          {bootPhase !== "ready" && (
              <div className="w-full max-w-4xl h-[3px] bg-[#89f0a2]/10 my-8 relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute h-full left-0 bg-[#89f0a2] shadow-[0_0_12px_rgba(137,240,162,0.8)]"
                  />
              </div>
          )}

          {/* Main Content Area */}
          <div className="w-full max-w-4xl flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
                  
                  {/* Booting Text */}
                  {bootPhase !== "ready" && (
                      <div className="flex flex-col items-center space-y-1 mb-10 text-center text-sm md:text-base">
                          {bootText.map((line, i) => (
                              <div key={i} className="text-white opacity-90">{line}</div>
                          ))}
                          {bootPhase === "awaiting-start" && (
                              <motion.div 
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="mt-10 text-white"
                              >
                                  Type <span className="px-2 py-0.5 bg-neutral-800 rounded border border-neutral-700 mx-1">start</span> and press Enter to boot portfolio
                              </motion.div>
                          )}
                      </div>
                  )}

                  {/* Ready Header */}
                  {bootPhase === "ready" && (
                      <div className="mb-6">
                          <p className="text-[#89f0a2]">Welcome to DarshanDubey.exe (v2.0.5) - Portfolio Terminal</p>
                          <p className="text-[#f0db4f] mt-1">Explore my portfolio using CLI commands. Type 'help' for available commands.</p>
                          <div className="w-full h-[1px] bg-[#89f0a2]/30 my-6" />
                          
                          <div className="text-white space-y-4 mb-10">
                              <p className="font-bold">Quick guide for non-technical visitors:</p>
                              <div className="space-y-2 text-sm md:text-base">
                                  <p>- Type <span className="text-[#5ec2ff]">ls</span> to list files and directories in the current location</p>
                                  <p>- Type <span className="text-[#5ec2ff]">cd directory_name</span> to navigate into a directory (folder)</p>
                                  <p>- Type <span className="text-[#5ec2ff]">cd ..</span> to go back to the previous directory</p>
                                  <p>- Type <span className="text-[#5ec2ff]">cat file_name</span> to read the content of a file</p>
                                  <p>- Type <span className="text-[#89f0a2]">run</span> to execute all commands and see everything</p>
                                  <p>- Type <span className="text-[#f0db4f]">help</span> to see all available commands</p>
                              </div>
                              <p className="text-[#f0db4f] text-sm mt-4">Tip: Directories (folders) are shown in <span className="text-[#89f0a2]">green</span>, while files are shown in white.</p>
                          </div>
                      </div>
                  )}

                  {/* History */}
                  <div className="space-y-2">
                      {history.map((entry) => (
                          <div key={entry.id} className="mb-4 last:mb-0">
                              <div className="flex flex-wrap">
                                  <span className="text-[#89f0a2] mr-2">
                                      {PROMPT_USER}@{PROMPT_HOST}:<span className="text-[#5ec2ff]">{entry.path}</span>$
                                  </span>
                                  <span className="text-white">{entry.command}</span>
                              </div>
                              <div className="mt-1">{entry.output}</div>
                          </div>
                      ))}
                  </div>

                  {/* Current Input */}
                  {bootPhase !== "booting" && (
                      <div className="flex flex-wrap items-center mt-2">
                          <span className="text-[#89f0a2] mr-2">
                              {PROMPT_USER}@{PROMPT_HOST}:<span className="text-[#5ec2ff]">{displayPath}</span>$
                          </span>
                          {isRunningTour && (
                              <div className="flex-1 min-w-[100px] bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 opacity-50 flex items-center">
                                  <span>Automated sequence running...</span>
                                  <motion.span 
                                    animate={{ opacity: [0, 1, 0] }} 
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="ml-1 w-2 h-4 bg-[#89f0a2] inline-block"
                                   />
                              </div>
                          )}
                          {!isRunningTour && (
                            <form onSubmit={handleCommand} className="flex-1 relative min-w-[100px]">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 caret-[#89f0a2]"
                                    spellCheck="false"
                                    autoFocus
                                />
                                <div className="absolute left-0 right-0 -bottom-[2px] h-[1px] bg-white opacity-30" />
                            </form>
                          )}
                      </div>
                  )}
                  <div ref={bottomRef} className="h-20" />
              </div>
          </div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #333;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #444;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
