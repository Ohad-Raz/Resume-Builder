import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "../../components/Context/UserContext";
import { dataBase } from "../../config/firebaseConfig";
import ResumeCard from "../../components/Templates/ResumeCard";
import PrintPDF from "../../components/Templates/PrintPDF";
import { getUserResumes } from "../../components/ResumeServices/ResumeServices";
import Experience from "../../components/Experience/Experience";

import "./MyResumes.css";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const { user } = useUser();
  const resumesRef = collection(dataBase, "resumes");

  // Initialize refs outside the component
  const contentRefs = useRef(
    Array(3)
      .fill(null)
      .map(() => useRef(null))
  );

  useEffect(() => {
    const getMyResumes = async () => {
      try {
        if (!user) {
          return;
        }
        const q = query(resumesRef, where("user", "==", user.uid));
        const rowDocs = await getDocs(q);
        const docs = rowDocs.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        setResumes(docs);
      } catch (err) {
        console.error(err);
      }
    };

    getMyResumes();
  }, [user, resumesRef]);

  const handleDeleteResume = async (resumeId) => {
    try {
      // Construct the document reference
      const resumeDocRef = doc(dataBase, "resumes", resumeId);

      // Delete the document from Firestore
      await deleteDoc(resumeDocRef);

      // Update the state to remove the deleted resume
      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.uid !== resumeId)
      );
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="resumePageContainer">
      <h1>My Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <div>
          {resumes.map((resume, index) => (
            <div key={resume.uid}>
              <div>
                <button onClick={() => handleDeleteResume(resume.uid)}>
                  Delete Resume
                </button>
              </div>
              {contentRefs.current[index]?.current && (
                <PrintPDF contentRef={contentRefs.current[index]} />
              )}
              <ul>
                <li>
                  <div ref={contentRefs.current[index]}>
                    <ResumeCard
                      personalInfo={resume.personalInfo}
                      education={resume.education}
                      experience={resume.experience}
                    />
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;
