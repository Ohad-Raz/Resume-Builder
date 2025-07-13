import React from "react";
import styles from "./Guide.module.css";

function Guide() {
  return (
    <div className={styles.guideContainer}>
      <div className={styles.content}>
        <h2>Resume Builder</h2>
        <p>
          Welcome to our Resume Builder, the ultimate tool for crafting
          professional resumes with ease. Whether you're a recent graduate
          entering the job market or a seasoned professional looking for new
          opportunities, our user-friendly platform empowers you to create a
          standout resume in just a few simple steps.
        </p>
        <h2>How to Use</h2>
        <ul>
          <li>
            <strong>Personal Info:</strong> Fill in your contact information
            including name, phone number, email address, and professional links.
          </li>
          <li>
            <strong>Education:</strong> Input your educational background,
            including degrees, certifications, and relevant coursework.
          </li>
          <li>
            <strong>Experience:</strong> List your work experience, including
            job titles, companies, dates of employment, and responsibilities.
          </li>
          <li>
            <strong>Generate PDF:</strong> Click a button to generate a
            high-quality PDF version of your resume for sharing or printing.
          </li>
          <li>
            <strong>Save Multiple Resumes:</strong> Save multiple resumes to
            create a personalized library for different roles or industries.
          </li>
        </ul>
        <h2>Additional Information</h2>
        <p>
          Additionally, our platform allows you to save multiple resumes,
          creating a personalized library of your professional history. This
          feature is particularly useful if you're applying for different roles
          or tailoring your resume for specific industries. You can access your
          saved resumes page at any time, making it effortless to update, edit,
          or even create new resumes as your career progresses.
        </p>
        <p>
          With our Resume Builder, you can confidently showcase your
          qualifications, experiences, and skills to potential employers. Start
          building your resume today and unlock new opportunities for your
          professional growth.
        </p>
      </div>
    </div>
  );
}

export default Guide;
