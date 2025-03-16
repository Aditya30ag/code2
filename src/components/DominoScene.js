import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, PresentationControls } from '@react-three/drei';
import { Building2, MapPin, Languages, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration Constants
const SCENE_DURATION = 3000;
const PARTICLE_COUNT = 30;

const SCENES = [
  ['REVOLUTIONIZING', 'Local Hiring', "India's First AI-Powered Job Platform", 'cyan'],
  ['5000+ JOBS', 'Near Your Home', 'Average Distance < 5km', 'violet'],
  ['10+ LANGUAGES', 'Your Language', 'Breaking Language Barriers', 'amber'],
  ['24HR HIRING', 'Lightning Fast', 'From Application to Offer', 'cyan'],
  ['JOIN THE', 'Revolution', "Be Part of India's Growth Story", 'violet']
].map((scene, index) => ({
  id: index + 1,
  title: scene[0],
  subtitle: scene[1],
  description: scene[2],
  accent: scene[3] === 'cyan' ? 'bg-gradient-to-r from-cyan-400 to-violet-500' : 
          scene[3] === 'violet' ? 'bg-gradient-to-r from-violet-400 to-amber-500' : 
          'bg-gradient-to-r from-amber-400 to-violet-500'
}));

// Reusable Components
const Scene3D = ({ title, color }) => (
  <Float speed={4} rotationIntensity={1} floatIntensity={2}>
    <Center>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
      >
        {title}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  </Float>
);

const IconRow = ({ accent }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="absolute bottom-12 sm:bottom-16 md:bottom-20 flex gap-2 sm:gap-3 md:gap-4 justify-center w-full px-2"
  >
    {[Building2, MapPin, Languages, Clock, Users].map((Icon, i) => (
      <div key={i} className="relative p-2 sm:p-3 bg-black/50 rounded-full border border-violet-500/30 backdrop-blur-xl">
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${accent === 'bg-gradient-to-r from-cyan-400 to-violet-500' ? 'text-cyan-400' : 
                         accent === 'bg-gradient-to-r from-violet-400 to-amber-500' ? 'text-violet-400' : 
                         'text-amber-400'}`} />
      </div>
    ))}
  </motion.div>
);

const ParticleField = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(PARTICLE_COUNT)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
        animate={{
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

const ProgressIndicator = ({ currentIndex, total }) => (
  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
    {[...Array(total)].map((_, i) => (
      <div
        key={i}
        className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${
          i === currentIndex ? 'bg-cyan-400 w-6 sm:w-8' : 'bg-gray-600 w-1 sm:w-2'
        }`}
      />
    ))}
  </div>
);

const ResponsiveInstagramReel = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = SCENES[sceneIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % SCENES.length);
    }, SCENE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center min-w-screen items-center min-h-screen bg-gray-900 ">
      <div 
        className="relative w-full sm:max-w-sm md:max-w-md mx-auto min-h-screen bg-black overflow-hidden shadow-xl rounded-lg" 
        style={{ aspectRatio: '9/16' }}
      >
        {/* 3D Canvas Background */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Scene3D
                title={currentScene.title}
                color={sceneIndex % 2 ? "#7C3AED" : "#06B6D4"}
              />
            </PresentationControls>
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Content Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0">
              <div className={`absolute inset-0 ${currentScene.accent} opacity-20`} />
              <div className="absolute inset-0 backdrop-blur-xl" />
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center mt-16 sm:mt-20 md:mt-24"
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 ${currentScene.accent} text-transparent bg-clip-text`}>
                {currentScene.subtitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4">
                {currentScene.description}
              </p>
            </motion.div>

            {/* Bottom Elements */}
            <IconRow accent={currentScene.accent} />
            <ProgressIndicator currentIndex={sceneIndex} total={SCENES.length} />
          </motion.div>
        </AnimatePresence>

        <ParticleField />
      </div>
    </div>
  );
};

export default ResponsiveInstagramReel;