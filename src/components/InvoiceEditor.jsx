import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "./InvoiceContext";
import "./InvoiceEditor.css";

const InvoiceEditor = () => {
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const [to, setTo] = useState("");
  const [notes, setNotes] = useState(`1. Mentioned Cabling is approximate. Final Qty will be calculated after Installation
2. Payment – 50% advance with confirmed PO. Balance after Supply of Materials`);
  const [date, setDate] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 0, rate: 0 }]);
  const [subject, setSubject] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "description" ? value : parseFloat(value || 0);
    setItems(updated);
  };

  const addRow = () => {
    if (items.length >= 8) {
      alert("You can only add up to 8 items.");
      return;
    }
    setItems([...items, { description: "", qty: 0, rate: 0 }]);
  };

  const deleteRow = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const getItemTotal = (item) => item.qty * item.rate;

  const getGrandTotal = () =>
    items.reduce((sum, item) => sum + getItemTotal(item), 0);

  const handleNext = () => {
    const data = {
      to,
      date,
      subject,
      notes,
      items,
      grandTotal: getGrandTotal(),
    };
    setInvoiceData(data);
    navigate("/preview");
  };

  useEffect(() => {
    if (invoiceData) {
      setTo(invoiceData.to);
      setDate(invoiceData.date);
      setSubject(invoiceData.subject);
      setNotes(invoiceData.notes);
      setItems(invoiceData.items);
    }
  }, []);

  return (
    <div className="invoice-editor">
      <h2>Create Invoice</h2>

      <div className="invoice-form">
        <label>To:</label>
        <textarea
          rows="3"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Client name and address"
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Subject:</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Quotation subject"
        />

        <label>Notes:</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleChange(index, "qty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                />
              </td>
              <td>{getItemTotal(item).toFixed(2)}</td>
              <td>
                <button onClick={() => deleteRow(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-actions">
        <button onClick={addRow} disabled={items.length >= 8}>
          + Add Row
        </button>
        <div className="grand-total">
          Grand Total: ₹ {getGrandTotal().toFixed(2)}
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>
        ➡️ Next
      </button>
    </div>
  );
};

export default InvoiceEditor;
