// resumeService.js
import { dataBase } from "../../config/firebaseConfig";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const getUserResumes = async (userId) => {
  const resumesCollection = collection(dataBase, "resumes");
  const userResumesQuery = query(
    resumesCollection,
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(userResumesQuery);
  const resumes = [];

  querySnapshot.forEach((doc) => {
    resumes.push({ id: doc.id, ...doc.data() });
  });

  return resumes;
};
