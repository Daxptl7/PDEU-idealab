// src/app/people/page.js
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Award, Cpu, Users } from "lucide-react";
import styles from './people.module.css';
import { getPeople } from "../../lib/api";

export default function PeoplePage() {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPeople();
        setPeopleData(data);
      } catch (error) {
        console.error("Failed to load people data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  // --- FILTER LOGIC ---
  // Leadership: Directors or Principal Investigators
  const leadership = peopleData.filter(p => 
    p.type === 'director' || 
    (p.role && (p.role.includes('Principal Investigator')))
  );
  
  // Technical Team: Faculty who are not in Leadership, or Staff
  const technicalTeam = peopleData.filter(p => 
    (p.type === 'faculty' && !p.role.includes('Principal Investigator')) || 
    p.type === 'staff'
  );

  // Students
  const students = peopleData.filter(p => p.type === 'student');

  // --- CARD COMPONENT ---
  const PersonCard = ({ person }) => (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageWrapper}>
        <img src={person.image} alt={person.name} className={styles.personImg} />
      </div>
      
      <div className={styles.info}>
        <span className={styles.dept}>{person.department}</span>
        <h3 className={styles.name}>{person.name}</h3>
        <p className={styles.role}>{person.role}</p>
        <p className={styles.bio}>{person.bio}</p>
        
        <div className={styles.socialRow}>
          {/* Email Icon */}
          {person.email && (
             <a 
               href={`mailto:${person.email}`} 
               className={styles.iconBtn} 
               aria-label="Email"
             >
               <Mail size={14} />
             </a>
           )}
           
           {/* LinkedIn Icon */}
           {person.linkedin && person.linkedin !== '#' && (
             <a 
               href={person.linkedin} 
               target="_blank" 
               rel="noopener noreferrer" 
               className={`${styles.iconBtn} ${styles.linkedInBtn}`} 
               aria-label="LinkedIn"
             >
               <Linkedin size={14} />
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className={styles.mainContainer}>
       {/* Header */}
       <section className={styles.header}>
        <h1 className={styles.title}>Meet the <span className={styles.highlight}>Innovators</span></h1>
        <p className={styles.subtitle}>
          Guided by exceptional minds dedicated to nurturing innovation, fostering creativity, and building tomorrow&apos;s technological leaders.
        </p>
      </section>

      {loading && (
        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
          Loading team members...
        </div>
      )}

      {!loading && (
        <>
          {/* 1. LEADERSHIP */}
          {leadership.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Award size={24} /> Leadership
              </h2>
              <div className={styles.leadershipGrid}>
                {leadership.map(p => <PersonCard key={p.id} person={p} />)}
              </div>
            </section>
          )}

          {/* 2. TECHNICAL TEAM */}
          {technicalTeam.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Cpu size={24} /> Technical Team
              </h2>
              <div className={styles.grid}>
                {technicalTeam.map(p => <PersonCard key={p.id} person={p} />)}
              </div>
            </section>
          )}

          {/* 3. STUDENTS */}
          {students.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Users size={24} /> Student Ambassadors
              </h2>
              <div className={styles.grid}>
                {students.map(p => <PersonCard key={p.id} person={p} />)}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}