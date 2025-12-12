// src/components/Contact/Contact.js
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Heart, Instagram, Twitter, Code2, Phone, MapPin, Calendar, Sparkles, Rocket, Star, Zap, ExternalLink, Send } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactMethods = [
    {
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      title: "Email Me",
      subtitle: personalInfo.email,
      description: "Drop me a line anytime",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30 hover:border-purple-400/50",
      shadowColor: "purple-500/25",
      status: "Primary",
      featured: true
    },
    {
      href: "https://www.linkedin.com/in/darshandubey25/",
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Professional Network",
      description: "Let's connect professionally",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30 hover:border-blue-400/50",
      shadowColor: "blue-500/25",
      status: "Professional",
      external: true
    },
    {
      href: "https://github.com/mailmeatdarshan",
      icon: Github,
      title: "GitHub",
      subtitle: "Code Repository",
      description: "Explore my projects & contributions",
      gradient: "from-gray-600 to-slate-600",
      bgGradient: "from-gray-500/20 to-slate-500/20",
      border: "border-gray-500/30 hover:border-gray-400/50",
      shadowColor: "gray-500/25",
      status: "Code",
      external: true
    }
  ];

  const socialPlatforms = [
    {
      href: "https://x.com/Dubey____",
      icon: Twitter,
      title: "X (Twitter)",
      subtitle: "@Dubey____",
      description: "Follow for tech updates & thoughts",
      gradient: "from-sky-500 to-blue-500",
      bgGradient: "from-sky-500/20 to-blue-500/20",
      border: "border-sky-500/30 hover:border-sky-400/50",
      shadowColor: "sky-500/25",
      status: "Updates",
      external: true
    },
    {
      href: "https://leetcode.com/username",
      icon: Code2,
      title: "LeetCode",
      subtitle: "Coding Practice",
      description: "Check out my problem-solving skills",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-500/20 to-yellow-500/20",
      border: "border-orange-500/30 hover:border-yellow-400/50",
      shadowColor: "orange-500/25",
      status: "Coding",
      external: true
    },
    {
      href: "https://instagram.com/main.darshan",
      icon: Instagram,
      title: "Instagram",
      subtitle: "@main.darshan",
      description: "Behind the scenes & life updates",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      border: "border-pink-500/30 hover:border-rose-400/50",
      shadowColor: "pink-500/25",
      status: "Personal",
      external: true
    }
  ];

  const ContactCard = ({ contact, index, isPrimary = false }) => {
    const IconComponent = contact.icon;
    const cardId = `card-${index}`;
    
    return (
      <a
        href={contact.href}
        {...(contact.external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group relative p-8 bg-gradient-to-br ${contact.bgGradient} rounded-3xl border ${contact.border} 
          transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${contact.shadowColor}
          transform-gpu will-change-transform backdrop-blur-sm overflow-hidden ${
            isPrimary ? 'md:col-span-2 lg:col-span-1' : ''
          }`}
        style={{ animationDelay: `${index * 150}ms` }}
        onMouseEnter={() => setHoveredCard(cardId)}
        onMouseLeave={() => setHoveredCard(null)}
        aria-label={`${contact.title} - ${contact.description}`}
      >
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-500">
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${contact.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-green-400 to-emerald-400 text-black px-3 py-1 rounded-full text-xs font-bold">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
          <span>{contact.status}</span>
        </div>

        {/* Featured Badge */}
        {contact.featured && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-yellow-400/25 animate-pulse">
            <Star className="w-3 h-3" />
            <span>Primary</span>
          </div>
        )}

        {/* Glowing Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${contact.bgGradient} blur-xl`} />
        </div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-16 h-16 bg-gradient-to-r ${contact.gradient} rounded-2xl flex items-center justify-center 
            mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-${contact.shadowColor}`}>
            <IconComponent className="w-8 h-8 text-white group-hover:animate-pulse" />
          </div>
          
          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
              {contact.title}
            </h3>
            
            <p className="text-sm text-purple-300 font-semibold bg-purple-500/20 px-3 py-1 rounded-full inline-block">
              {contact.subtitle}
            </p>
            
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
              {contact.description}
            </p>
          </div>
        </div>
        
        {/* Hover Effect Icons */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
          <div className="relative">
            {contact.external ? (
              <ExternalLink className="w-6 h-6 text-white" />
            ) : (
              <Send className="w-6 h-6 text-white" />
            )}
            <div className="absolute inset-0 w-6 h-6 bg-purple-400/20 rounded-full blur-md animate-pulse" />
          </div>
        </div>

        {/* Interactive Glow on Hover */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.1) 0%, transparent 50%)`
          }}
        />
      </a>
    );
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black">
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
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: hoveredCard ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' : 'transparent'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">Let's Connect</span>
          </div>
          
          <h2 className="text-7xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Let's Create Something
            </span>
            <br />
            <span className="text-white">Amazing Together</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10" />
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I'm passionate about collaborating on 
            projects that push boundaries and create meaningful impact.
          </p>

          {/* Status Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 rounded-2xl border border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">Available for remote work</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-6 py-3 rounded-2xl border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Usually responds within 24 hours</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Open to challenges</span>
            </div>
          </div>
        </div>

        {/* Primary Contact Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Primary Contact
            </h3>
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((contact, index) => (
              <ContactCard key={contact.title} contact={contact} index={index} isPrimary={contact.featured} />
            ))}
          </div>
        </div>

        {/* Social Platforms Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Star className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
              Social & Coding Platforms
            </h3>
            <Star className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {socialPlatforms.map((platform, index) => (
              <ContactCard key={platform.title} contact={platform} index={index + 3} />
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-3 text-gray-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-8 py-4 rounded-2xl backdrop-blur-sm border border-purple-500/30 hover:scale-105 transition-transform duration-300 mb-6">
            <span className="text-lg font-semibold">Made with </span>
            <Heart className="w-6 h-6 text-red-400 animate-pulse" />
            <span className="text-lg font-semibold">by {personalInfo.name}</span>
          </div>
          
          <p className="text-gray-400 text-lg italic max-w-2xl mx-auto leading-relaxed">
            "Great things are done by a series of small things brought together." 
            <br />
            <span className="text-purple-400 font-semibold">- Vincent Van Gogh</span>
          </p>

          {/* Call to Action */}
          <div className="mt-12">
            <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <Sparkles className="w-6 h-6 text-purple-400 group-hover:animate-pulse" />
              <span className="text-xl font-semibold text-white">Ready to collaborate?</span>
              <Rocket className="w-6 h-6 text-pink-400 group-hover:animate-bounce" />
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
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;