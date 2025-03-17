import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Text3D,
  Center,
  Float,
  Environment,
  PresentationControls,
  useTexture,
} from "@react-three/drei";
import { Building2, MapPin, Languages, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration Constants
const SCENE_DURATION = 5000; // Slightly longer for better readability
const PARTICLE_COUNT = 400; // More particles for richer visual experience
const GRADIENT_TRANSITION_SPEED = 2; // Controls the gradient animation speed

// Enhanced Scene Data with More Dynamic Options
const SCENES = [
  {
    id: 1,
    title: "REVOLUTIONIZING",
    subtitle: "Local Hiring",
    description: "India's First AI-Powered Job Platform",
    gradientFrom: "from-cyan-400",
    gradientVia: "via-blue-500",
    gradientTo: "to-blue-600",
    iconColor: "text-cyan-400",
    particles: {
      count: 350,
      speed: 3,
      size: [0.8, 1.5],
      color: "#22d3ee",
    },
  },
  {
    id: 2,
    title: "5000+ JOBS",
    subtitle: "Near Your Home",
    description: "Average Distance < 5km",
    gradientFrom: "from-violet-500",
    gradientVia: "via-purple-500",
    gradientTo: "to-amber-400",
    iconColor: "text-violet-400",
    particles: {
      count: 400,
      speed: 3.5,
      size: [1, 2],
      color: "#8b5cf6",
    },
  },
  {
    id: 3,
    title: "10+ LANGUAGES",
    subtitle: "Your Language",
    description: "Breaking Language Barriers",
    gradientFrom: "from-amber-400",
    gradientVia: "via-orange-500",
    gradientTo: "to-purple-600",
    iconColor: "text-amber-400",
    particles: {
      count: 450,
      speed: 4,
      size: [0.5, 1],
      color: "#f59e0b",
    },
  },
  {
    id: 4,
    title: "24HR HIRING",
    subtitle: "Lightning Fast",
    description: "From Application to Offer",
    gradientFrom: "from-cyan-400",
    gradientVia: "via-teal-500",
    gradientTo: "to-emerald-600",
    iconColor: "text-cyan-400",
    particles: {
      count: 500,
      speed: 4.5,
      size: [0.3, 1.5],
      color: "#2dd4bf",
    },
  },
  {
    id: 5,
    title: "JOIN THE",
    subtitle: "Revolution",
    description: "Be Part of India's Growth Story",
    gradientFrom: "from-rose-500",
    gradientVia: "via-pink-500",
    gradientTo: "to-violet-600",
    iconColor: "text-rose-400",
    particles: {
      count: 550,
      speed: 5,
      size: [0.5, 2],
      color: "#fb7185",
    },
  },
];

// Enhanced 3D Scene Component
const Scene3D = ({ title, color }) => (
  <Center>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={0.7}
        height={0.2}
        curveSegments={64}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.03}
        bevelSegments={12}
      >
        {title}
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Text3D>
    </Float>
  </Center>
);

// Enhanced IconRow with Motion Effects
const IconRow = ({ iconColor, scene }) => {
  const icons = [Building2, MapPin, Languages, Clock, Users];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className="absolute bottom-12 sm:bottom-16 md:bottom-20 flex gap-3 sm:gap-4 md:gap-5 justify-center w-full px-2"
    >
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            delay: 0.7 + i * 0.15, 
            duration: 0.4,
            type: "spring",
            stiffness: 200
          }}
          className={`relative p-2 sm:p-3 bg-black/70 rounded-full border border-${scene.gradientFrom.split('-')[1]}-500/50 backdrop-blur-xl shadow-lg`}
        >
          <Icon
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${iconColor}`}
          />
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                `0 0 0px ${scene.particles.color}`,
                `0 0 8px ${scene.particles.color}`,
                `0 0 0px ${scene.particles.color}`
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced Particle Field with Dynamic Properties
const ParticleField = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(PARTICLE_COUNT)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/40 rounded-full"
        animate={{
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
          opacity: [0.2, 0.8, 0.2],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
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
      <motion.div
        key={i}
        animate={{
          width: i === currentIndex ? "2rem" : "0.5rem",
          backgroundColor: i === currentIndex ? "#22d3ee" : "#4b5563"
        }}
        transition={{ duration: 0.3 }}
        className="h-1 sm:h-2 rounded-full transition-all duration-300"
      />
    ))}
  </div>
);

// Main Component with Enhanced Animation and Interactivity
const DominoScene = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const intervalRef = useRef(null);
  const currentScene = SCENES[sceneIndex];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSceneIndex((prev) => {
        const nextIndex = (prev + direction) % SCENES.length;
        return nextIndex < 0 ? SCENES.length - 1 : nextIndex;
      });
    }, SCENE_DURATION);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, direction]);


  return (
    <div className="flex justify-center min-w-screen items-center min-h-screen bg-gray-900">
      
      <div
        className="relative w-full sm:max-w-sm md:max-w-md mx-auto min-h-screen bg-black overflow-hidden shadow-xl rounded-lg"
        style={{ aspectRatio: "9/16" }}
      >
        



        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-400 via-transparent to-transparent animate-pulse"></div>
        </div>
        {/* Content Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 ${currentScene.accent}`}
              />
              <div className="absolute inset-0 backdrop-blur-xl" />
            </div>
              

            {/* Main Content with Enhanced Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative z-10 text-center mt-16 sm:mt-20 md:mt-24"
            >
              <motion.div
                animate={{
                  textShadow: [
                    `0 0 8px ${currentScene.particles.color}`,
                    `0 0 16px ${currentScene.particles.color}`,
                    `0 0 8px ${currentScene.particles.color}`,
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}

              >
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight p-4 bg-gradient-to-r ${currentScene.gradientFrom} ${currentScene.gradientVia} ${currentScene.gradientTo} text-transparent bg-clip-text drop-shadow-lg`}
                >
                  {currentScene.subtitle}
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-medium mb-4 sm:mb-5 md:mb-6 px-6 sm:px-8 max-w-md mx-auto leading-relaxed"
              >
                {currentScene.description}
              </motion.p>
              
              {/* Dynamic glowing accent line */}
              <motion.div 
                className="w-16 h-1 mx-auto rounded-full"
                style={{ backgroundColor: currentScene.particles.color }}
                animate={{ 
                  width: ["4rem", "6rem", "4rem"],
                  boxShadow: [
                    `0 0 5px ${currentScene.particles.color}`,
                    `0 0 15px ${currentScene.particles.color}`, 
                    `0 0 5px ${currentScene.particles.color}`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>


            

            {/* Bottom Elements */}
            <IconRow iconColor={currentScene.iconColor} scene={currentScene} />
            <ProgressIndicator
              currentIndex={sceneIndex}
              total={SCENES.length}
              currentScene={currentScene}
            />
            
            {/* Auto-play toggle */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 z-20"
            >
              {isAutoPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <ParticleField />
      </div>
    </div>
  );
};
export default DominoScene;