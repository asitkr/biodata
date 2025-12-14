import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
      gsap.from(imgRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
      gsap.from(scrollRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-16 md:pb-0 overflow-hidden relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

          {/* Left Text */}
          <div ref={textRef} className="flex-1 text-center md:text-left space-y-4 md:space-y-6 order-1 md:order-1">
            <h2 className="text-blue-500 dark:text-blue-400 font-semibold tracking-wide uppercase text-xs md:text-sm">
              Biodata
            </h2>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 md:mb-6 text-center md:text-left">
              Hi, <span className="text-blue-500">welcome you</span>
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Ashit Kumar Sinha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Software Developer
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto md:mx-0">
              Currently, I work as a Software Developer with Corporate Infotech Pvt. Ltd., Noida, UP. I completed my B.Tech in Computer Science and Engineering from SisTech, Bhopal.
            </p>
          </div>

          {/* Right Image */}
          <div ref={imgRef} className="flex-1 relative w-full max-w-sm md:max-w-lg lg:max-w-xl order-2 md:order-2 mt-8 md:mt-0">
            {/* Background Blobs - Smaller on Mobile */}
            <div className="absolute top-0 -left-4 w-48 h-48 md:w-72 md:h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-48 h-48 md:w-72 md:h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-10 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500 mx-auto">
              <img
                src="/assests/p1.jpg"
                alt="Profile"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase group-hover:text-blue-500 transition-colors duration-300">
          Scroll Down
        </span>
        <div className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm group-hover:border-blue-500/50 transition-colors duration-300">
          <ChevronDown className="text-slate-600 dark:text-slate-300 group-hover:text-blue-500 animate-bounce transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Hero;