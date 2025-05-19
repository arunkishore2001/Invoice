// src/components/InvoiceTemplateOverlay.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useContext, useEffect } from "react";
import "./InvoiceEditor.css"; // reuse same styles
import template from "../assets/invoice-template.jpg"; // your background image
import { InvoiceContext } from "./InvoiceContext";




const InvoiceTemplateOverlay = () => {
  const { invoiceData } = useContext(InvoiceContext);
  const { state } = useLocation();
  

  const navigate = useNavigate();

    const data = invoiceData || state;

      if (!data) {
    return (
      <div style={{ padding: 20 }}>
        No invoice data. Please go back and create an invoice.
      </div>
    );
  }

  

  // if (!state) {
  //   // fallback if accessed directly
  //   return <div style={{ padding: 20 }}>No invoice data. Please go back and create an invoice.</div>;
  // }

  const { to, date, subject,notes, items, grandTotal } = data;

 const handleDownload = async () => {
    const element = document.getElementById("pdf-content");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };
  return (
  <div style={{ textAlign: "center", paddingBottom: "20px" }}>
    <button className="download-btn" onClick={handleDownload}>📥 Download PDF</button>
    <button className="back-btn" onClick={() => navigate("/")}>🔙 Back</button>

    <div className="template-wrapper" id="pdf-content">
      <img src={template} alt="Invoice Background" className="invoice-bg" />
      
     <div className="editor-overlay" style={{ fontFamily: "serif", fontSize: "14px" }}>

  {/* ⬅️ To (left) and Date (right) section */}
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  }}>
    <div style={{ fontSize:"16px", textAlign: "left" }}>
  <strong>To:</strong><br />
  <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{to}</pre>
</div>

    <div className="date" style={{  fontSize:"16px", textAlign: "right" }}>
      <strong>Date:</strong>
      {date}
    </div>
  </div>

  {/* ⬇️ Subject */}
  <div style={{ fontSize:"18px",  fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
    Sub: {subject}
  </div>

  {/* ⬇️ Body message */}
  <p style={ { fontSize:"16px", textAlign: "left", marginBottom: "10px" }}>
   <strong>Dear Sir,</strong> <br />
    Thank you for your valuable enquiry.
  </p>

  {/* ⬇️ Table */}
  <table className="invoice-table" style={{ marginTop: "10px" }}>
    <thead>
      <tr>
        <th>Sl.No</th>
        <th>Particulars</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.description}</td>
          <td>{item.qty === 0 ? "-" : item.qty}</td>
          <td>{item.rate.toLocaleString()}</td>
          <td>{(item.qty * item.rate).toLocaleString()}</td>
        </tr>
      ))}
      <tr>
        <td colSpan="4" style={{ textAlign: "right" }}><strong>Total</strong></td>
        <td><strong>{grandTotal.toLocaleString()}</strong></td>
      </tr>
    </tbody>
  </table>
   {notes && (
  <div style={{ marginTop: "20px", textAlign: "left" }}>
    <strong>Notes:</strong>
    <p style={{ whiteSpace: "pre-line" }}>{notes}</p>
  </div>
)}
</div>


    </div>

   

  </div>
);
};

export default InvoiceTemplateOverlay;
