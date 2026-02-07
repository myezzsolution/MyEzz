import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const foodImages = [
  { id: 1, src: '/food-carousel/pizza.jpg', alt: 'Delicious Pizza' },
  { id: 2, src: '/food-carousel/burger.jpg', alt: 'Juicy Burger' },
  { id: 3, src: '/food-carousel/momos.jpg', alt: 'Steamed Momos' },
  { id: 4, src: '/food-carousel/streetfood.jpg', alt: 'Indian Street Food' },
  { id: 5, src: '/food-carousel/brownie.jpg', alt: 'Chocolate Brownie' },
];

// Cursor SVG overlapping the carousel
function SwipingCursor({ className }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 50, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        {/* Cursor pointer */}
        <path 
          d="M4 4L10.5 20L13 13L20 10.5L4 4Z" 
          fill="white" 
          stroke="#ff6a00" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Click circle */}
        <motion.circle
          cx="14"
          cy="14"
          r="4"
          fill="none"
          stroke="#ff6a00"
          strokeWidth="1.5"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
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

  // Faster auto-scroll: 1.2 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      navigate(1);
    }, 1200);
    return () => clearInterval(interval);
  }, [navigate, isHovered]);

  const getCardStyle = (index) => {
    const total = foodImages.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 5, blur: 0 };
    } else if (diff === -1) {
      return { x: -200, scale: 0.72, opacity: 0.5, zIndex: 4, blur: 2 };
    } else if (diff === -2) {
      return { x: -350, scale: 0.52, opacity: 0.15, zIndex: 3, blur: 4 };
    } else if (diff === 1) {
      return { x: 200, scale: 0.72, opacity: 0.5, zIndex: 4, blur: 2 };
    } else if (diff === 2) {
      return { x: 350, scale: 0.52, opacity: 0.15, zIndex: 3, blur: 4 };
    } else {
      return { x: diff > 0 ? 450 : -450, scale: 0.4, opacity: 0, zIndex: 0, blur: 6 };
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
      className="relative flex flex-col items-center justify-center w-full h-[420px] sm:h-[480px] md:h-[520px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Stack */}
      <div className="relative flex items-center justify-center w-full h-full">
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
                filter: `blur(${style.blur}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 20,
                mass: 0.6,
              }}
              style={{ zIndex: style.zIndex }}
            >
              <div
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-sm"
                style={{
                  width: isCurrent ? 'clamp(280px, 70vw, 380px)' : 'clamp(220px, 55vw, 300px)',
                  height: isCurrent ? 'clamp(190px, 45vw, 260px)' : 'clamp(150px, 35vw, 200px)',
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

        {/* Cursor SVG - overlapping on top of images */}
        <SwipingCursor className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none" />
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
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
