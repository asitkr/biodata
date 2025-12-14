import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Biodata } from '../types';
import { MapPin, Briefcase, Mail, Phone, Calendar, User, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const biodata: Biodata = {
  name: "Ashit Kumar Sinha",
  role: "Software Engineer",
  company: "TechNova Solutions",
  address: "124 Innovation Blvd, Silicon Valley, CA",
  email: "alex.sterling@example.com",
  phone: "+1 (555) 123-4567",
  dob: "September 15, 1992",
  nationality: "American"
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-img", {
        scrollTrigger: {
          trigger: ".about-img",
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".about-detail-item", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-16 md:w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:items-center">

          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 about-img px-4 md:px-0">
            <div className="relative group max-w-sm mx-auto md:max-w-none">
              <div className="absolute inset-0 bg-blue-500 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[3/4] md:aspect-auto md:h-[700px]">
                <img
                  src="/assests/p2.jpg"
                  alt="About Me"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 md:mb-6 text-center md:text-left">
              Hi, <span className="text-blue-500">Welcome to my biodata!</span>
            </h3>

            <div className="grid grid-cols-1 gap-4 about-grid">
              <div className="w-full flex flex-col about-detail-item flex items-baseline gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-base text-slate-500 dark:text-slate-400">
                <p>Currently, I work as a Software Developer with Corporate Infotech Pvt. Ltd., Noida, UP.</p>
                <p>I completed my B.Tech in Computer Science and Engineering from SisTech Bhopal, Mp.</p>
                <p>My parents and family live in Patna, Bihar. I am part of a close-knit family of four. My father is a farmer, my mother is a homemaker, and my sister is also a homemaker. We lead a simple and peaceful life based on honesty, love, and strong family values.</p>
                <p>I am a focused and responsible person who believes in staying humble, working hard, and continuously improving myself—both in life and at work. Outside of my job, I enjoy learning about new technologies, staying fit, and spending quality time with my family. I value meaningful conversations and believe that mutual respect and understanding are the most important aspects of any relationship.</p>
                <p>I am looking for companionship built on loyalty, trust, mutual respect, and honest communication, where both partners support each other and grow together in every phase of life.</p>
                <p>Please feel free to reach out to me if you think we share similar values or would like to know more. I am open to serious talks and meaningful connections.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;