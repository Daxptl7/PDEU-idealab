// src/app/contact/page.js
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar, CheckCircle, Send } from "lucide-react";
import styles from './contact.module.css';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className={styles.mainContainer}>
      
      {/* 1. HEADER */}
      <section className={styles.header}>
        <h1 className={styles.title}>
          Get in <span className={styles.highlight}>Touch</span>
        </h1>
        <p className={styles.subtitle}>
          Have a question or want to book a machine? Fill out the form below and our team will get back to you.
        </p>
      </section>

      <div className={styles.gridContainer}>
        
        {/* 2. LEFT COLUMN: CONTACT INFO */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.infoColumn}
        >
          {/* Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Details</h3>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <MapPin size={20} />
                </div>
                <div className={styles.itemContent}>
                  <h4>Visit Us</h4>
                  <p>
                    AICTE Idea Lab, Block C,<br/>
                    Pandit Deendayal Energy University,<br/>
                    Gandhinagar - 382007.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Mail size={20} />
                </div>
                <div className={styles.itemContent}>
                  <h4>Email Us</h4>
                  <p>idealab@pdeu.ac.in</p>
                  <p>support.innovation@pdeu.ac.in</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Phone size={20} />
                </div>
                <div className={styles.itemContent}>
                  <h4>Call Us</h4>
                  <p>+91 79 2327 5060</p>
                  <p style={{fontSize: '0.8rem', color:'#888'}}>Mon-Fri, 9am - 5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed (FIXED: Points exactly to PDEU) */}
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.497262645609!2d72.6636733150534!3d23.1559099848858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e869c95ce1e29%3A0xc665b6d05f276632!2sPandit%20Deendayal%20Energy%20University%20(PDEU)!5e0!3m2!1sen!2sin!4v1675245849000!5m2!1sen!2sin"
              className={styles.mapFrame}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="PDEU Map Location"
            ></iframe>
          </div>
        </motion.div>


        {/* 3. RIGHT COLUMN: BOOKING FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.formCard}
        >
          <h3 className={styles.formHeader}>
            <Calendar className={styles.formIcon} /> Book Equipment
          </h3>

          {formStatus === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successMessage}
            >
              <div className={styles.checkIcon}>
                <CheckCircle size={40} />
              </div>
              <h4 className={styles.successTitle}>Request Sent!</h4>
              <p style={{color:'#666'}}>We have received your booking request. Check your email for confirmation.</p>
              <button 
                onClick={() => setFormStatus("idle")}
                className={styles.resetBtn}
              >
                Book Another Slot
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input required type="text" placeholder="John Doe" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Student ID</label>
                  <input required type="text" placeholder="2023ICT001" className={styles.input} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input required type="email" placeholder="john.d@pdeu.ac.in" className={styles.input} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Select Equipment</label>
                <select className={styles.select}>
                  <option>3D Printer - Ultimaker S5</option>
                  <option>Laser Cutter - Epilog Fusion</option>
                  <option>CNC Router - ShopBot</option>
                  <option>Electronics Workbench</option>
                  <option>Other (Specify in notes)</option>
                </select>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date</label>
                  <input required type="date" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Time Slot</label>
                  <select className={styles.select}>
                     <option>09:00 AM - 11:00 AM</option>
                     <option>11:00 AM - 01:00 PM</option>
                     <option>02:00 PM - 04:00 PM</option>
                     <option>04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Project Description</label>
                <textarea 
                  rows={4} 
                  placeholder="Briefly describe what you are building..." 
                  className={styles.textarea}
                ></textarea>
              </div>

              <button 
                disabled={formStatus === "submitting"}
                className={styles.submitBtn}
              >
                {formStatus === "submitting" ? (
                  <>Processing...</>
                ) : (
                  <>Submit Request <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}