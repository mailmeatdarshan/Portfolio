// src/components/Skills/Skills.js
import React from 'react';
import { Target, Palette } from 'lucide-react';
import { skills } from '../../data/portfolioData';

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills &
              </span>
              <br />
              <span className="text-white">Expertise</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              With 3+ years of experience, I've mastered a diverse tech stack that enables me 
              to build full-scale applications from concept to deployment. Currently working 
              with a growing startup while maintaining freelance excellence.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Full Stack Development</h3>
                  <p className="text-gray-400">End-to-end application development</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">UI/UX Design</h3>
                  <p className="text-gray-400">Beautiful, user-centered interfaces</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">DataBase Management</h3>
                  <p className="text-gray-400">Ensuring data is organized, secure, and accessible</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Problem Solving</h3>
                  <p className="text-gray-400">Turning challenges into opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {skills.map((skill, index) => (
    <div
      key={skill.name}
      className="group p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header with icon, name, and category */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
          </span>
          <div>
            <span className="font-semibold text-lg">{skill.name}</span>
            <span className="ml-2 px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300">
              {skill.category}
            </span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-400">
          <div>{skill.experience}</div>
          {/* <div className="text-xs">{skill.projects} projects</div> */}
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        {skill.description}
      </p>
      
      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Proficiency</span>
          <span className="text-sm font-medium text-white">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 group-hover:animate-pulse`}
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
};

export default Skills;