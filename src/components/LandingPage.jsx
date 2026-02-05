import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bike, MapPin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
        
        // Reset particle if it goes too high
        if (pos.array[i * 3 + 1] > 6) {
          pos.array[i * 3 + 1] = -6;
          pos.array[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      pos.needsUpdate = true;
    } catch (e) {
      // Silently handle WebGL context loss
    }
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
  
  // Don't render if there's an error (WebGL context lost)
  if (hasError) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false
        }}
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

// ========== Service Card Component ==========
function ServiceCard({ icon: Icon, title, iconBgColor }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer min-w-[120px]">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: iconBgColor }}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-sm font-bold text-gray-800 text-center whitespace-nowrap">{title}</span>
    </div>
  );
}

// ========== Main Landing Page Component ==========
export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/landing-bg.png)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-orange-100/30" />
      
      {/* Three.js Particles */}
      <ParticleCanvas />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header / Logo */}
        <header className="flex items-center gap-3 p-6 md:p-8">
          <img 
            src="/myezzlogopage0001removebgpreview2329-xmz0h-400w.png" 
            alt="MyEzz Logo" 
            className="h-14 md:h-20 object-contain"
          />
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 pb-8 gap-8 lg:gap-4">
          
          {/* Left Side - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Your Favorite Food,{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Delivered Effortlessly
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-md">
              Fast delivery from top restaurants near you.
              <br />
              Simple. Reliable. MyEzz.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/login"
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
              >
                Order Now
              </Link>
              <a
                href="https://my-ezz-restaurants.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-full border border-gray-200 shadow-md hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right Side - Visual Composition */}
          <div className="relative w-full lg:w-[60%] h-[500px] md:h-[580px] lg:h-[650px] flex items-center justify-center mt-4 lg:mt-0">
            
            {/* Delivery Rider - Background Layer (larger and more prominent) */}
            <div className="absolute right-[-20px] md:right-0 lg:right-[5%] top-[-40px] md:top-[-30px] w-[400px] md:w-[520px] lg:w-[600px] z-10">
              <div className="relative">
                {/* Motion Blur Effect */}
                <div 
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: 'url(/delivery-guy.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'blur(12px)',
                    transform: 'translateX(-20px) scale(1.02)',
                  }}
                />
                <img 
                  src="/delivery-guy.png" 
                  alt="MyEzz Delivery Rider" 
                  className="relative z-10 w-full h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                  }}
                />
              </div>
            </div>

            {/* Central Food Composition Container - Using absolute positioning for true overlap */}
            <div className="absolute bottom-[90px] md:bottom-[100px] left-[18%] md:left-[20%] w-[450px] md:w-[600px] lg:w-[750px] h-[300px] md:h-[380px] lg:h-[450px] z-20">
              
              {/* Food Platter - BEHIND phone (z-20) */}
              <div 
                className="absolute w-[300px] md:w-[420px] lg:w-[660px] z-[20]"
                style={{ left: '160px', bottom: '0px' }}
              >
                <img 
                  src="/food-platter.png" 
                  alt="Delicious Food Platter" 
                  className="w-full h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  }}
                />
              </div>

              {/* Phone Mockup - IN FRONT of platter (z-30) */}
              <div 
                className="absolute w-[195px] md:w-[250px] lg:w-[580px] z-[30]"
                style={{ left: '60px', bottom: '20px' }}
              >
                <img 
                  src="/phone-mockup.png" 
                  alt="MyEzz App" 
                  className="w-full h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.35))',
                  }}
                />
              </div>

              {/* Bowl - IN FRONT overlapping phone (z-40) */}
              <div 
                className="absolute w-[140px] md:w-[180px] lg:w-[360px] z-[40]"
                style={{ left: '0px', bottom: '80px' }}
              >
                <img 
                  src="/bowl.png" 
                  alt="Noodle Bowl" 
                  className="w-full h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.25))',
                  }}
                />
              </div>
            </div>

            {/* Service Cards - Directly Below Food Composition */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-50">
              <ServiceCard 
                icon={Clock} 
                title="24/7 Service" 
                iconBgColor="linear-gradient(135deg, #FFB347, #FF6A00)"
              />
              <ServiceCard 
                icon={Bike} 
                title="Quick Delivery" 
                iconBgColor="linear-gradient(135deg, #FFB347, #FF6A00)"
              />
              <ServiceCard 
                icon={MapPin} 
                title="Live Tracking" 
                iconBgColor="linear-gradient(135deg, #FF6B6B, #FF4757)"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
