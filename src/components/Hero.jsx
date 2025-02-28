import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Set to true if user exists
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative pt-32 pb-24 md:pb-52 flex items-center justify-center bg-primary text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/home/hero.jpg')] bg-no-repeat"></div>
      
      {/* Dark Overlay (Fixes visibility issue) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center mx-auto text-center px-6 gap-6">
        <motion.div
          className="flex justify-center mb-4 mt-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Trophy className="text-yellow-300 w-16 h-16 animate-pulse" />
        </motion.div>

        <motion.h1
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to <span className="text-yellow-300">SRI Trophy</span>
        </motion.h1>

        <motion.p
          className="text-xl mt-4 mb-6 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Get ready for the <span className="font-extrabold text-2xl">ultimate sports challenge</span> and claim your glory!
        </motion.p>

        {!isLoggedIn ? (
          <motion.a
            href="signup"
            className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold text-lg rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Register Now
          </motion.a>
        ) : (
          <motion.a
            href="sports"
            className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold text-lg rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Sports
          </motion.a>
        )}
      </div>
    </div>
  );
};

export default Hero;