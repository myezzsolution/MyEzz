import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const foodImages = [
  { id: 1, src: '/food-carousel/pizza.jpg', alt: 'Delicious Pizza' },
  { id: 2, src: '/food-carousel/burger.jpg', alt: 'Juicy Burger' },
  { id: 3, src: '/food-carousel/momos.jpg', alt: 'Steamed Momos' },
  { id: 4, src: '/food-carousel/streetfood.jpg', alt: 'Indian Street Food' },
  { id: 5, src: '/food-carousel/brownie.jpg', alt: 'Chocolate Brownie' },
];

// Realistic hand/finger SVG positioned above carousel
function SwipingHand({ className }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 40, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg 
        width="56" 
        height="56" 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Realistic pointing hand */}
        <g filter="url(#shadow)">
          {/* Palm */}
          <path 
            d="M32 52C26 52 22 48 20 44L16 34C15 31 16 28 19 27C22 26 25 28 26 31L27 34V18C27 15 29 13 32 13C35 13 37 15 37 18V28" 
            fill="#FDBF8F" 
            stroke="#E8A66E" 
            strokeWidth="1"
          />
          {/* Index finger extended */}
          <path 
            d="M37 28V12C37 9 39 7 42 7C45 7 47 9 47 12V28" 
            fill="#FDBF8F" 
            stroke="#E8A66E" 
            strokeWidth="1"
          />
          {/* Middle finger */}
          <path 
            d="M47 28V10C47 7 49 5 52 5C55 5 57 7 57 10V30C57 38 52 46 44 50" 
            fill="#FDBF8F" 
            stroke="#E8A66E" 
            strokeWidth="1"
          />
          {/* Thumb */}
          <path 
            d="M27 34L22 30C20 28 17 28 15 30C13 32 13 35 15 37L20 42" 
            fill="#FDBF8F" 
            stroke="#E8A66E" 
            strokeWidth="1"
          />
          {/* Fingernails */}
          <ellipse cx="42" cy="8" rx="3" ry="2" fill="#F5D5C0"/>
          <ellipse cx="52" cy="6" rx="3" ry="2" fill="#F5D5C0"/>
          <ellipse cx="32" cy="14" rx="3" ry="2" fill="#F5D5C0"/>
        </g>
        {/* Motion lines */}
        <motion.g
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M8 20H14" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <path d="M6 28H12" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
          <path d="M8 36H14" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </motion.g>
        <defs>
          <filter id="shadow" x="-4" y="-4" width="72" height="72">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function HorizontalFoodCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useCallback((direction) => {
    setCurrentIndex((prev) => {
      if (direction > 0) {
        return prev === foodImages.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? foodImages.length - 1 : prev - 1;
    });
  }, []);

  // Faster auto-scroll: 1.8 seconds (matching finger animation)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      navigate(1);
    }, 1800);
    return () => clearInterval(interval);
  }, [navigate, isHovered]);

  const getCardStyle = (index) => {
    const total = foodImages.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 5 };
    } else if (diff === -1) {
      return { x: -220, scale: 0.75, opacity: 0.55, zIndex: 4 };
    } else if (diff === -2) {
      return { x: -380, scale: 0.55, opacity: 0.2, zIndex: 3 };
    } else if (diff === 1) {
      return { x: 220, scale: 0.75, opacity: 0.55, zIndex: 4 };
    } else if (diff === 2) {
      return { x: 380, scale: 0.55, opacity: 0.2, zIndex: 3 };
    } else {
      return { x: diff > 0 ? 500 : -500, scale: 0.4, opacity: 0, zIndex: 0 };
    }
  };

  const isVisible = (index) => {
    const total = foodImages.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full h-[480px] md:h-[520px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Swiping Hand - positioned above the carousel */}
      <div className="absolute -top-4 md:top-0 left-1/2 transform -translate-x-1/2 z-40">
        <SwipingHand />
      </div>

      {/* Card Stack */}
      <div className="relative flex items-center justify-center w-full h-full mt-8">
        {foodImages.map((image, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={image.id}
              className="absolute"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22,
                mass: 0.7,
              }}
              style={{ zIndex: style.zIndex }}
            >
              <div
                className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm"
                style={{
                  width: isCurrent ? '380px' : '300px',
                  height: isCurrent ? '260px' : '200px',
                  boxShadow: isCurrent
                    ? '0 30px 60px -15px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)'
                    : '0 15px 35px -10px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {foodImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              index === currentIndex
                ? 'w-8 bg-orange-500 shadow-lg shadow-orange-500/40'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
