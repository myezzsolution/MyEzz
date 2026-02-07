import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bike, MapPin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import HorizontalFoodCarousel from './HorizontalFoodCarousel';
import TapedFooter from './TapedFooter';
import LandingNavbar from './LandingNavbar';

// ========== Three.js Particle System ==========
function Particles({ count = 50 }) {
  const mesh = useRef();
  const positions = useRef(new Float32Array(count * 3));
  const velocities = useRef(new Float32Array(count * 3));
  
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 5;
      velocities.current[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities.current[i * 3 + 1] = Math.random() * 0.02 + 0.005;
      velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    if (mesh.current) {
      mesh.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions.current, 3)
      );
    }
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    try {
      const pos = mesh.current.geometry?.attributes?.position;
      if (!pos || !pos.array) return;
      for (let i = 0; i < count; i++) {
        pos.array[i * 3] += velocities.current[i * 3];
        pos.array[i * 3 + 1] += velocities.current[i * 3 + 1];
        pos.array[i * 3 + 2] += velocities.current[i * 3 + 2];
        
        if (pos.array[i * 3 + 1] > 6) {
          pos.array[i * 3 + 1] = -6;
          pos.array[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      pos.needsUpdate = true;
    } catch (e) {}
  });

  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.08} 
        color="#ff9f5a" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function ParticleCanvas() {
  const [hasError, setHasError] = useState(false);
  if (hasError) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasError(true);
          });
        }}
      >
        <Particles count={60} />
      </Canvas>
    </div>
  );
}

// ========== Rolling Text Component ==========
const rollingWords = ['Effortlessly', 'Securely', 'Efficiently'];

function RollingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rollingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rollingWords[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"
        >
          {rollingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ========== Service Card Component ==========
function ServiceCard({ icon: Icon, title, description, iconBgColor }) {
  return (
    <div className="flex-1 min-w-[280px] flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
        style={{ background: iconBgColor }}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ========== Main Landing Page Component ==========
export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gray-50 scroll-smooth">
      {/* ===== FIXED NAVBAR ===== */}
      <LandingNavbar />

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative min-h-screen overflow-hidden pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/landing-bg.png)' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-orange-100/30" />
        
        {/* Three.js Particles */}
        <ParticleCanvas />
        
        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Content */}
          <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-8 gap-6 lg:gap-4">
            
            {/* Left Side - Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl z-20 px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4">
                <span className="block">Your Favorite Food,</span>
                <span className="block">Delivered <RollingText /></span>
              </h1>
              
              <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 max-w-md">
                Fast delivery from local vendors & street food near you. Simple. Reliable. MyEzz.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/login"
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
                >
                  Order Now
                </Link>
                <a
                  href="https://my-ezz-restaurants.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 shadow-md hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300"
                >
                  Partner With Us
                </a>
              </div>
            </div>

            {/* Right Side - Food Carousel */}
            <div className="w-full lg:w-[55%] flex items-center justify-center">
              <HorizontalFoodCarousel />
            </div>
          </main>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION DIVIDER ===== */}
      <div className="h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

      {/* ===== SERVICES SECTION ===== */}
      <section id="how-it-works" className="relative py-12 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Section Header - tighter spacing */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Why Choose <span className="text-orange-500">MyEzz</span>?
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              Features designed for your convenience
            </p>
          </div>

          {/* Service Cards - equal width grid */}
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <ServiceCard 
              icon={Clock} 
              title="24/7 Service"
              description="Order anytime, day or night. We're always here."
              iconBgColor="linear-gradient(135deg, #FFB347, #FF6A00)"
            />
            <ServiceCard 
              icon={Bike} 
              title="Quick Delivery"
              description="Lightning-fast delivery in under 30 minutes."
              iconBgColor="linear-gradient(135deg, #FFB347, #FF6A00)"
            />
            <ServiceCard 
              icon={MapPin} 
              title="Live Tracking"
              description="Track your order in real-time from restaurant to door."
              iconBgColor="linear-gradient(135deg, #FF6B6B, #FF4757)"
            />
          </div>
        </div>
      </section>

      {/* ===== SECTION DIVIDER ===== */}
      <div className="h-1 bg-gradient-to-r from-transparent via-orange-100 to-transparent" />

      {/* ===== FOOTER ===== */}
      <section className="bg-gray-50">
        <TapedFooter />
      </section>
    </div>
  );
}
