// src/components/Stats.js
"use client";
import { useEffect, useState, useRef } from 'react';
import styles from './Stats.module.css';

// Reusable Counter Component
const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        
        {/* STAT 1: Area */}
        <div className={styles.statItem}>
          <span className={styles.number}>
            <Counter end={5000} suffix="+" />
          </span>
          <span className={styles.label}>Sq. Ft. Lab Area</span>
        </div>

        {/* STAT 2: Equipment (Using the IdeaLab context) */}
        <div className={styles.statItem}>
          <span className={styles.number}>
            <Counter end={50} suffix="+" />
          </span>
          <span className={styles.label}>Advanced Machines</span>
        </div>

        {/* STAT 3: Funding/Value (Looks impressive) */}
        <div className={styles.statItem}>
          <span className={styles.number}>
            <Counter end={100} suffix="+" />
          </span>
          <span className={styles.label}>Projects Incubated</span>
        </div>

        {/* STAT 4: People */}
        <div className={styles.statItem}>
          <span className={styles.number}>
            <Counter end={2000} suffix="+" />
          </span>
          <span className={styles.label}>Students Trained</span>
        </div>

      </div>
    </section>
  );
};

export default Stats;