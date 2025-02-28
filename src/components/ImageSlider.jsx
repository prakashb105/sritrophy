import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const images = [
  "/home/image1.jpg",
  "/home/image2.jpg",
  "/home/image3.jpg",
  "/home/image4.jpg",
  "/home/image5.jpg",
  "/home/image6.jpg",
  "/home/image7.jpg",
  "/home/image8.jpg",
  "/home/image9.jpg",
  "/home/hero.jpg",
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true); // Auto-slide enabled by default
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
      }
    }, [isPlaying]);
  
    return (
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
        <h1 className="text-[32px] font-bold mb-4 mt-4">GALLERY</h1>
        {/* Image Container */}
        <div className="relative w-full h-64 md:h-96 mb-12">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute w-full h-full object-contain md:object-cover rounded bg-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>
  
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <ChevronLeft size={24} />
        </button>
  
        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <ChevronRight size={24} />
        </button>
  
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute md:bottom-16 bottom-20 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
  
        {/* Dots Indicator */}
        <div className="absolute md:bottom-16 bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageSlider;