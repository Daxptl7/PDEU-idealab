// src/components/Hero.js
"use client";
import { useState, useEffect } from 'react';

import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  const [opacity, setOpacity] = useState(0.3); // Initial opacity

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity: 0.3 start + scroll factor
      // Saturate at 400px scroll (400/2000 = 0.2)
      const scrollFactor = Math.min(window.scrollY / 2000, 0.2); // Max +0.2 opacity (Total max 0.5)
      setOpacity(0.3 + scrollFactor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className={styles.heroContainer}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url('/campus.jpg')`
      }}
    >
      <div className={styles.content}>
        <Image 
          src="/pdeu_header.png" 
          alt="PDEU Header Logo" 
          width={400} 
          height={150} 
          style={{ marginBottom: '10px', objectFit: 'contain', maxWidth: '90vw' }}
        />
        <h1 className={styles.title}>AICTE IDEA LAB | PDEU</h1>
        <p className={styles.subtitle}>
          Empowering the future through education and research.
        </p>
        
        {/* Apply Button removed as requested. 
           Uncomment the lines below to bring it back:
           
           <Link href="/admissions" className={styles.button}>
             Apply Now
           </Link> 
        */}
      </div>
    </section>
  );
};

export default Hero;