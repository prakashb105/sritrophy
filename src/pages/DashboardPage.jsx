// import { useEffect, useState } from "react";
// import { auth } from "../utils/firebaseConfig";
// import { ref, get } from "firebase/database";
// import { db } from "../utils/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable"; // For PDF table formatting
// import * as XLSX from "xlsx"; // For Excel export
// import { FaUniversity, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";

// const DashboardPage = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [allUsers, setAllUsers] = useState([]); // Store all user records
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   // Check if the user is logged in and fetch their details
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         // Check if the user is an admin
//         if (user.email === "admin@mrlight.com") {
//           setIsAdmin(true);

//           // Fetch all user records for admin
//           const usersRef = ref(db, "colleges");
//           const snapshot = await get(usersRef);

//           if (snapshot.exists()) {
//             const usersData = snapshot.val();
//             const usersList = Object.keys(usersData).map((uid) => ({
//               uid,
//               ...usersData[uid],
//             }));
//             setAllUsers(usersList);
//           }
//           return;
//         }

//         // Fetch regular user details
//         const userRef = ref(db, `colleges/${user.uid}`);
//         const snapshot = await get(userRef);

//         if (snapshot.exists()) {
//           setUserDetails(snapshot.val());
//         } else {
//           alert("No data found for this user.");
//           navigate("/");
//         }
//       } else {
//         navigate("/login"); // Redirect to login if not logged in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription
//   }, [navigate]);

//   // Download as PDF
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(18);
//     doc.text("Admin Panel - User Records", 14, 22);

//     // Prepare data for the table
//     const tableData = allUsers.map((user) => [
//       user.name,
//       user.address,
//       user.facultyName,
//       user.facultyNumber,
//       user.email,
//       user.registeredSports?.details?.teamName ?? "N/A",
//       user.registeredSports?.details?.registrarName ?? "N/A",
//       user.registeredSports?.details?.phoneNumber ?? "N/A",
//       user.registeredSports?.men?.join(", ") ?? "N/A",
//       user.registeredSports?.women?.join(", ") ?? "N/A",
//     ]);

//     // Add table to PDF
//     doc.autoTable({
//       head: [
//         [
//           "College Name",
//           "Address",
//           "Faculty Name",
//           "Faculty Number",
//           "Email",
//           "Team Name",
//           "Registrar Name",
//           "Phone Number",
//           "Men's Sports",
//           "Women's Sports",
//         ],
//       ],
//       body: tableData,
//       startY: 30, // Start table below the title
//     });

//     // Save the PDF
//     doc.save("user_records.pdf");
//   };

//   // Download as Excel
//   const handleDownloadExcel = () => {
//     // Prepare data for the Excel sheet
//     const worksheetData = allUsers.map((user) => ({
//       "College Name": user.name,
//       "Address": user.address,
//       "Faculty Name": user.facultyName,
//       "Faculty Number": user.facultyNumber,
//       "Email": user.email,
//       "Team Name": user.registeredSports?.details?.teamName ?? "N/A",
//       "Registrar Name": user.registeredSports?.details?.registrarName ?? "N/A",
//       "Phone Number": user.registeredSports?.details?.phoneNumber ?? "N/A",
//       "Men's Sports": user.registeredSports?.men?.join(", ") ?? "N/A",
//       "Women's Sports": user.registeredSports?.women?.join(", ") ?? "N/A",
//       "Payment Screenshot": user.registeredSports?.details?.paymentScreenshot ?? "N/A",
//     }));
  
//     // Create a worksheet
//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
//     // Bold Headers (Excel Built-in Formatting Trick)
//     const headerKeys = Object.keys(worksheetData[0]);
//     const headerRow = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: headerKeys.length - 1 } });
//     worksheet["!rows"] = [{ hpt: 20 }]; // Increase header row height for visibility
//     worksheet["!merges"] = []; // No merged cells, keeping it clean
  
//     // Auto-fit Column Width
//     worksheet["!cols"] = headerKeys.map((key) => ({
//       wch: Math.max(15, key.length + 5), // Ensure proper width for visibility
//     }));
  
//     // Create a workbook
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "User Records");
  
//     // Save the Excel file
//     XLSX.writeFile(workbook, "user_records.xlsx");
//   };


