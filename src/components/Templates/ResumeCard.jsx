import React from "react";
import styles from "./ResumeCard.module.css";

const ResumeCard = ({ personalInfo, education, experience }) => {
  return (
    <div className={styles.resumeContainer}>
      <div className={styles.sideSection}>
        <h4>Personal Details</h4>
        <div className={styles.personalDetails}>
          <p>
            {personalInfo.firstName} {personalInfo.lastName}
          </p>
          <img src={personalInfo.profilePhoto} alt="Profile" className={styles.profileImg}/>
          <p>Address: {personalInfo.address}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.nationality}</p>
          <p>{personalInfo.dateOfBirth}</p>
          <p>LinkedIn Profile: {personalInfo.linkedin}</p>
        </div>
      </div>

      <div className={styles.mainSection}>
        <h4>Education</h4>
        <div className={styles.education}>
          {/* Render education details */}
          {education && (
            <ul>
              <li>University: {education.university}</li>
              <li>Degree: {education.degree}</li>
              <li>Study Location: {education.studyLocation}</li>
              <li>Graduation Year: {education.graduationYear}</li>
              <li>About Education: {education.aboutEducation}</li>
            </ul>
          )}
        </div>

        <h4>Work Experience</h4>
        <div className={styles.workExperience}>
          {/* Render work experience details */}
          {Array.isArray(experience) &&
            experience.map((exp, index) => (
              <div key={index}>
                <ul>
                  <li>Company: {exp.CompanyName} Position: {exp.Position}</li>
                  
                  <li>End Year: {exp.EndYear}</li>
                  <li>Start Year: {exp.StartYear}</li>
                  <li>Personal experience: {exp.aboutYourself}</li>
                </ul>
              </div>
            ))}
          {!Array.isArray(experience) && <p>No work experience available</p>}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
