// import React from "react";
// import "../styles/globals.css";

// const SportsCarousel = () => {
//   const images = [
//     "/images/Cricket.png",
//     "/images/Chess.png",
//     "/images/Football.png",
//     "/images/Kabaddi.png",
//     "/images/TableTennis.png",
//     "/images/Basketball.png",
//     "/images/Volleyball.png",
//   ];

//   return (
//     <section className="flex flex-col gap-10 py-4 bg-[#F7F7F7]">
//       <div className="flex flex-col px-4 h-full relative z-50 w-full mx-auto">
//         <div className="flex items-center gap-4">
//           <h2 className="font-poppins text-[24px] shrink-0 font-semibold">
//             Sports
//           </h2>
//           <div className="bg-primary h-[2px] rounded-full w-full"></div>
//         </div>

//         <div
//           id="scroll-container"
//           className="flex overflow-x-scroll no-scrollbar relative flex-col gap-2 bg-primary py-4 scroll-linear"
//         >
//           <ul className="flex gap-6">
//             {images.concat(images).map((src, index) => (
//               <li key={index} className="shrink-0">
//                 <img
//                   src={src}
//                   className="bg-white min-w-[200px] h-[200px] object-cover rounded"
//                   alt={`Sport ${index + 1}`}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SportsCarousel;

import React, { useEffect, useRef } from "react";
import "../styles/globals.css";

const SportsCarousel = () => {
  const images = [
    "/images/Cricket.png",
    "/images/Chess.png",
    "/images/Football.png",
    "/images/Kabaddi.png",
    "/images/TableTennis.png",
    "/images/Basketball.png",
    "/images/Volleyball.png",
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let speed = 50; // Normal scrolling speed
    let animationFrame;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // Reset to create infinite loop effect
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    // Slow down on hover
    scrollContainer.addEventListener("mouseenter", () => (speed = 10));
    scrollContainer.addEventListener("mouseleave", () => (speed = 50));

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="relative py-8 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
      <div className="w-full mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-white">Sports</h2>
          <div className="bg-white h-[2px] w-full rounded-full"></div>
        </div>

        {/* Scrolling Container */}
        <div ref={scrollRef} className="relative flex overflow-hidden whitespace-nowrap">
          <div className="flex gap-6">
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center w-[220px] h-[220px] bg-gray-800 rounded-xl shadow-lg transform transition duration-500 hover:scale-110 hover:rotate-3"
              >
                <img
                  src={src}
                  alt={`Sport ${index + 1}`}
                  className="w-[180px] h-[180px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/logo.jpg')] bg-contain"></div>
    </section>
  );
};

export default SportsCarousel;