//   if (isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-6">
//         <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-full max-w-8xl mx-auto mt-20">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>
//           <div className="overflow-x-auto">
//             <div className="hidden md:block">
//               <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
//                 <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white sticky top-0">
//                   <tr>
//                     <th className="py-3 px-4 text-left">College Name</th>
//                     <th className="py-3 px-4 text-left">Address</th>
//                     <th className="py-3 px-4 text-left">Faculty Name</th>
//                     <th className="py-3 px-4 text-left">Faculty Number</th>
//                     <th className="py-3 px-4 text-left">Email</th>
//                     <th className="py-3 px-4 text-left">Team Name</th>
//                     <th className="py-3 px-4 text-left">Registrar Name</th>
//                     <th className="py-3 px-4 text-left">Phone Number</th>
//                     <th className="py-3 px-4 text-left">Payment Screenshot URL</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {allUsers.map((user, index) => (
//                     <tr key={index} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                       <td className="py-3 px-4 text-gray-700">{user.name}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.address}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.facultyName}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.facultyNumber}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.email}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.teamName ?? "N/A"}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.registrarName ?? "N/A"}</td>
//                       <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.phoneNumber ?? "N/A"}</td>
//                       <td className="py-3 px-4 text-gray-700">
//                       {user.registeredSports?.details?.paymentScreenshot ? (
//                         <a 
//                           href={user.registeredSports.details.paymentScreenshot} 
//                           target="_blank" 
//                           rel="noreferrer" 
//                           className="text-blue-500 underline"
//                         >
//                           View Screenshot
//                         </a>
//                       ) : (
//                         <span className="text-gray-700">N/A</span>
//                     )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="md:hidden flex flex-col gap-4">
//               {allUsers.map((user, index) => (
//                 <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
//                   <p className="font-semibold text-lg text-gray-800">{user.name}</p>
//                   <p className="text-gray-700"><strong>Address:</strong> {user.address}</p>
//                   <p className="text-gray-700"><strong>Faculty:</strong> {user.facultyName} ({user.facultyNumber})</p>
//                   <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
//                   <p className="text-gray-700"><strong>Team:</strong> {user.registeredSports?.details?.teamName ?? "N/A"}</p>
//                   <p className="text-gray-700"><strong>Registrar:</strong> {user.registeredSports?.details?.registrarName ?? "N/A"}</p>
//                   <p className="text-gray-700"><strong>Phone:</strong> {user.registeredSports?.details?.phoneNumber ?? "N/A"}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Download Buttons */}
//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               onClick={handleDownloadPDF}
//               className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
//             >
//               Download as PDF
//             </button>
//             <button
//               onClick={handleDownloadExcel}
//               className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
//             >
//               Download as Excel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!userDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>

//         {/* College Details */}
//         <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-md flex flex-col gap-4">
//           <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2"><FaUniversity /> College Details</h2>
//           <p className="text-gray-700 flex items-center gap-2"><FaUniversity /><strong>Name:</strong> {userDetails.name}</p>
//           <p className="text-gray-700 flex items-center gap-2"><FaMapMarkerAlt /><strong>Address:</strong> {userDetails.address}</p>
//           <p className="text-gray-700 flex items-center gap-2"><FaUserTie /><strong>Faculty:</strong> {userDetails.facultyName}</p>
//           <p className="text-gray-700 flex items-center gap-2"><FaPhone /><strong>Contact:</strong> {userDetails.facultyNumber}</p>
//           <p className="text-gray-700 flex items-center gap-2"><FaEnvelope /><strong>Email:</strong> <span className="text-[12px]">{userDetails.email}</span></p>
//         </div>

//         {/* Registered Sports */}
//         <div className="mb-6 p-6 bg-green-50 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-green-700 flex items-center gap-2"><FaUsers /> Registered Sports</h2>
//           <div className="mt-2">
//             <h3 className="text-lg font-medium text-gray-800">Men's Sports</h3>
//             <ul className="list-disc list-inside text-gray-700 ml-4">
//               {userDetails.registeredSports?.men?.length > 0 ? (
//                 userDetails.registeredSports.men.map((sport, index) => (
//                   <li key={index}>{sport}</li>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No men's sports registered</p>
//               )}
//             </ul>
//           </div>

