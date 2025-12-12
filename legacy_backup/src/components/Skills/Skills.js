// src/components/Skills/Skills.js
import React from 'react';
import { Target, Palette, Database, Lightbulb, Code, Brush, Server, Brain } from 'lucide-react';
import { skills } from '../../data/portfolioData';

const Skills = () => {
  const expertiseAreas = [
    {
      icon: <Code className="w-7 h-7" />,
      title: "Full Stack Development",
      description: "End-to-end application development with modern frameworks",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Brush className="w-7 h-7" />,
      title: "UI/UX Design",
      description: "Beautiful, user-centered interfaces that convert",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: "Database Management",
      description: "Ensuring data is organized, secure, and accessible",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Problem Solving",
      description: "Turning complex challenges into elegant solutions",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-black">
      {/* Animated Background - Matching Projects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-spin-slow" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Target className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">Skills & Expertise</span>
          </div>
          
          <h2 className="text-7xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Crafting Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Excellence
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10" />
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            With 3+ years of experience, I've mastered a diverse tech stack that enables me 
            to build full-scale applications from concept to deployment. Currently working 
            with a growing startup while maintaining freelance excellence.
          </p>
        </div>

        {/* Expertise Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              className="group relative p-6 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glowing Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className={`inline-flex p-4 bg-gradient-to-r ${area.gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25`}>
                {area.icon}
              </div>
              
              <h3 className="font-black text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                {area.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">Technical Arsenal</h3>
            <p className="text-gray-300 text-lg">Technologies and tools I work with daily</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative p-6 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                        {skill.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {skill.name}
                        </h4>
                        <span className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 border border-purple-500/30 font-semibold">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{skill.experience}</div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                    {skill.description}
                  </p>
                  
                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-semibold">Proficiency Level</span>
                      <span className="text-lg font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="relative">
                      <div className="w-full bg-gray-800/50 rounded-full h-4 overflow-hidden border border-gray-700/50">
                        <div
                          className={`h-4 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out relative overflow-hidden shadow-lg`}
                          style={{ width: `${skill.level}%` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-shimmer" />
                        </div>
                      </div>
                      
                      {/* Glowing progress indicator */}
                      <div
                        className={`absolute top-0 h-4 rounded-full bg-gradient-to-r ${skill.color} opacity-60 blur-sm transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300" />
                  <div className="absolute top-1/2 right-5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-3">Ready to Build Something Amazing?</h3>
              <p className="text-gray-300 mb-6 text-lg">Let's discuss how these skills can bring your project to life</p>
              <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 group-hover:animate-pulse">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;