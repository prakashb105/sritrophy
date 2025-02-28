import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 p-10">
        {/* Logo Section */}
        <motion.img
          src="/images/logo.jpg"
          alt="logo"
          className="w-72 rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Menu Links */}
        <motion.div
          className="flex flex-col gap-4 items-center md:items-start"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-3 font-bold underline">MENU</p>
          <Link to="/">HOME</Link>
          <Link to="/sports">SPORTS</Link>
          <Link to="/brochure">BROCHURE</Link>
          <Link to="/support">SUPPORT</Link>
        </motion.div>

        {/* Contact Sections */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {/* Student Coordinator */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="mb-2 font-bold underline">STUDENT COORDINATOR</p>
            <p>Akshaynathan</p>
            <p>III B.COM</p>
            <p>PHONE: +91 7339216366</p>
          </div>

          {/* Technical Support */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="mb-2 font-bold underline">TECHNICAL SUPPORT</p>
            <p>PRAKASH B</p>
            <p>PHONE: +91 6381440171</p>
          </div>
        </motion.div>

        {/* Convenor Section */}
        <motion.div
          className="flex flex-col gap-[6px] items-center md:items-start"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <p className="mb-2 font-bold underline">CONVENOR</p>
          <p>Dr. K. Sathiyamoorthy</p>
          <p>Physical Director</p>
          <p>SASTRA Deemed University</p>
          <p>Srinivasa Ramanujan Centre</p>
          <p>Kumbakonam - 612001</p>
          <p>PHONE: +91 8825892762</p>
        </motion.div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto text-center mt-4">
        <p className="text-lg font-semibold">
          Made By <span className="text-yellow-300">Mr. Light ✨</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
