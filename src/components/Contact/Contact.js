// src/components/Contact/Contact.js
import React from 'react';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Create Something
          </span>
          <br />
          <span className="text-white">Amazing Together</span>
        </h2>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Ready to bring your vision to life? I'm passionate about collaborating on 
          projects that push boundaries and create meaningful impact.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Me</h3>
            <p className="text-gray-400">{personalInfo.email}</p>
          </a>

          <a
            href="#"
            className="group p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Linkedin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
            <p className="text-gray-400">Connect with me</p>
          </a>

          <a
            href="#"
            className="group p-8 bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-2xl border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Github className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">GitHub</h3>
            <p className="text-gray-400">View my code</p>
          </a>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-400 animate-pulse" />
          <span>by {personalInfo.name}</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;