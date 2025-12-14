import { useState, useEffect } from 'react';

import './App.css';
import { Theme } from './types';

import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import BasicDetails from './components/BasicDetails';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme(Theme.LIGHT);
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const html = document.documentElement;
    if (theme === Theme.DARK) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div className="antialiased selection:bg-blue-500 selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <BasicDetails />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
