// ResumeCard.jsx
import React from "react";
import "./ResumeCard.css";
const ResumeCard = ({ personalInfo, education, experience }) => {
  return (
    <div className="ResumeContainer">
      <h4>Personal Details:</h4>
      {personalInfo && (
        <>
          <p>First Name: {personalInfo.firstName}</p>
          <p>Last Name: {personalInfo.lastName}</p>
          <p>Occupation: {personalInfo.occupation}</p>
          <p>Address: {personalInfo.address}</p>
          <p>Phone: {personalInfo.phone}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Nationality: {personalInfo.nationality}</p>
          <p>Date of Birth: {personalInfo.dateOfBirth}</p>
          <p>LinkedIn Profile: {personalInfo.linkedin}</p>
          {/* Add other personal details fields as needed */}
        </>
      )}

      <h4>Education:</h4>
      {education && (
        <>
          <p>University: {education.university}</p>
          <p>Degree: {education.degree}</p>
          <p>Study Location: {education.studyLocation}</p>
          <p>Graduation Year: {education.graduationYear}</p>
          <p>Share Experience: {education.aboutEducation}</p>
          {/* Add other education fields as needed */}
        </>
      )}

      <h4>Work Experience:</h4>
      {experience && (
        <div>
          <p>Company Name: {experience.CompanyName}</p>
          <p>Position: {experience.Position}</p>
          <p>End Year: {experience.EndYear}</p>
          <p>Start Year: {experience.StartYear}</p>
          <p>Share Experience: {experience.aboutYourself}</p>
        </div>
        // Add logic for rendering multiple workplaces if needed
      )}
    </div>
  );
};

export default ResumeCard;
