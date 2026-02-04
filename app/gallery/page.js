// src/app/gallery/page.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from './gallery.module.css';
import { getGalleryImages } from "../../lib/api";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Handle Hydration (Portal needs client)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Images from Appwrite
  useEffect(() => {
    async function fetchImages() {
      try {
        const images = await getGalleryImages();
        setGalleryImages(images);
      } catch (error) {
        console.error("Failed to load gallery images", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  // 2. Lock Scroll when Modal Open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedImage]);

  // 3. Dynamic Categories
  const categories = useMemo(() => {
    const cats = new Set(galleryImages.map(img => img.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [galleryImages]);

  // 4. Filter Logic
  const filteredImages = useMemo(() => {
    return activeCategory === "All" 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory);
  }, [activeCategory, galleryImages]);

  return (
    <>
      <main className={styles.mainContainer}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.subtitle}>
            A visual journey through our innovations, workshops, and community achievements.
          </p>
        </div>

        {/* FILTERS */}
        <div className={styles.filterContainer}>
          {loading ? (
             // Simple Skeleton for filters
             <div style={{height: '20px', width: '200px', background: '#ddd', borderRadius: '4px'}}></div>
          ) : (
            categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${
                    activeCategory === cat ? styles.activeFilter : ""
                }`}
                >
                {cat}
                </button>
            ))
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
           <div style={{ textAlign: 'center', color: '#666', padding: '4rem' }}>
             Loading gallery images...
           </div>
        )}

        {/* EMPTY STATE */}
        {!loading && galleryImages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#666', padding: '4rem' }}>
                No images found in the gallery.
            </div>
        )}

        {/* MASONRY GRID */}
        {!loading && (
        <div className={styles.masonryGrid}>
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
                onClick={() => setSelectedImage(image)}
              >
                {/* Standard img tag is often better for Masonry than Next/Image due to auto-height */}
                <img
                  src={image.src}
                  alt={image.title || 'Gallery Image'}
                  className={styles.gridImg}
                  onError={(e) => {
                      e.target.style.display = 'none'; // Hide broken images
                  }}
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayTitle}>{image.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        )}
      </main>

      {/* PORTAL MODAL (Sits outside main container) */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalOverlay}
              onClick={() => setSelectedImage(null)}
            >
              <button className={styles.closeBtn}>
                <X size={32} />
              </button>
              
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage.src}
                alt={selectedImage.title}
                className={styles.modalImg}
                onClick={(e) => e.stopPropagation()} 
              />
              
              <div className={styles.modalCaption}>
                <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
                <p className={styles.modalCategory}>{selectedImage.category}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}