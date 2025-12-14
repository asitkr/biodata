const Footer = () => {
    return (
        <footer className="py-8 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <p className="text-slate-500 dark:text-slate-400">
                &#169; {new Date().getFullYear()}  <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`font-semibold cursor-pointer transition-colors duration-300 dark:text-blue-400 dark:hover:text-blue-300 text-blue-500 hover:text-blue-600`}
          >
            Ashit
          </a> | Biodata. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer;