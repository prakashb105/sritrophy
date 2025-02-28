// import { useState } from "react";
// import { ref, set, get } from "firebase/database";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { db, auth } from "../utils/firebaseConfig";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const SignUpForm = () => {
//   const [collegeName, setCollegeName] = useState("");
//   const [address, setAddress] = useState("");
//   const [facultyName, setFacultyName] = useState("");
//   const [facultyNumber, setFacultyNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // Options for the searchable dropdown
//   // const collegeOptions = [
//   //   { value: "college1", label: "College 1" },
//   //   { value: "college2", label: "College 2" },
//   //   { value: "college3", label: "College 3" },
//   //   { value: "college4", label: "College 4" },
//   //   { value: "college5", label: "College 5" },
//   //   { value: "college6", label: "College 6" },
//   //   { value: "college7", label: "College 7" },
//   //   { value: "college8", label: "College 8" },
//   //   { value: "college9", label: "College 9" },
//   //   { value: "college10", label: "College 10" },
//   // ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
  
//     if (!agree) {
//       setError("You must agree to the rules!");
//       return;
//     }
  
//     try {
//       // console.log("Step 1: Checking if college is already registered...");
  
//       // Step 1: Check if college already exists
//       // const collegeRef = ref(db, `registeredColleges/${collegeName}`);
//       // const snapshot = await get(collegeRef);
  
//       // if (snapshot.exists()) {
//       //   alert("This college is already registered!");
//       //   return;
//       // }
  
//       console.log("Step 2: Creating user in Firebase Authentication...");
  
//       // Step 2: Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log("User created successfully:", user.uid);
  
//       // Step 3: Save college data to Firebase Realtime Database
//       const collegeData = {
//         name: collegeName,
//         address,
//         facultyName,
//         facultyNumber,
//         email,
//         registeredSports: {}, // Initially empty
//       };
  
//       console.log("Step 3: Saving college data to 'colleges' node...");
//       await set(ref(db, `colleges/${user.uid}`), collegeData);
//       console.log("College data saved to 'colleges' node.");
  
//       // console.log("Step 4: Saving college name to 'registeredColleges' node...");
//       // await set(ref(db, `registeredColleges/${collegeName}`), true);
//       // console.log("College name saved to 'registeredColleges' node.");
  
//       alert("College registered successfully!");
//       navigate("/"); // Redirect to homepage
//     } catch (error) {
//         console.error("Error during signup:", error);
    
//         // Handle specific Firebase authentication errors
//         if (error.code === "auth/email-already-in-use") {
//           alert("This email is already registered! Please use a different email.");
//         } else {
//           alert("Failed to register college. Please try again.");
//         }
//       }
//   };
  

//   return (
//     <>
//     <form onSubmit={handleSubmit} className="space-y-4 -z-30">
//       <div className="-z-40">
//         <label className="block text-sm font-medium text-gray-700">
//           Name of Institution
//         </label>
//         {/* <Select
//           options={collegeOptions}
//           onChange={(selectedOption) => setCollegeName(selectedOption.value)}
//           placeholder="Search or select college..."
//           className="mt-1"
//         /> */}
//         <input
//           type="text"
//           placeholder="Enter College Name"
//           value={collegeName}
//           onChange={(e) => setCollegeName(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Institution Address
//         </label>
//         <input
//           type="text"
//           placeholder="Enter institution address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Faculty Name
//         </label>
//         <input
//           type="text"
//           placeholder="Enter faculty name"
//           value={facultyName}
//           onChange={(e) => setFacultyName(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Faculty Number
//         </label>
//         <input
//           type="text"
//           placeholder="Enter faculty number"
//           value={facultyNumber}
//           onChange={(e) => setFacultyNumber(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Confirm Password
//         </label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full p-2 border rounded mt-1"
//         />
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={agree}
//           onChange={(e) => setAgree(e.target.checked)}
//           className="mr-2"
//         />
//         <span className="text-sm text-gray-700">
//           I acknowledge that I have read and agree to the rules
//         </span>
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         type="submit"
//         className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition duration-300"
//       >
//         Submit
//       </button>
//     </form>
//     {/* Login Link */}
//     <div className="mt-4 text-center">
//     <span className="text-gray-600">Already have an account? </span>
//     <Link to="/login" className="text-secondary hover:underline">
//       Login
//     </Link>
//   </div>
//   </>
//   );
// };

