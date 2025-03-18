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
            stiffness: 200,
          }}
          className={`relative p-2 sm:p-3 bg-black/70 rounded-full border border-${
            scene.gradientFrom.split("-")[1]
          }-500/50 backdrop-blur-xl shadow-lg`}
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
                `0 0 0px ${scene.particles.color}`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
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
          backgroundColor: i === currentIndex ? "#22d3ee" : "#4b5563",
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
  const [gradientIndex, setGradientIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
      setGradientIndex((prevIndex) => (prevIndex + 1) % gradientOptions.length);
    }, SCENE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const gradientOptions = [
    "bg-gradient-to-r from-cyan-400 to-blue-600",
    "bg-gradient-to-r from-violet-500 to-amber-400",
    "bg-gradient-to-r from-amber-400 to-purple-600",
  ];

  const currentAccent = gradientOptions[gradientIndex];
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
                className={`absolute inset-0 ${currentAccent}`}  
              />
              <div className="absolute inset-0 backdrop-blur-xl" />
            </div>

            {/* Main Content with Enhanced Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 text-center mt-16 sm:mt-20 md:mt-24"
            >
              <motion.div
                animate={{
                  textShadow: [
                    `0 0 4px ${currentScene.particles.color}`,
                    `0 0 8px ${currentScene.particles.color}`,
                    `0 0 4px ${currentScene.particles.color}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
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
                    `0 0 5px ${currentScene.particles.color}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
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
          </motion.div>
        </AnimatePresence>

        <ParticleField />
      </div>
    </div>
  );
};
export default DominoScene;
