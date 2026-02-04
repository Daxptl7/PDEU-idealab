"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, MapPin, ArrowRight, BellRing, Archive, X, 
  Linkedin, FileText, ChevronLeft, ChevronRight 
} from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import styles from './events.module.css';
import { getEvents } from "@/lib/api";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("past");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
        const data = await getEvents();
        // Transform data if needed, or mapping directly in render
        setEvents(data);
        setLoading(false);
    }
    fetchEvents();
  }, []);

  // Helper: Get all images
  const getEventImages = (event) => {
    if (!event) return [];
    return [event.thumbnail, ...(event.gallery || [])].filter(Boolean);
  };

  // --- AUTO-PLAY LOGIC ---
  useEffect(() => {
    if (!selectedEvent || lightboxOpen) return;
    const images = getEventImages(selectedEvent);
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [selectedEvent, lightboxOpen]);

  // Reset slide index when opening new event
  useEffect(() => {
    if (selectedEvent) {
      // setCurrentSlide(0); // Moved to onClick handler to avoid set-state-in-effect
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset'; // Unlock scroll
    }
  }, [selectedEvent]);

  const filteredEvents = events.filter((event) => event.type === activeTab);

  const nextSlide = (e, images) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  const prevSlide = (e, images) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center text-white">Loading Events...</div>;
  }

  return (
    <main className={styles.mainContainer}>
      
      {/* 1. HEADER (Left aligned + Red line) */}
      <section className={styles.header}>
        <h1 className={styles.title}>Events & Workshops</h1>
        <p className={styles.subtitle}>
          Stay updated with the latest workshops, internships, and innovation activities.
        </p>
      </section>

      {/* 2. TABS */}
      <div className={styles.tabGroup}>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`${styles.tabBtn} ${activeTab === "upcoming" ? styles.activeTab : ''}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`${styles.tabBtn} ${activeTab === "past" ? styles.activeTab : ''}`}
        >
          Past Events
        </button>
      </div>

      {/* 3. CARD GRID */}
      <div className={styles.grid}>
        {filteredEvents.map((event) => (
          <motion.div 
            key={event.$id}
            onClick={() => {
              setSelectedEvent(event);
              setCurrentSlide(0);
            }}
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Image Section */}
            <div className={styles.cardImageWrapper}>
               <img 
                 src={event.thumbnail} 
                 alt={event.title}
                 className={styles.cardImg}
               />
               <div className={styles.categoryBadge}>
                  {event.category}
               </div>
            </div>

            {/* Content Section */}
            <div className={styles.cardContent}>
              <div className={styles.metaTop}>
                <span>{event.date}</span>
              </div>
              
              <h3 className={styles.cardTitle}>{event.title}</h3>
              
              <p className={styles.cardDesc}>{event.description}</p>
              
              <div className={styles.cardFooter}>
                <button className={styles.actionBtn}>
                  {event.type === 'upcoming' ? 'Register Now' : 'View Report'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. MODAL POPUP (Same logic as before) */}
      <AnimatePresence>
        {selectedEvent && (
          <div className={styles.modalOverlay}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className={styles.backdrop}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              className={styles.modalContent}
            >
              <button onClick={() => setSelectedEvent(null)} className={styles.closeBtn}>
                <X size={24} />
              </button>

              <div className={styles.modalLeft}>
                 {getEventImages(selectedEvent).length > 0 ? (
                   <>
                     <motion.img 
                       key={currentSlide}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.5 }}
                       src={getEventImages(selectedEvent)[currentSlide]} 
                       alt="Event Slide"
                       className={styles.modalImg}
                       onClick={() => setLightboxOpen(true)}
                     />
                     {getEventImages(selectedEvent).length > 1 && (
                       <>
                         <button 
                            onClick={(e) => prevSlide(e, getEventImages(selectedEvent))}
                            className={styles.sliderBtn} style={{left: 15}}
                         >
                           <ChevronLeft size={24} />
                         </button>
                         <button 
                            onClick={(e) => nextSlide(e, getEventImages(selectedEvent))}
                            className={styles.sliderBtn} style={{right: 15}}
                         >
                           <ChevronRight size={24} />
                         </button>
                       </>
                     )}
                   </>
                 ) : (
                   <div style={{display:'flex', height:'100%', alignItems:'center', justifyContent:'center', color:'#999'}}>
                      No Images
                   </div>
                 )}
              </div>

              <div className={styles.modalRight}>
                 <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
                 <div className={styles.modalMeta}>
                    <span><Calendar size={14}/> {selectedEvent.date}</span>
                    <span><MapPin size={14}/> {selectedEvent.location}</span>
                 </div>
                 <p className={styles.modalDesc}>{selectedEvent.description}</p>
                 
                 <div style={{marginTop:'auto'}}>
                    <a href={selectedEvent.reportLink || "#"} className={styles.primaryBtn}>
                       <FileText size={18}/> {selectedEvent.type === 'upcoming' ? 'Register' : 'View Full Report'}
                    </a>
                    {selectedEvent.linkedinUrl && (
                        <a href={selectedEvent.linkedinUrl} target="_blank" className={styles.secondaryBtn}>
                          <Linkedin size={18}/> View Post on LinkedIn
                        </a>
                    )}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Lightbox logic remains ... */}
      {selectedEvent && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentSlide} 
          slides={getEventImages(selectedEvent).map(src => ({ src }))}
        />
      )}
    </main>
  );
}