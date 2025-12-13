const Footer = () => {
    return (
        <footer className="py-8 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <p className="text-slate-500 dark:text-slate-400">
                &#169; {new Date().getFullYear()} <span className="text-blue-500">Ashit</span> | Biodata. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer;