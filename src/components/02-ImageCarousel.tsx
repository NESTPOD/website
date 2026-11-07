'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
  category?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  model?: string;
  autoplay?: boolean;
  interval?: number;
}

export default function ImageCarousel({
  images,
  model = 'panorama',
  autoplay = false,
  interval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Next slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Previous slide
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Lightbox navigation
  const goToLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const goToLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play effect
  React.useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, goToNext]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLightboxOpen, goToNext, goToPrev]);

  const currentImage = images[currentIndex];
  const lightboxImage = images[lightboxIndex];

  return (
    <>
      {/* Main Carousel */}
      <div className="relative w-full bg-black rounded-lg overflow-hidden group">
        {/* Image Container */}
        <div className="relative w-full aspect-video bg-gray-900">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover cursor-pointer transition-opacity duration-300 group-hover:opacity-95"
            onClick={() => {
              setLightboxIndex(currentIndex);
              setIsLightboxOpen(true);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            priority={currentIndex === 0}
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{currentImage.caption}</h3>
          {currentImage.category && (
            <p className="text-sm text-gray-300 capitalize">{currentImage.category}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                currentIndex === idx
                  ? 'border-blue-500 ring-2 ring-blue-400'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-6xl flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToLightboxPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                <button
                  onClick={goToLightboxNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>

                {/* Lightbox Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                  <h3 className="text-2xl font-bold mb-2">{lightboxImage.caption}</h3>
                  <p className="text-sm text-gray-300">
                    {lightboxIndex + 1} / {images.length}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
