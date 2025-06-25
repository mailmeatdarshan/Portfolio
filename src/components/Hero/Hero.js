// src/components/Hero/Hero.js
import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code, Zap, Rocket, ExternalLink, Star, Heart, Coffee } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import TypewriterText from '../common/TypewriterText';

const Hero = ({ scrollToProjects, scrollToContact, openResume }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute p-3 bg-gradient-to-br rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10
        animate-bounce hover:animate-none hover:scale-125 transition-all duration-500 cursor-pointer group ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Interactive cursor glow */}
      <div 
        className="absolute w-64 h-64 bg-gradient-radial from-purple-400/20 to-transparent rounded-full pointer-events-none blur-2xl transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-full px-6 py-3 border border-purple-400/40 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300 hover:scale-105 group">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <span className="text-sm font-medium text-purple-200 group-hover:text-white transition-colors">
              Available for exciting projects
            </span>
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight">
              <div className="overflow-hidden">
                <span className={`block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                  Hi, I'm
                </span>
              </div>
              <div className="overflow-hidden">
                <span className={`block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent transform transition-all duration-1000 delay-400 hover:scale-105 transition-transform cursor-default ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                  {personalInfo.name}
                </span>
              </div>
            </h1>
            
            {/* Typewriter Section */}
            <div className={`text-2xl lg:text-4xl text-gray-300 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <TypewriterText
                strings={personalInfo.typewriterStrings}
                className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text font-bold"
              />
            </div>
          </div>

          {/* Bio */}
          <p className={`text-xl text-gray-300 max-w-2xl leading-relaxed transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            <button
              onClick={scrollToContact} 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Let's Create Magic</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            </button>
            
            <button 
              onClick={scrollToProjects}
              className="px-8 py-4 border-2 border-purple-400/50 rounded-2xl font-bold text-lg hover:bg-purple-500/20 transition-all duration-500 hover:border-purple-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1 backdrop-blur-sm"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Explore My Universe
              </span>
            </button>

            <button 
              onClick={openResume}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-1 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>View Resume</span>
            </button>
          </div>

          {/* Enhanced Social Links */}
          <div className={`flex space-x-4 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  className="group relative p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm border border-white/10 hover:border-white/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side - Enhanced Profile */}
        <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {/* Main Profile Container */}
          <div className="relative w-96 h-96 mx-auto group">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full animate-spin-slow opacity-80" />
            
            {/* Middle ring */}
            <div className="absolute inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full animate-reverse-spin opacity-60" />
            
            {/* Inner container */}
            <div className="absolute inset-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/10">
              {/* Profile Image */}
              <div className="absolute inset-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/60 via-transparent to-pink-400/60 z-10" />
                <img 
                  src="/images/profile/avatar.jpg" 
                  alt="Darshan Dubey" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3 group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Floating Icons */}
            <FloatingIcon 
              icon={Code} 
              className="from-blue-500 to-cyan-500 -top-6 -right-6" 
              delay={0}
            />
            <FloatingIcon 
              icon={Zap} 
              className="from-yellow-500 to-orange-500 -bottom-6 -left-6" 
              delay={0.5}
            />
            <FloatingIcon 
              icon={Rocket} 
              className="from-red-500 to-pink-500 top-1/2 -right-12" 
              delay={1}
            />
            <FloatingIcon 
              icon={Star} 
              className="from-purple-500 to-indigo-500 top-8 -left-8" 
              delay={1.5}
            />
            <FloatingIcon 
              icon={Coffee} 
              className="from-amber-500 to-orange-500 bottom-8 -right-8" 
              delay={2}
            />

            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute -top-4 left-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
              <div className="absolute -bottom-4 left-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50" />
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
              <div className="absolute top-1/2 -right-4 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;