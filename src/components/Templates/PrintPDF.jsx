// PrintPDF.jsx
import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PrintPDF = ({ contentRef }) => {
  const handlePrint = async () => {
    // Ensure that contentRef is defined and has a current property
    if (!contentRef || !contentRef.current) {
      console.error("Content not found");
      return;
    }

    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error creating PDF", error);
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print to PDF</button>
    </div>
  );
};

export default PrintPDF;
