import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig" // Ensure Firebase is properly configured
import { ref, get, set } from "firebase/database";

const RegistrationToggle = () => {
  const [status, setStatus] = useState(false);

  // Fetch the current status from Firebase
  useEffect(() => {
    const fetchStatus = async () => {
      const statusRef = ref(db, "RegistrationStatus");
      const snapshot = await get(statusRef);
      if (snapshot.exists()) {
        setStatus(snapshot.val() === "on");
      }
    };
    fetchStatus();
  }, []);

  // Toggle the status
  const toggleStatus = async () => {
    const newStatus = !status;
    setStatus(newStatus);
    await set(ref(db, "RegistrationStatus"), newStatus ? "on" : "off");
  };

  return (
    <div className="flex items-center space-x-3 mb-4">
      <span className="text-gray-700 font-bold">Registration</span>
      <button
        onClick={toggleStatus}
        className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${
          status ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            status ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default RegistrationToggle;
