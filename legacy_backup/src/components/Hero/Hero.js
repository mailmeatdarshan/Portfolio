// src/components/Hero/Hero.js
import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code, Zap, Rocket, ExternalLink, Star, Play } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import TypewriterText from '../common/TypewriterText';

const Hero = ({ scrollToProjects, scrollToContact, openResume }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getIcon = (iconName) => {
    const icons = { Github, Linkedin, Mail };
    return icons[iconName];
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating Cursor Effect */}
      <div 
        className="fixed w-12 h-12 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          background: isHovered ? 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)' : 'transparent',
          filter: 'blur(1px)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl px-6 py-3 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-purple-300 font-semibold">Available for projects</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-black leading-tight">
              <span className="block mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient-x">
                Hi, I'm
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                {personalInfo.name}
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10" />
            </h1>
            
            {/* Typewriter Text */}
            <div className="text-2xl lg:text-4xl text-gray-300 relative">
              <TypewriterText
                strings={personalInfo.typewriterStrings}
                className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text font-black animate-gradient-x"
              />
            </div>
          </div>

          {/* Bio */}
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed group">
            <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
              {personalInfo.bio}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToContact} 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                <span>Let's Work Together</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={scrollToProjects}
              className="group px-8 py-4 border-2 border-purple-500/50 rounded-2xl font-bold text-lg hover:bg-purple-500/20 transition-all duration-300 hover:border-purple-400 hover:scale-105 backdrop-blur-sm"
            >
              <span className="flex items-center space-x-3">
                <Play className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                <span>View My Work</span>
              </span>
            </button>

            <button 
              onClick={openResume}
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40"
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>View Resume</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  className="group p-4 bg-white/5 rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm border border-white/10 hover:border-purple-400/50"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-6 h-6 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative">
          {/* Glowing Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative w-96 h-96 mx-auto group">
            {/* Animated Ring */}
            <div className="absolute inset-4 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-full animate-spin-slow opacity-80" />
            
            {/* Inner Ring */}
            <div className="absolute inset-6 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full animate-spin-slow opacity-60" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
            
            {/* Profile Container */}
            <div className="absolute inset-8 bg-gradient-to-br from-slate-900 via-purple-900 to-black rounded-full flex items-center justify-center overflow-hidden border-4 border-purple-500/30 hover:border-purple-400/60 transition-all duration-500">
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/40 via-pink-500/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
              
              {/* Profile Image */}
              <img 
                src="/images/profile/avatar.jpg" 
                alt="Darshan Dubey" 
                className="w-full h-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-125 group-hover:-rotate-6 hover:brightness-110"
              />
              
              {/* Interactive Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
              </div>
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute -top-6 -right-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl animate-float shadow-lg shadow-blue-500/25 hover:scale-110 transition-transform duration-300 cursor-pointer group/icon">
              <Code className="w-7 h-7 group-hover/icon:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl animate-float shadow-lg shadow-green-500/25 hover:scale-110 transition-transform duration-300 cursor-pointer group/icon" style={{ animationDelay: '500ms' }}>
              <Zap className="w-7 h-7 group-hover/icon:animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300" />
            </div>
            
            <div className="absolute top-1/2 -right-10 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl animate-float shadow-lg shadow-orange-500/25 hover:scale-110 transition-transform duration-300 cursor-pointer group/icon" style={{ animationDelay: '1000ms' }}>
              <Rocket className="w-7 h-7 group-hover/icon:animate-bounce" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300" />
            </div>

            {/* Featured Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-yellow-400/25 animate-pulse hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Star className="w-4 h-4" />
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;