//           <div className="mt-4">
//             <h3 className="text-lg font-medium text-gray-800">Women's Sports</h3>
//             <ul className="list-disc list-inside text-gray-700 ml-4">
//               {userDetails.registeredSports?.women?.length > 0 ? (
//                 userDetails.registeredSports.women.map((sport, index) => (
//                   <li key={index}>{sport}</li>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No women's sports registered</p>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Team Details */}
//         <div className="p-6 bg-yellow-50 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-yellow-700 flex items-center gap-2"><FaUsers /> Team Details</h2>
//           <p className="text-gray-700 flex items-center gap-2 mb-3 mt-4"><FaUniversity /><strong>College:</strong> {userDetails.name ?? "N/A"}</p>
//           <p className="text-gray-700 flex items-center gap-2 mb-3"><FaUsers /><strong>Team:</strong> {userDetails.registeredSports?.details?.teamName ?? "N/A"}</p>
//           <p className="text-gray-700 flex items-center gap-2 mb-3"><FaUserTie /><strong>Your Name:</strong> {userDetails.registeredSports?.details?.registrarName ?? "N/A"}</p>
//           <p className="text-gray-700 flex items-center gap-2"><FaPhone /><strong>Phone:</strong> {userDetails.registeredSports?.details?.phoneNumber ?? "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { ref, get, set } from "firebase/database"; // Import `set` for updating Firebase
import { db } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaUniversity, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaPhone, FaUsers, FaToggleOn, FaToggleOff } from "react-icons/fa";
import RegistrationToggle from "../components/RegistrationToggle";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false); // State for toggle
  const navigate = useNavigate();

  // Check if the user is logged in and fetch their details
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if the user is an admin
        if (user.email === "admin@mrlight.com") {
          setIsAdmin(true);

          // Fetch all user records for admin
          const usersRef = ref(db, "colleges");
          const snapshot = await get(usersRef);

          if (snapshot.exists()) {
            const usersData = snapshot.val();
            const usersList = Object.keys(usersData).map((uid) => ({
              uid,
              ...usersData[uid],
            }));
            setAllUsers(usersList);
          }

          // Fetch registration status
          const statusRef = ref(db, "registrationStatus");
          const statusSnapshot = await get(statusRef);
          if (statusSnapshot.exists()) {
            setRegistrationStatus(statusSnapshot.val());
          }
          return;
        }

        // Fetch regular user details
        const userRef = ref(db, `colleges/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserDetails(snapshot.val());
        } else {
          alert("No data found for this user.");
          navigate("/");
        }
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  // Toggle registration status
  const handleToggleRegistration = async () => {
    const newStatus = !registrationStatus;
    setRegistrationStatus(newStatus);

    // Update registration status in Firebase
    const statusRef = ref(db, "registrationStatus");
    await set(statusRef, newStatus);
  };

  // Download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Admin Panel - User Records", 14, 22);

    // Prepare data for the table
    const tableData = allUsers.map((user) => [
      user.name,
      user.address,
      user.facultyName,
      user.facultyNumber,
      user.email,
      user.registeredSports?.details?.teamName ?? "N/A",
      user.registeredSports?.details?.registrarName ?? "N/A",
      user.registeredSports?.details?.phoneNumber ?? "N/A",
      user.registeredSports?.men?.join(", ") ?? "N/A",
      user.registeredSports?.women?.join(", ") ?? "N/A",
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [
        [
          "College Name",
          "Address",
          "Faculty Name",
          "Faculty Number",
          "Email",
          "Team Name",
          "Registrar Name",
          "Phone Number",
          "Men's Sports",
          "Women's Sports",
        ],
      ],
      body: tableData,
      startY: 30, // Start table below the title
    });

    // Save the PDF
    doc.save("user_records.pdf");
  };

  // Download as Excel
  const handleDownloadExcel = () => {
    // Prepare data for the Excel sheet
    const worksheetData = allUsers.map((user) => ({
      "College Name": user.name,
      "Address": user.address,
      "Faculty Name": user.facultyName,
      "Faculty Number": user.facultyNumber,
      "Email": user.email,
      "Team Name": user.registeredSports?.details?.teamName ?? "N/A",
      "Registrar Name": user.registeredSports?.details?.registrarName ?? "N/A",
      "Phone Number": user.registeredSports?.details?.phoneNumber ?? "N/A",
      "Men's Sports": user.registeredSports?.men?.join(", ") ?? "N/A",
      "Women's Sports": user.registeredSports?.women?.join(", ") ?? "N/A",
      "Payment Screenshot": user.registeredSports?.details?.paymentScreenshot ?? "N/A",
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Bold Headers (Excel Built-in Formatting Trick)
    const headerKeys = Object.keys(worksheetData[0]);
    const headerRow = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: headerKeys.length - 1 } });
    worksheet["!rows"] = [{ hpt: 20 }]; // Increase header row height for visibility
    worksheet["!merges"] = []; // No merged cells, keeping it clean

    // Auto-fit Column Width
    worksheet["!cols"] = headerKeys.map((key) => ({
      wch: Math.max(15, key.length + 5), // Ensure proper width for visibility
    }));

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Records");

    // Save the Excel file
    XLSX.writeFile(workbook, "user_records.xlsx");
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-6">
        <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-full max-w-8xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>

          <RegistrationToggle />

          {/* User Records Table */}
          <div className="overflow-x-auto">
            <div className="hidden md:block">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left">College Name</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Faculty Name</th>
                    <th className="py-3 px-4 text-left">Faculty Number</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Team Name</th>
                    <th className="py-3 px-4 text-left">Registrar Name</th>
                    <th className="py-3 px-4 text-left">Phone Number</th>
                    <th className="py-3 px-4 text-left">Payment Screenshot URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allUsers.map((user, index) => (
                    <tr key={index} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <td className="py-3 px-4 text-gray-700">{user.name}</td>
                      <td className="py-3 px-4 text-gray-700">{user.address}</td>
                      <td className="py-3 px-4 text-gray-700">{user.facultyName}</td>
                      <td className="py-3 px-4 text-gray-700">{user.facultyNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.teamName ?? "N/A"}</td>
                      <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.registrarName ?? "N/A"}</td>
                      <td className="py-3 px-4 text-gray-700">{user.registeredSports?.details?.phoneNumber ?? "N/A"}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {user.registeredSports?.details?.paymentScreenshot ? (
                          <a
                            href={user.registeredSports.details.paymentScreenshot}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Screenshot
                          </a>
                        ) : (
                          <span className="text-gray-700">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden flex flex-col gap-4">
              {allUsers.map((user, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {user.address}</p>
                  <p className="text-gray-700"><strong>Faculty:</strong> {user.facultyName} ({user.facultyNumber})</p>
                  <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                  <p className="text-gray-700"><strong>Team:</strong> {user.registeredSports?.details?.teamName ?? "N/A"}</p>
                  <p className="text-gray-700"><strong>Registrar:</strong> {user.registeredSports?.details?.registrarName ?? "N/A"}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {user.registeredSports?.details?.phoneNumber ?? "N/A"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Download as PDF
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              Download as Excel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>

        {/* College Details */}
        <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2"><FaUniversity /> College Details</h2>
          <p className="text-gray-700 flex items-center gap-2"><FaUniversity /><strong>Name:</strong> {userDetails.name}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaMapMarkerAlt /><strong>Address:</strong> {userDetails.address}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaUserTie /><strong>Faculty:</strong> {userDetails.facultyName}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaPhone /><strong>Contact:</strong> {userDetails.facultyNumber}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaEnvelope /><strong>Email:</strong> <span className="text-[12px]">{userDetails.email}</span></p>
        </div>

        {/* Registered Sports */}
        <div className="mb-6 p-6 bg-green-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 flex items-center gap-2"><FaUsers /> Registered Sports</h2>
          <div className="mt-2">
            <h3 className="text-lg font-medium text-gray-800">Men's Sports</h3>
            <ul className="list-disc list-inside text-gray-700 ml-4">
              {userDetails.registeredSports?.men?.length > 0 ? (
                userDetails.registeredSports.men.map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))
              ) : (
                <p className="text-gray-500">No men's sports registered</p>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800">Women's Sports</h3>
            <ul className="list-disc list-inside text-gray-700 ml-4">
              {userDetails.registeredSports?.women?.length > 0 ? (
                userDetails.registeredSports.women.map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))
              ) : (
                <p className="text-gray-500">No women's sports registered</p>
              )}
            </ul>
          </div>
        </div>

        {/* Team Details */}
        <div className="p-6 bg-yellow-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-700 flex items-center gap-2"><FaUsers /> Team Details</h2>
          <p className="text-gray-700 flex items-center gap-2 mb-3 mt-4"><FaUniversity /><strong>College:</strong> {userDetails.name ?? "N/A"}</p>
          <p className="text-gray-700 flex items-center gap-2 mb-3"><FaUsers /><strong>Team:</strong> {userDetails.registeredSports?.details?.teamName ?? "N/A"}</p>
          <p className="text-gray-700 flex items-center gap-2 mb-3"><FaUserTie /><strong>Your Name:</strong> {userDetails.registeredSports?.details?.registrarName ?? "N/A"}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaPhone /><strong>Phone:</strong> {userDetails.registeredSports?.details?.phoneNumber ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;