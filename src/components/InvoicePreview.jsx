import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoicePreview = ({ items, date, to }) => {
  const getItemTotal = (item) => item.qty * item.rate;
  const getGrandTotal = () =>
    items.reduce((sum, item) => sum + getItemTotal(item), 0);

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
    <div className="preview-table">
      <h2>Invoice Preview</h2>

      <div className="invoice-meta-preview">
        <div><strong>To:</strong> {to}</div>
        <div><strong>Date:</strong> {date}</div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{getItemTotal(item).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grand-total">Grand Total: ₹ {getGrandTotal().toFixed(2)}</div>
      <button onClick={handleDownload} className="download-btn">📥 Download PDF</button>
    </div>
  );
};

export default InvoicePreview;
