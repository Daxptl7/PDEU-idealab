"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from './industrycontributions.module.css';
import { getIndustryContributions } from "@/lib/api";

export default function IndustryContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const data = await getIndustryContributions();
        setContributions(data);
        setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading Contributions...</p>
        </div>
      );
  }

  return (
    <main className={styles.mainContainer}>
      
      {/* 1. HEADER */}
      <section className={styles.header}>
        <h1 className={styles.title}>Industry Contributions</h1>
        <p className={styles.subtitle}>
          Our valued partners and their contributions to the lab.
        </p>
      </section>

      {/* 2. CARD GRID */}
      <div className={styles.grid}>
        {contributions.length > 0 ? (
          contributions.map((item) => (
            <motion.div 
              key={item.id}
              className={styles.card}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Section */}
              <div className={styles.cardImageWrapper}>
                 {item.thumbnail ? (
                   <img 
                     src={item.thumbnail} 
                     alt={item.title}
                     className={styles.cardImg}
                   />
                 ) : (
                   <div className={styles.placeholderImg}>No Image</div>
                 )}
              </div>

              {/* Content Section */}
              <div className={styles.cardContent}>
                 <div className={styles.metaTop}>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                 </div>

                 <h3 className={styles.cardTitle}>{item.title}</h3>
                 
                 <div>
                    <span className={styles.contributionLabel}>Contribution</span>
                    <p className={styles.cardDesc}>
                        {item.contribution_amount || item.description || "N/A"}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No contributions found.</p>
          </div>
        )}
      </div>
    </main>
  );
}