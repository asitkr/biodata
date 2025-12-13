import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Theme, NavItem } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".nav-item", 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleScroll = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer" onClick={() => handleScroll('#hero')}>
              Ashit
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {NAV_ITEMS?.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScroll(item.href)}
                  className="nav-item text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item?.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="nav-item p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-yellow-400"
                aria-label="Toggle Theme"
              >
                {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-blue-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.href)}
                className="block w-full text-left text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center px-3 py-2">
              <span className="text-slate-700 dark:text-slate-300 mr-2">Theme:</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400"
              >
                {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
