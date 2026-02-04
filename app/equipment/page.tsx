// src/app/equipment/page.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, Zap, Cpu, Wrench, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from './equipment.module.css';

// --- DATA ---
const equipment = [
  {
    id: 1,
    name: "Ultimaker S5",
    category: "3D Printing",
    status: "Available",
    specs: ["Dual Extrusion", "330 x 240 x 300 mm", "PLA, ABS, Nylon"],
    icon: <Printer size={32} />
  },
  {
    id: 2,
    name: "Formlabs Form 3",
    category: "3D Printing",
    status: "In Use",
    specs: ["SLA Resin", "145 x 145 x 185 mm", "High Precision"],
    icon: <Printer size={32} />
  },
  {
    id: 3,
    name: "Epilog Laser Fusion",
    category: "CNC & Laser",
    status: "Available",
    specs: ["60 Watt CO2", "24 x 18 inch bed", "Wood, Acrylic"],
    icon: <Zap size={32} />
  },
  {
    id: 4,
    name: "ShopBot Desktop",
    category: "CNC & Laser",
    status: "Maintenance",
    specs: ["3-Axis Milling", "24 x 18 x 5.5 inch", "Aluminium, Wood"],
    icon: <Wrench size={32} />
  },
  {
    id: 5,
    name: "Tektronix Oscilloscope",
    category: "Electronics",
    status: "Available",
    specs: ["100 MHz", "4-Channel", "Digital Storage"],
    icon: <Cpu size={32} />
  },
  {
    id: 6,
    name: "Soldering Station",
    category: "Electronics",
    status: "Available",
    specs: ["Temp Control", "ESD Safe", "Fume Extractor"],
    icon: <Cpu size={32} />
  },
];

const categories = ["All", "3D Printing", "CNC & Laser", "Electronics"];

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filtered = equipment.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.mainContainer}>
      
      {/* 1. HEADER */}
      <section className={styles.header}>
        <div>
          <h1 className={styles.title}>
            The <span className={styles.highlight}>Equipment</span>
          </h1>
          <p className={styles.subtitle}>
            Industrial-grade tools at your fingertips. Browse our inventory and book a slot to bring your prototype to life.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Red Divider Line */}
      <div className={styles.headerLine}></div>

      {/* 2. TABS (Clean Left-Aligned Style) */}
      <section className={styles.tabSection}>
        <div className={styles.tabGroup}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.tabBtn} ${activeCategory === cat ? styles.activeTab : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. GRID */}
      <section className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className={styles.card}
            >
              {/* Image / Icon Area */}
              <div className={styles.imageArea}>
                {item.icon}
                
                {/* Status Badge */}
                <div className={`${styles.statusBadge} ${
                  item.status === 'Available' ? styles.available :
                  item.status === 'In Use' ? styles.inUse :
                  styles.maintenance
                }`}>
                  <span className={styles.statusDot}></span>
                  {item.status}
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <span className={styles.categoryLabel}>{item.category}</span>
                <h3 className={styles.cardName}>{item.name}</h3>

                <ul className={styles.specsList}>
                  {item.specs.map((spec, i) => (
                    <li key={i} className={styles.specItem}>
                      <span className={styles.specDot}></span>
                      {spec}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className={styles.bookBtn}>
                  Book Now <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

    </div>
  );
}