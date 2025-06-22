// src/components/Contact/Contact.js
import React from 'react';
import { Mail, Linkedin, Github, Heart, Instagram, Twitter, Code2, Phone, MapPin, Calendar } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const Contact = () => {
  const contactMethods = [
    {
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      title: "Email Me",
      subtitle: personalInfo.email,
      description: "Drop me a line anytime",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30 hover:border-purple-400/50"
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
      external: true
    },
    {
      href: "https://github.com/mailmeatdarshan", // Replace with your GitHub username
      icon: Github,
      title: "GitHub",
      subtitle: "Code Repository",
      description: "Explore my projects & contributions",
      gradient: "from-gray-600 to-slate-600",
      bgGradient: "from-gray-500/20 to-slate-500/20",
      border: "border-gray-500/30 hover:border-gray-400/50",
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
      external: true
    }
  ];

  const ContactCard = ({ contact, index }) => {
    const IconComponent = contact.icon;
    
    return (
      <a
        href={contact.href}
        {...(contact.external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group p-6 bg-gradient-to-br ${contact.bgGradient} rounded-2xl border ${contact.border} 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-${contact.gradient.split(' ')[1].split('-')[1]}-500/20
          transform-gpu will-change-transform`}
        style={{ animationDelay: `${index * 100}ms` }}
        aria-label={`${contact.title} - ${contact.description}`}
      >
        <div className={`w-14 h-14 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center 
          mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-gray-100 transition-colors">
            {contact.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2 font-medium">
            {contact.subtitle}
          </p>
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            {contact.description}
          </p>
        </div>
        
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      </a>
    );
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-blue-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Create Something
            </span>
            <br />
            <span className="text-white">Amazing Together</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I'm passionate about collaborating on 
            projects that push boundaries and create meaningful impact.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-12">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Available for remote work</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Usually responds within 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Open to challenges</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Primary Contact
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((contact, index) => (
              <ContactCard key={contact.title} contact={contact} index={index} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Social & Coding Platforms
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {socialPlatforms.map((platform, index) => (
              <ContactCard key={platform.title} contact={platform} index={index + 3} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-gray-400 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
            <span>Made with </span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span>by {personalInfo.name}</span>
          </div>
          
          <p className="text-gray-500 mt-4 text-sm">
            "Great things are done by a series of small things brought together." - Vincent Van Gogh
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;