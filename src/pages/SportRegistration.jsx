// import { useState, useEffect } from "react";
// import { ref, set, get } from "firebase/database";
// import { db, auth } from "../utils/firebaseConfig";
// import { useNavigate } from "react-router-dom";

// const SportRegistration = () => {
//   //const [collegeName, setCollegeName] = useState("");
//   const [teamName, setTeamName] = useState("");
//   const [registrarName, setregistrarName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedMenSports, setSelectedMenSports] = useState([]); // Selected sports for men
//   const [selectedWomenSports, setSelectedWomenSports] = useState([]); // Selected sports for women
//   const [error, setError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

//   const navigate = useNavigate();

//   // Check if the user is logged in
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Set isLoggedIn to true if user is logged in
//     });

//     return () => unsubscribe(); // Cleanup subscription
//   }, []);

//   // Sports options for Men and Women
//   const sportsOptions = {
//     Men: ["Cricket", "Chess", "Football", "Kabaddi", "Table Tennis", "Basketball", "Volleyball"],
//     Women: ["Basketball", "Table Tennis", "Chess"],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (!teamName || !registrarName || !phoneNumber) {
//       setError("All fields are required!");
//       return;
//     }

//     // Validate phone number (10 digits)
//     if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
//       setError("Phone number must be 10 digits.");
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         setError("You must be logged in to register.");
//         return;
//       }

//       // Fetch existing registered sports
//       const registeredSportsRef = ref(db, `colleges/${user.uid}/registeredSports`);
//       const existingSports = { details: {}, men: [], women: [] };

//       // Update selected sports for men and women
//       const updatedSports = {
//         details: {
//           //collegeName,
//           teamName,
//           registrarName,
//           phoneNumber,
//         },
//         men: [...new Set([...existingSports.men, ...selectedMenSports])], // Remove duplicates
//         women: [...new Set([...existingSports.women, ...selectedWomenSports])], // Remove duplicates
//       };

//       // Save updated registered sports
//       await set(registeredSportsRef, updatedSports);
//       alert("Registration successful!");
//       navigate("/"); // Redirect to homepage
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setError("Failed to register. Please try again.");
//     }
//   };

//   // Handle selection of men's sports
//   const handleMenSportChange = (sport) => {
//     setSelectedMenSports((prev) =>
//       prev.includes(sport)
//         ? prev.filter((item) => item !== sport) // Deselect
//         : [...prev, sport] // Select
//     );
//   };

//   // Handle selection of women's sports
//   const handleWomenSportChange = (sport) => {
//     setSelectedWomenSports((prev) =>
//       prev.includes(sport)
//         ? prev.filter((item) => item !== sport) // Deselect
//         : [...prev, sport] // Select
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 my-8 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-2xl font-bold text-center mb-6">Sport Registration</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* <div>
//             <label className="block text-sm font-medium text-gray-700">
//               College Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter college name"
//               value={collegeName}
//               onChange={(e) => setCollegeName(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//             />
//           </div> */}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Team Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter team name"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Your Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={registrarName}
//               onChange={(e) => setregistrarName(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//             />
//           </div>

//           {/* Men's Sports */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Men's Sports
//             </label>
//             <div className="space-y-2">
//               {sportsOptions.Men.map((sport) => (
//                 <div key={sport} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`men-${sport}`}
//                     checked={selectedMenSports.includes(sport)}
//                     onChange={() => handleMenSportChange(sport)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={`men-${sport}`} className="text-gray-700">
//                     {sport}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Women's Sports */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Women's Sports
//             </label>
//             <div className="space-y-2">
//               {sportsOptions.Women.map((sport) => (
//                 <div key={sport} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`women-${sport}`}
//                     checked={selectedWomenSports.includes(sport)}
//                     onChange={() => handleWomenSportChange(sport)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={`women-${sport}`} className="text-gray-700">
//                     {sport}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition duration-300"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SportRegistration;


// import { useState, useEffect } from "react";
// import { ref, set } from "firebase/database";
// import { db, auth } from "../utils/firebaseConfig";
// import { useNavigate } from "react-router-dom";

