import { ref, set } from "firebase/database";
import { db } from "./firebaseConfig";

const initializeCollegesNode = async () => {
  try {
    // Check if the 'colleges' node exists
    const collegesRef = ref(db, "colleges");
    const snapshot = await get(collegesRef);

    if (!snapshot.exists()) {
      // If it doesn't exist, initialize it as an empty object
      await set(collegesRef, {});
      console.log("Initialized 'colleges' node in the database.");
    } else {
      console.log("'colleges' node already exists.");
    }
  } catch (error) {
    console.error("Error initializing 'colleges' node:", error);
  }
};

export default initializeCollegesNode;