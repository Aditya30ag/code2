import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Text3D,
  Center,
  Float,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import { Building2, MapPin, Languages, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration Constants
const SCENE_DURATION = 4000; // Increased duration for better readability
const PARTICLE_COUNT = 300;

const SCENES = [
  [
    "REVOLUTIONIZING",
    "Local Hiring",
    "India's First AI-Powered Job Platform",
    "cyan",
  ],
  ["5000+ JOBS", "Near Your Home", "Average Distance < 5km", "violet"],
  ["10+ LANGUAGES", "Your Language", "Breaking Language Barriers", "amber"],
  ["24HR HIRING", "Lightning Fast", "From Application to Offer", "cyan"],
  ["JOIN THE", "Revolution", "Be Part of India's Growth Story", "violet"],
].map((scene, index) => ({
  id: index + 1,
  title: scene[0],
  subtitle: scene[1],
  description: scene[2],
  accent:
    scene[3] === "cyan"
      ? "bg-gradient-to-r from-cyan-400 to-blue-600"
      : scene[3] === "violet"
      ? "bg-gradient-to-r from-violet-500 to-amber-400"
      : "bg-gradient-to-r from-amber-400 to-purple-600",
}));

// Reusable Components
const Scene3D = ({ title, color }) => (
  <Center>
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={0.7}
        height={0.15}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={8}
      >
        {title}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  </Center>
);

const IconRow = ({ accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    className="absolute bottom-12 sm:bottom-16 md:bottom-20 flex gap-2 sm:gap-3 md:gap-4 justify-center w-full px-2"
  >
    {[Building2, MapPin, Languages, Clock, Users].map((Icon, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
        className="relative p-2 sm:p-3 bg-black/60 rounded-full border border-violet-500/50 backdrop-blur-xl shadow-lg"
      >
        <Icon
          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
            accent === "bg-gradient-to-r from-cyan-400 to-blue-600"
              ? "text-cyan-400"
              : accent === "bg-gradient-to-r from-violet-500 to-amber-400"
              ? "text-violet-400"
              : "text-amber-400"
          }`}
        />
      </motion.div>
    ))}
  </motion.div>
);

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

const ResponsiveInstagramReel = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = SCENES[sceneIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, SCENE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center min-w-screen items-center min-h-screen bg-gray-900">
      
      <div
        className="relative w-full sm:max-w-sm md:max-w-md mx-auto min-h-screen bg-black overflow-hidden shadow-xl rounded-lg"
        style={{ aspectRatio: "9/16" }}
      >
        {/* 3D Canvas Background */}
        
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

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 text-center mt-16 sm:mt-20 md:mt-24"
            >
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight p-4 ${currentScene.accent} text-transparent bg-clip-text drop-shadow-lg`}
              >
                {currentScene.subtitle}
              </h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-medium mb-4 sm:mb-5 md:mb-6 px-6 sm:px-8 max-w-md mx-auto leading-relaxed"
              >
                {currentScene.description}
              </motion.p>
            </motion.div>

            {/* Bottom Elements */}
            <IconRow accent={currentScene.accent} />
            <ProgressIndicator
              currentIndex={sceneIndex}
              total={SCENES.length}
            />
          </motion.div>
        </AnimatePresence>

        <ParticleField />
      </div>
    </div>
  );
};

export default ResponsiveInstagramReel;