// const SportRegistration = () => {
//   const [teamName, setTeamName] = useState("");
//   const [registrarName, setRegistrarName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedMenSports, setSelectedMenSports] = useState([]);
//   const [selectedWomenSports, setSelectedWomenSports] = useState([]);
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const sportsOptions = {
//     Men: ["Cricket", "Chess", "Football", "Kabaddi", "Table Tennis", "Basketball", "Volleyball"],
//     Women: ["Basketball", "Table Tennis", "Chess"],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!teamName || !registrarName || !phoneNumber) {
//       setError("All fields are required!");
//       return;
//     }
//     if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
//       setError("Phone number must be 10 digits.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const user = auth.currentUser;
//       if (!user) {
//         setError("You must be logged in to register.");
//         setIsSubmitting(false);
//         return;
//       }

//       const registeredSportsRef = ref(db, `colleges/${user.uid}/registeredSports`);
//       const updatedSports = {
//         details: { teamName, registrarName, phoneNumber },
//         men: [...new Set([...selectedMenSports])],
//         women: [...new Set([...selectedWomenSports])],
//       };

//       await set(registeredSportsRef, updatedSports);
//       setShowModal(true); // Show success modal
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setError("Failed to register. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white p-8 mt-28 my-8 rounded-lg shadow-xl max-w-lg w-full">
//         <h1 className="text-3xl font-extrabold text-primary text-center mb-6">Sport Registration</h1>
//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Team Name</label>
//             <input
//               type="text"
//               placeholder="Enter team name"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Your Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={registrarName}
//               onChange={(e) => setRegistrarName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
//             />
//           </div>

//           {/* Men's Sports */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Men's Sports</label>
//             <div className="grid grid-cols-2 gap-3 mt-2">
//               {sportsOptions.Men.map((sport) => (
//                 <label
//                   key={sport}
//                   className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedMenSports.includes(sport)}
//                     onChange={() => setSelectedMenSports((prev) =>
//                       prev.includes(sport) ? prev.filter((item) => item !== sport) : [...prev, sport]
//                     )}
//                     className="mr-2 accent-primary"
//                   />
//                   {sport}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Women's Sports */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Women's Sports</label>
//             <div className="grid grid-cols-2 gap-3 mt-2">
//               {sportsOptions.Women.map((sport) => (
//                 <label
//                   key={sport}
//                   className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedWomenSports.includes(sport)}
//                     onChange={() => setSelectedWomenSports((prev) =>
//                       prev.includes(sport) ? prev.filter((item) => item !== sport) : [...prev, sport]
//                     )}
//                     className="mr-2 accent-primary"
//                   />
//                   {sport}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
//               isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-primary text-white hover:bg-opacity-90"
//             }`}
//           >
//             {isSubmitting ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>

      // {/* Success Modal */}
      // {showModal && (
      //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      //     <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80">
      //       <h2 className="text-xl font-bold text-gray-800">Registration Successful!</h2>
      //       <p className="text-gray-600 mt-2">You have successfully registered.</p>
      //       <button
      //         onClick={() => {
      //           setShowModal(false);
      //           navigate("/");
      //         }}
      //         className="mt-4 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
      //       >
      //         OK
      //       </button>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default SportRegistration;


import { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { db, auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de4ekajqp/image/upload";
const UPLOAD_PRESET = "sritrophy"; // Get from Cloudinary

const SportRegistration = () => {
  const [teamName, setTeamName] = useState("");
  const [registrarName, setRegistrarName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedMenSports, setSelectedMenSports] = useState([]);
  const [selectedWomenSports, setSelectedWomenSports] = useState([]);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [screenshotURL, setScreenshotURL] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const sportsOptions = {
    Men: ["Cricket", "Chess", "Football", "Kabaddi", "Table Tennis", "Basketball", "Volleyball"],
    Women: ["Basketball", "Table Tennis", "Chess"],
  };

  const handleFileChange = (event) => {
    setPaymentScreenshot(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!paymentScreenshot) return alert("Please select a file first.");
    console.log(paymentScreenshot);
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", paymentScreenshot);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", "de4ekajqp");

    try {
      // const response = await axios.post(CLOUDINARY_URL, formData, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // });
      const response=await fetch(CLOUDINARY_URL,
        {
          method:"POST",
          body:formData
        }
      )
      const imgURL=await response.json();
      console.log(imgURL);
      
      setScreenshotURL(imgURL.url);
      setUploading(false);
    } catch (error) {
      console.error("Upload failed", error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName || !registrarName || !phoneNumber || !screenshotURL) {
      setError("All fields and payment screenshot are required!");
      return;
    }
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      setIsSubmitting(true);
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to register.");
        setIsSubmitting(false);
        return;
      }

      const registeredSportsRef = ref(db, `colleges/${user.uid}/registeredSports`);
      const updatedSports = {
        details: { teamName, registrarName, phoneNumber, paymentScreenshot: screenshotURL },
        men: [...new Set([...selectedMenSports])],
        women: [...new Set([...selectedWomenSports])],
      };

      await set(registeredSportsRef, updatedSports);
      setShowModal(true); // Show success modal
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 mt-28 my-8 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-primary text-center mb-6">Sport Registration</h1>
        
        

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={registrarName}
              onChange={(e) => setRegistrarName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>

          {/* Men's Sports */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Men's Sports</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {sportsOptions.Men.map((sport) => (
                <label key={sport} className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  <input
                    type="checkbox"
                    checked={selectedMenSports.includes(sport)}
                    onChange={() =>
                      setSelectedMenSports((prev) =>
                        prev.includes(sport) ? prev.filter((item) => item !== sport) : [...prev, sport]
                      )
                    }
                    className="mr-2 accent-primary"
                  />
                  {sport}
                </label>
              ))}
            </div>
          </div>

          {/* Women's Sports */}
           <div>
             <label className="block text-sm font-semibold text-gray-700">Women's Sports</label>
             <div className="grid grid-cols-2 gap-3 mt-2">
               {sportsOptions.Women.map((sport) => (
                 <label
                   key={sport}
                   className="flex items-center bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                 >
                   <input
                     type="checkbox"
                     checked={selectedWomenSports.includes(sport)}
                     onChange={() => setSelectedWomenSports((prev) =>
                       prev.includes(sport) ? prev.filter((item) => item !== sport) : [...prev, sport]
                     )}
                     className="mr-2 accent-primary"
                   />
                   {sport}
                 </label>
               ))}
             </div>
           </div>

          {/* Payment QR Code */}
          <p className="text-center text-gray-600">Scan the QR code below to make the payment.</p>
          <div className="flex justify-center mb-4">
            <img src="/Payment_QR.jpg" alt="Payment QR Code" className="" />
          </div>

          {/* Payment Screenshot Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Upload Payment Screenshot</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md" />
            
            <button
              type="button"
              onClick={handleUpload}
              className="mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Screenshot"}
            </button>

            {screenshotURL && <p className="mt-2 text-sm text-green-600">Uploaded Successfully!</p>}
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg font-semibold text-lg transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-opacity-90"}`}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80">
            <h2 className="text-xl font-bold text-gray-800">Registration Successful!</h2>
            <p className="text-gray-600 mt-2">You have successfully registered.</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="mt-4 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportRegistration;
