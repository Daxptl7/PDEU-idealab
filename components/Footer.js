// src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'; 
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      
      {/* 1. MAIN CONTENT (Black Section) */}
      <div className={styles.content}>
        
        {/* COL 1: ABOUT */}
        <div className={styles.column}>
          <h3>About Idea Lab</h3>
          <p className={styles.description}>
            Empowering students to turn imagination into reality. A 24x7 open prototyping facility at Pandit Deendayal Energy University.
          </p>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/beneficiaries">Beneficiaries</Link></li>
            <li><Link href="/people">People</Link></li>
            <li><Link href="/events">Events & Workshops</Link></li>
            <li><Link href="/gallery">Project Gallery</Link></li>
          </ul>
        </div>

        {/* COL 3: FACILITIES */}
        <div className={styles.column}>
          <h3>Lab Facilities</h3>
          <ul>
            <li><Link href="/arsenal">3D Printing Station</Link></li>
            <li><Link href="/arsenal">Laser Cutting</Link></li>
            <li><Link href="/arsenal">CNC Machining</Link></li>
            <li><Link href="/arsenal">IoT & Electronics</Link></li>
            <li><Link href="/arsenal">Woodworking Shop</Link></li>
          </ul>
        </div>

        {/* COL 4: CONTACT */}
        <div className={styles.column}>
          <h3>Contact Us</h3>
          
          <div className={styles.contactItem}>
            <MapPin size={18} className={styles.contactIcon} />
            <span>
              PDEU Campus, Knowledge Corridor,<br/> 
              Raisan, Gandhinagar - 382007
            </span>
          </div>

          <div className={styles.contactItem}>
            <Phone size={18} className={styles.contactIcon} />
            <span>+91 79 2327 5060</span>
          </div>

          <div className={styles.contactItem}>
            <Mail size={18} className={styles.contactIcon} />
            <span>idealab@pdeu.ac.in</span>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM BAR (Red Section) */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
            
            {/* Left Side: PDEU Logo */}
            <div className={styles.logoWrapper}>
              <Image 
                  src="/logo.png"  /* UPDATED: Using logo.png as requested */
                  alt="PDEU Logo"
                  width={280} 
                  height={80} 
                  style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Right Side: Icons + Copyright */}
            <div className={styles.rightSection}>
                
                {/* Social Icons */}
                <div className={styles.socialWrapper}>
                  <a href="https://linkedin.com" target="_blank" className={styles.socialBox} aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" className={styles.socialBox} aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" className={styles.socialBox} aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://youtube.com" target="_blank" className={styles.socialBox} aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                </div>

                {/* Copyright Text (Moved Here) */}
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} AICTE Idea Lab @ PDEU. All rights reserved.
                </p>

            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;