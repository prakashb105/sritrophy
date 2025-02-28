import Hero from "../components/Hero";
import SportsCarousel from "../components/SportsCarousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageSlider from "../components/ImageSlider";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <motion.div
        className="py-10 px-6 md:px-12 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
          <h1 className="text-4xl font-extrabold text-primary pb-4">
            About <span className="text-secondary">SRI Trophy</span>
          </h1>
        <div className="md:flex items-center gap-8">
          
          <div className="text-lg flex flex-col gap-4 text-gray-700 leading-relaxed text-justify">
            <p>
              Shri RamaChandra Iyer Trophy – A premier <span className="font-bold">State-Level Inter-College Sports Fest</span>, where passion meets competition!  
            Showcase your talent, represent your college, and compete against the best.
            </p>
            <p>
              The Sri Ramachandra Iyer Trophy is an annual invitation tournament held in memory of our esteemed founder, Sri Ramachandra Iyer. This prestigious event brings together college students from men's and women's categories to compete in various sports.
              </p>
            <p>
            Over the years, the tournament has achieved remarkable success, recognizing and rewarding talented sportsmen and inspiring budding athletes.This tournament and showcase your exceptional skills. Your presence would be a valuable addition to this event.
            </p>
          </div>
          <div>
            <img src="/home/image2.jpg" alt="sritrophy" className="w-[1900px] rounded mt-6 md:mt-0"/>
          </div>
        </div>
      </motion.div>
      
      {/* Sports Carousel */}
      <SportsCarousel />

      <motion.div 
      className="flex-1 flex justify-center space-x-8 sm:space-x-24 my-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div class="text-center">
          <h1 class="md:text-9xl text-4xl text-black font-Sigmar">03</h1>
          <p class="text-secondary text-sm md:text-2xl tracking-wide font-bold font-ProductSansBold">Days</p>
        </div
        ><div class="text-center">
          <h1 class="md:text-9xl text-4xl text-black font-Sigmar">1000+</h1>
          <p class="text-secondary text-sm md:text-2xl tracking-wide font-bold font-ProductSansBold">Participants</p>
        </div>
        <div class="text-center">
          <h1 class="md:text-9xl text-4xl text-black font-Sigmar">07</h1>
          <p class=" text-secondary text-sm  md:text-2xl tracking-wide font-bold font-ProductSansBold">Sports</p>
        </div>
      </motion.div>

<hr/>
      {/* Brochure Section */}
      <motion.div
        className="text-center mt-8 px-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-bold text-4xl text-primary leading-tight">
          Get Ready to Compete! <br /> <span className="text-secondary">Register Now</span> & Know More!
        </h2>

        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/brochure"
            className="text-2xl font-semibold text-white bg-secondary px-8 py-3 mb-8 rounded-lg shadow-lg inline-block transition-transform"
          >
            View Brochure 📄
          </Link>
        </motion.div>
        <hr/>
        <ImageSlider  />
      </motion.div>
    </div>
  );
};

export default HomePage;