// export default SignUpForm;

// import { useState } from "react";
// import { ref, set } from "firebase/database";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { db, auth } from "../utils/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const SignUpForm = () => {
//   const [collegeName, setCollegeName] = useState("");
//   const [address, setAddress] = useState("");
//   const [facultyName, setFacultyName] = useState("");
//   const [facultyNumber, setFacultyNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (!agree) {
//       setError("You must agree to the rules!");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const collegeData = {
//         name: collegeName,
//         address,
//         facultyName,
//         facultyNumber,
//         email,
//         registeredSports: {},
//       };

//       await set(ref(db, `colleges/${user.uid}`), collegeData);
//       alert("College registered successfully!");
//       navigate("/");
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("This email is already registered! Please use a different email.");
//       } else {
//         alert("Failed to register college. Please try again.");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Institution Name</label>
//         <input
//           type="text"
//           placeholder="Enter College Name"
//           value={collegeName}
//           onChange={(e) => setCollegeName(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Institution Address</label>
//         <input
//           type="text"
//           placeholder="Enter address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Faculty Name</label>
//           <input
//             type="text"
//             placeholder="Enter faculty name"
//             value={facultyName}
//             onChange={(e) => setFacultyName(e.target.value)}
//             className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Faculty Number</label>
//           <input
//             type="text"
//             placeholder="Enter faculty number"
//             value={facultyNumber}
//             onChange={(e) => setFacultyNumber(e.target.value)}
//             className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
//           />
//         </div>
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={agree}
//           onChange={(e) => setAgree(e.target.checked)}
//           className="mr-2"
//         />
//         <span className="text-sm text-gray-700">I acknowledge that I have read and agree to the rules</span>
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         type="submit"
//         className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-80 hover:scale-105 transition transform"
//       >
//         Register
//       </button>

//       <div className="mt-4 text-center">
//         <span className="text-gray-600">Already have an account? </span>
//         <Link to="/login" className="text-primary font-semibold hover:underline">
//           Login
//         </Link>
//       </div>
//     </form>
//   );
// };
// export default SignUpForm;

import { useState } from "react";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [collegeName, setCollegeName] = useState("");
  const [address, setAddress] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [facultyNumber, setFacultyNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (!agree) {
      setError("You must agree to the rules!");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const collegeData = {
        name: collegeName,
        address,
        facultyName,
        facultyNumber,
        email,
        registeredSports: {},
      };

      await set(ref(db, `colleges/${user.uid}`), collegeData);
      setModalMessage("College registered successfully!");
      setShowModal(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setModalMessage("This email is already registered! Please use a different email.");
      } else {
        setModalMessage("Failed to register college. Please try again.");
      }
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Institution Name</label>
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Institution Address</label>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Faculty Name</label>
            <input
              type="text"
              placeholder="Enter faculty name"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Faculty No.</label>
            <input
              type="text"
              placeholder="Enter faculty number"
              value={facultyNumber}
              onChange={(e) => setFacultyNumber(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">I acknowledge that I have read and agree to the rules. <br/>(Visit <a href="brochure" target="_blank" className="text-secondary font-bold">Brochure Page</a> to view all rules)</span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className={`w-full text-white py-3 rounded-lg font-semibold transition transform ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-opacity-80 hover:scale-105"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </div>
      </form>

      {/* Custom Modal for Success/Error Messages */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-medium text-gray-800">{modalMessage}</p>
            <button
              onClick={() => {
                setShowModal(false);
                if (modalMessage === "College registered successfully!") navigate("/");
              }}
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-80 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
