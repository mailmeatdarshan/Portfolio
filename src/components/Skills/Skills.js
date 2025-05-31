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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <span className="font-semibold text-lg">{skill.name}</span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 group-hover:animate-pulse`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;