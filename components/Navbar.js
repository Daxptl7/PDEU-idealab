"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // <--- 1. Import this
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const pathname = usePathname(); // <--- 2. Get current path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LOGIC: WHEN TO BE TRANSPARENT? ---
  // Only be transparent if:
  // 1. We are on the Home Page ('/') 
  // 2. AND we haven't scrolled down yet.
  // Everywhere else (like /events), it will default to 'scrolled' (Red).
  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <header 
      /* Apply class based on the logic above */
      className={`${styles.headerContainer} ${isTransparent ? styles.transparent : styles.scrolled}`}
    >
      <nav className={styles.mainNav}>
        <div className={styles.container}>
          
          {/* LOGO SECTION */}
          {/* LOGO SECTION REMOVED */}

          {/* HAMBURGER TOGGLE (Visible on Mobile) */}
          <button 
            className={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
          </button>

          {/* MENU SECTION */}
          <ul className={`${styles.menu} ${isOpen ? styles.showMenu : ''}`}>
            <li><Link href="/" className={styles.menuLink} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li id='l1'>
              <Link href="/industrycontributions" className={`${styles.menuLink} ${styles.stackedLink}`} onClick={() => setIsOpen(false)}>
                <span>Industry</span>
                <span>Contributions</span>
              </Link>
            </li>
            <li><Link href="/beneficiaries" className={styles.menuLink} onClick={() => setIsOpen(false)}>Beneficiaries</Link></li>
            <li><Link href="/people" className={styles.menuLink} onClick={() => setIsOpen(false)}>People</Link></li>
            <li><Link href="/equipment" className={styles.menuLink} onClick={() => setIsOpen(false)}>Equipment</Link></li>
            <li><Link href="/gallery" className={styles.menuLink} onClick={() => setIsOpen(false)}>Gallery</Link></li>
            <li><Link href="/events" className={styles.menuLink} onClick={() => setIsOpen(false)}>Events</Link></li>
            
            {/* Contact Button */}
            <li>
                <Link href="/contact" className={`${styles.menuLink} ${styles.contactBtn}`} onClick={() => setIsOpen(false)}>
                    Contact
                </Link>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;