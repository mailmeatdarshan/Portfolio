import React, { useState, useEffect } from 'react';
import { ExternalLink, Star, Play, Github, Eye, Zap, Sparkles, Rocket, Calendar, Users, Trophy, Code, Globe } from 'lucide-react';
import { projects } from '../../data/portfolioData';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract unique categories from projects data
  const getProjectCategories = () => {
    const categories = projects.reduce((acc, project) => {
      if (project.tech.some(tech => ['React', 'Next.js', 'Angular', 'Vue.js'].includes(tech))) {
        acc.add('Frontend');
      } else if (project.tech.some(tech => ['Node.js', 'Python', 'APIs'].includes(tech))) {
        acc.add('Full Stack');
      } else if (project.tech.some(tech => ['HTML', 'CSS', 'JavaScript'].includes(tech))) {
        acc.add('Web Apps');
      }
      return acc;
    }, new Set());
    return ['All', ...Array.from(categories)];
  };
  
  const categories = getProjectCategories();
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setTimeout(() => setIsLoading(false), 1000);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getProjectCategory = (project) => {
    if (project.tech.some(tech => ['React', 'Next.js', 'Angular', 'Vue.js'].includes(tech))) {
      return 'Frontend';
    } else if (project.tech.some(tech => ['Node.js', 'Python', 'APIs'].includes(tech))) {
      return 'Full Stack';
    } else {
      return 'Web Apps';
    }
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => getProjectCategory(project) === selectedCategory);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      {/* Floating Cursor Effect */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: hoveredProject ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' : 'transparent'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">Featured Work</span>
          </div>
          
          <h2 className="text-7xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Featured Projects
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10" />
          </h2>
          
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-purple-300">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">{projects.length}+ Projects</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-300">
              <Code className="w-5 h-5" />
              <span className="font-semibold">15+ Technologies</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">50K+ Views</span>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Pushing the boundaries of what's possible through code, creativity, and cutting-edge technology. 
            Each project is a journey into the future of digital experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-2 p-2 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer ${
                project.featured 
                  ? 'lg:col-span-2 min-h-[600px]' 
                  : 'min-h-[500px]'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Glowing Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
              </div>
              
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        {project.id.toString().padStart(2, '0')}
                      </span>
                      <div className="absolute inset-0 text-5xl font-black text-purple-500/20 blur-sm">
                        {project.id.toString().padStart(2, '0')}
                      </div>
                    </div>
                    
                    {project.featured && (
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-yellow-400/25 animate-pulse">
                        <Star className="w-4 h-4" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-green-400 to-emerald-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-400/25">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>

                {/* Middle Section - Project Details */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm text-purple-300 font-semibold bg-purple-500/20 px-3 py-1 rounded-full">
                        {getProjectCategory(project)}
                      </span>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>2024</span>
                      </div>
                    </div>
                    
                    <h3 className="text-4xl font-black mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex items-center space-x-6 mb-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <span>Web App</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>1.2K+ Views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20 hover:border-purple-400/50 hover:bg-purple-500/20 transition-all duration-300 hover:scale-105"
                        style={{
                          animationDelay: `${techIndex * 100}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <Rocket className="w-5 h-5 group-hover/btn:animate-bounce relative z-10" />
                      <span className="relative z-10 text-lg">Launch Demo</span>
                      <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300 relative z-10" />
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    </a>
                    
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center justify-center space-x-3 px-8 py-4 border-2 border-white/30 rounded-2xl font-bold text-white hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      <span className="text-lg">View Code</span>
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </a>
                  </div>

                  {/* Additional Project Info */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Built with passion & precision</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>Recently Updated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Effects */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-purple-400/20 rounded-full blur-md animate-pulse" />
                </div>
              </div>

              {/* Interactive Glow on Hover */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.1) 0%, transparent 50%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer group">
            <Eye className="w-6 h-6 text-purple-400 group-hover:animate-pulse" />
            <span className="text-xl font-semibold text-white">Explore More Projects</span>
            <Zap className="w-6 h-6 text-pink-400 group-hover:animate-bounce" />
          </div>
          
          <p className="text-gray-400 mt-4 text-lg">
            Have an exciting project in mind? Let's build something amazing together!
          </p>
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

export default Projects;
