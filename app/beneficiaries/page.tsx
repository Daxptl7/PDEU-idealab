// src/app/beneficiaries/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Lightbulb, Printer, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from './beneficiaries.module.css';

// --- DATA ---
const beneficiaries = [
  {
    id: "startup-incubation",
    title: "Start-up Incubation & Funding Support",
    subtitle: "",
    icon: <TrendingUp size={32} />,
    description: "From ideation to execution, our incubation programs offer seed funding, strategic mentoring, and investor access to student-led start-ups.",
    styleClass: "cardOrange"
  },
  {
    id: "entrepreneurship-events",
    title: "Leading Entrepreneurship Events",
    subtitle: "",
    icon: <Users size={32} />,
    description: "Through events like Startup Catalyst and Innovation Conclave, we bring together visionaries, investors, and changemakers to celebrate innovation.",
    styleClass: "cardPurple"
  },
  {
    id: "startup-studios",
    title: "Start-up Studios",
    subtitle: "",
    icon: <Lightbulb size={32} />,
    description: "Creative labs designed for interdisciplinary collaboration, where engineering meets design, business meets innovation, and imagination meets execution.",
    styleClass: "cardBlue"
  },
  {
    id: "fabrication-lab",
    title: "Fabrication Lab",
    subtitle: "",
    icon: <Printer size={32} />,
    description: "Equipped with 3D printers, CNC routers, and rapid prototyping tools, the lab bridges imagination with reality, allowing founders to transform blueprints into products.",
    styleClass: "cardTeal"
  },
  {
    id: "incubation-centre",
    title: "Start Incubation Centre",
    subtitle: "",
    icon: <Rocket size={32} />, 
    description: "A fully equipped hub offering mentorship, networking, and commercialization support for promising ventures ready to enter the market.",
    styleClass: "cardPink"
  }
];

export default function BeneficiariesPage() {
  return (
    <div className={styles.mainContainer}>
      
      {/* 1. HEADER */}
      <section className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge Removed Here */}
          
          <h1 className={styles.title}>
            Who will be <span className={styles.highlight}>Benefited?</span>
          </h1>
          <p className={styles.subtitle}>
            The AICTE Idea Lab creates value for everyone—from students building their first robot to policymakers shaping the future of education.
          </p>
        </motion.div>
      </section>

      {/* 2. BENEFICIARY GRID */}
      <section className={styles.grid}>
        {beneficiaries.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${styles.card} ${styles[item.styleClass]}`}
          >
            {/* Content Wrapper */}
            <div className={styles.cardInner}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
            
            {/* Icon/Image Area */}
            <div className={styles.iconBox}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. CTA SUMMARY */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>
            A Collaborative Innovation Network
          </h3>
          <p className={styles.ctaText}>
            By connecting academia, industry, and society, we bridge the gap between &quot;Idea&quot; and &quot;Application.&quot;
          </p>
          
          <Link href="/contact" className={styles.ctaBtn}>
            Join the Network <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}