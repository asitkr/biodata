import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(formRef.current, {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! This is a demo.");
  };

  return (
    <section id="contact" className="py-12 md:py-20 min-h-screen flex items-center bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 dark:bg-blue-500/10 skew-x-12 transform origin-top pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Let's Connect</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            For further details or if interested, kindly feel free to contact us.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          <div className='lg:w-1/3'>
            <Phone className="w-40 h-40" />
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:w-2/3 space-y-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 h-full flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-6 md:mb-8">Contact Details</h3>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="min-w-0 break-words">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-200">Address</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">H.N.-26, Vill+P.O-Nadpura, P.S-Dhanarua, Subdivision-Masaurhi, District-Patna, State-Bihar, India, 804451</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-200">Phone</h4>
                    <a href="tel:+918002244469" className="text-slate-600 dark:text-slate-400 text-sm md:text-base">+91 8002244469</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;