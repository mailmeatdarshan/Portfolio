// src/components/Hero/Hero.js
import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code, Zap, Rocket } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import TypewriterText from '../common/TypewriterText';

const Hero = () => {
  const getIcon = (iconName) => {
    const icons = { Github, Linkedin, Mail };
    return icons[iconName];
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-4 py-2 border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Available for projects</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Hi, I'm
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            
            <div className="text-2xl lg:text-3xl text-gray-300">
              <TypewriterText
                strings={personalInfo.typewriterStrings}
                className="text-purple-400 font-semibold"
              />
            </div>
          </div>

          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Let's Work Together</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 hover:border-purple-400">
              View My Work
            </button>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          <div className="relative w-96 h-96 mx-auto">
            <div className="absolute inset-4 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full animate-spin-slow" />
            <div className="absolute inset-8 bg-gradient-to-br from-slate-900 to-purple-900 rounded-full flex items-center justify-center">
              {/* <div className="text-8xl animate-bounce">👨‍💻</div> */}
              <div className="absolute inset-8 bg-gradient-to-br from-slate-900 to-purple-900 rounded-full flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-600 to-transparent opacity-60 z-10"></div>
                <img 
                  src="/images/profile/avatar.jpg" 
                  alt="Darshan Dubey" 
                  className="w-full h-full object-cover transform transition-all duration-500 ease-in-out hover:scale-125 hover:-rotate-12 hover:shadow-2xl hover:shadow-purple-600 hover:brightness-110 hover:opacity-90 hover:translate-x-4 hover:translate-y-4"/>
              </div>
            </div>
            {/* Floating tech icons */}
            <div className="absolute -top-4 -right-4 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl animate-pulse">
              <Code className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl animate-pulse delay-500">
              <Zap className="w-6 h-6" />
            </div>
            <div className="absolute top-1/2 -right-8 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl animate-pulse delay-1000">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;