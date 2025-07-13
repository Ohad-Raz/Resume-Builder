import React from "react";
import html2pdf from "html2pdf.js";
import "./PrintPDF.css";

const PrintPDF = ({ contentRef }) => {
  const handlePrint = () => {
    if (!contentRef || !contentRef.current) {
      console.error("Content not found");
      return;
    }

    try {
      const options = {
        margin: 0,
      };

      const pdf = new html2pdf(contentRef.current, options);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error creating PDF", error);
    }
  };

  return (
    <div className="printPDFContainer">
      <button className="printPDFBtn" onClick={handlePrint}>
        Print to PDF
      </button>
    </div>
  );
};

export default PrintPDF;
