import SportsCard from "../components/SportsCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import { db } from "../utils/firebaseConfig";
import { ref, get } from "firebase/database";

const SportsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [hasRegistered, setHasRegistered] = useState(false); // Track registration status
    const [showModal, setShowModal] = useState(false);
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

    const handleClick = (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        setShowModal(true);
      }
    };

    // Check if the user is logged in and has registered for sports
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setIsLoggedIn(true);

            // Check if the user has registered for any sports
            const registeredSportsRef = ref(db, `colleges/${user.uid}/registeredSports`);
            const snapshot = await get(registeredSportsRef);

            if (snapshot.exists()) {
            const registeredSports = snapshot.val();
            if (registeredSports.men.length > 0 || registeredSports.women.length > 0) {
                setHasRegistered(true); // User has registered for sports
            }
            }
        } else {
            setIsLoggedIn(false);
        }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

  const sports = [
    {   id: 1,
        sport: "Cricket", 
        gender: "men", 
        details: [
            "Tournament will be conducted on knockout basis",
            "Maximum of 15 players per team",
            "4-piece cricket balls will be provided for the matches by the organiser on payment basis 1st and 2nd rounds will be 14 overs",
            "Semifinals and Finals will be 16 overs",
            "The number of overs change depending upon the weather",
            "Registration on first come first served basis",
            "PRIZES Winner ₹7,000 | Runner ₹4,000 | Third ₹2,000",
            "CONTACT: S. B. Ashok Kumar - 7305817289"
        ], 
        image: "/images/Cricket.png" },
    {   id: 2,
        sport: "Chess", 
        gender: "men & women", 
        details: [
            "Tournament will be a Team Championship under Swiss format and FIDE rules",  
            "Maximum of 5 players per team (4+1)",  
            "Players should bring their own board and chess clock",  
            "Each round will be of 2 hours (1 hour per player)",  
            "Matches will be held separately for men and women",  
            "PRIZES FOR MEN: Winner ₹3,000 | Runner ₹2,000 | Third ₹1,000",
            "PRIZES FOR WOMEN: Winner ₹3,000 | Runner ₹2,000 | Third ₹1,000",
            "CONTACT: Thenubhuvaneshwaran - 8610998626"
        ], 
        image: "/images/Chess.png" },
    {   id: 3,
        sport: "Football", 
        gender: "men", 
        details: [
            "Tournament will be conducted on knockout",  
            "Each half will be 30 minutes (30 - 5 - 30)",  
            "Maximum of 16 players per team",  
            "Maximum of 5 substitutes are allowed",  
            "Proper kit is Mandatory (shoes and shin pads are necessary)",  
            "In case of tie, the winner will be decided by a penalty shootout",  
            "Registration on first come first served basis",  
            "PRIZES: Winner ₹7,000 | Runner ₹4,000 | Third ₹2,000", 
            "CONTACT: Sudharshan - 9342632029"
        ], 
        image: "/images/Football.png" },
    {   id: 4,
        sport: "Kabaddi", 
        gender: "men", 
        details:  [
            "Tournament will be conducted on knockout",  
            "Maximum of 12 players per team (7+5)",  
            "Each half will be 20 minutes (20 - 5 - 20)",  
            "Registration on first come first served basis",  
            "PRIZES: Winner ₹7,000 | Runner ₹4,000 | Third ₹2,000",
            "CONTACT: Ramakrishnan - 9360854508"
        ], 
        image: "/images/Kabaddi.png" },
    {   id: 5,
        sport: "Table Tennis", 
        gender: "men & women", 
        details: [
            "Tournament will be conducted in ABC - XYZ format, or knockout / league basis",  
            "Maximum of 4 and minimum of 3 players per team",  
            "Matches will be played for 11 points, 5 sets per match",  
            "Matches will be played as follows: A Vs X, B Vs Y & C Vs Z",  
            "In case neither team wins all 3 matches, A Vs Y, B Vs X will be played (first team to win 3 matches wins)",  
            "Order of preference should be given to the referee before the match",  
            "Registration on first come first served basis",  
            "PRIZES: Winner ₹3,000 | Runner ₹2,000 | Third ₹1,000",
            "CONTACT: Yashmitha - 8637495228"
        ], 
        image: "/images/TableTennis.png" },
    {   id: 6,
        sport: "Basketball", 
        gender: "men & women", 
        details: [
            "Tournament will be conducted on knockout",
            "There will be 4 quarters of 10 minutes each",
            "Maximum of 12 players per team",
            "Matches will be conducted on synthetic / wooden court",
            "Registration on first come first serve basis",
            "PRIZES FOR MEN: Winner ₹7,000 | Runner ₹4,000 | Third ₹2,000",
            "PRIZES FOR WOMEN: Winner ₹5,000 | Runner ₹3,000 | Third ₹1,000",
            "CONTACT: Sahana - 9500737877"
        ], 
        image: "/images/Basketball.png" },
    {   id: 7,
        sport: "Volleyball", 
        gender: "men", 
        details: [
            "Tournament will be conducted on knockout",  
            "Maximum of 12 players per team",  
            "Current FIVB rules will be followed",  
            "All matches will be conducted on best of 3 format",  
            "Registration on first come first served basis",  
            "PRIZES: Winner ₹7,000 | Runner ₹4,000 | Third ₹2,000",
            "CONTACT: Santhosh - 9597940123"
        ], 
        image: "/images/Volleyball.png" },
  ];

  return (
    <div className="p-4 pt-28 flex flex-col items-center">
      <Link
        to="/sport-registration"
        className={`relative inline-block mb-6 font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${
          !status ? "cursor-not-allowed opacity-70 border-2 border-dashed border-black text-gray-900" :
          isLoggedIn
            ? "border-2 bg-gradient-to-r from-blue-700 to-red-600 hover:scale-105 shadow-lg hover:shadow-xl text-white"
            : "bg-gray-400 cursor-not-allowed opacity-70 text-white"
        }`}
        onClick={handleClick}
      >
        {!status ? "Registration Closed" : isLoggedIn ? "Register Here" : "Please Login to Register"}
      </Link> 
      <div className="space-y-4">
        {sports.map((sport) => (
          <SportsCard key={sport.id} {...sport} />
        ))}
      </div>
      <div className="font-bold text-3xl text-center mt-10 text-primary">
        <h2>Check out our brochure to know more and register for Events!</h2>
        <Link to="/brochure" className="text-2xl text-white bg-secondary px-4 py-2 rounded mt-4 inline-block">
          View Brochure
        </Link>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold">Login Required</h2>
            <p className="text-gray-600 mt-2">
              Please log in to register for sports.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default SportsPage;