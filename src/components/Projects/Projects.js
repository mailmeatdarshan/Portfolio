// src/components/Projects/Projects.js
import React from 'react';
import { ExternalLink, Star, Play, Github } from 'lucide-react';
import { projects } from '../../data/portfolioData';

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my latest work, where creativity meets functionality. 
            Each project tells a unique story of innovation and problem-solving.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                project.featured 
                  ? 'lg:col-span-2 h-96' 
                  : 'h-80'
              }`}
            >
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
              </div>

               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: project.image }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="relative h-full p-8 flex flex-col justify-end">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl font-bold text-purple-400">
                    {project.id.toString().padStart(2, '0')}
                  </span>
                  {project.featured && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      <Star className="w-4 h-4" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-3xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-transform">
                    <Play className="w-4 h-4" />
                    <span>Live Demo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </button>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;