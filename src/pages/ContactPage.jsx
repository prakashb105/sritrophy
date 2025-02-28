// import GoogleMapComponent from "../components/GoogleMapComponent";

//  const ContactPage = () => {
//   return (
//     <>
//     <div className='flex flex-col md:flex-row gap-4 md:gap-20 md:justify-center items-center md:mt-8'>
//       <div className='flex flex-col p-8 gap-[4px] md:items-start text-xl'>
//         <p className='mb-2 text-2xl font-bold underline '>CONTACT</p>
//         <p>Sathya Moorthy</p>
//         <p>Director - Physical Education</p>
//         <p>SASTRA Deemed University</p>
//         <p>Srinivasa Ramanujan Centre</p>
//         <p>Kumbakonam - 612001</p>
//         <p>PHONE: +91 ----------</p>
//       </div>
//       <GoogleMapComponent />
//     </div>
//     </>
//   );
// };

// export default ContactPage;

import GoogleMapComponent from "../components/GoogleMapComponent";

const ContactPage = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 justify-center items-center bg-gray-100 w-screen py-16 pt-36 px-6 rounded-lg shadow-md">
      {/* Google Map */}
        <GoogleMapComponent />

      {/* Contact Information */}
      <div className="flex flex-col p-6 md:p-8 gap-2 md:items-start text-lg bg-white rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-primary border-b-2 pb-2 mb-4">Contact</p>
        <p className="font-semibold text-gray-800">Dr. K. Sathiyamoorthy</p>
        <p className="text-gray-700">Physical Director</p>
        <p className="text-gray-700">SASTRA Deemed University</p>
        <p className="text-gray-700">Srinivasa Ramanujan Centre</p>
        <p className="text-gray-700">Kumbakonam - 612001</p>
        <p className="text-gray-700 flex items-center gap-2">
          +91 7538814331
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
