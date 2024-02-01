import React, { useEffect, useState, useContext, useRef } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { dataBase } from "../../config/FireBaseConfig";
import { UserContext } from "../../components/Context/UserContext";
import ResumeCard from "../../components/Templates/ResumeCard";
import PrintPDF from "../../components/Templates/PrintPDF";
import { getUserResumes } from "../../components/ResumeServices/ResumeServices";
import "./MyResumes.css";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const { user } = useContext(UserContext);
  const resumesRef = collection(dataBase, "resumes");

  // Initialize refs outside the component
  const contentRefs = useRef(Array(3).fill(null).map(() => useRef(null)));

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

  return (
    <div className="resumePageContainer">
      <h1>My Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <div>
          {resumes.map((resume, index) => (
            <div key={resume.uid}>
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
