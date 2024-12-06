'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AnimatedSvgProps {
  image1: string;
  image2: string;
  className?: string;
}

export const AnimatedSvg: React.FC<AnimatedSvgProps> = ({ image1, image2, className = "" }) => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((current: any) => current === image1 ? image2 : image1);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [image1, image2]);

  return (
    <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} ${className}`}>
      <Image
        src={currentImage}
        alt="Animated SVG"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
