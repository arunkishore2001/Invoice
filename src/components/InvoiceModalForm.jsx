import React, { useState } from "react";

const InvoiceModalForm = ({ items, setItems, onNext, date, setDate, to, setTo }) => {
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "description" ? value : parseFloat(value || 0);
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, { description: "", qty: 0, rate: 0 }]);
  };

  const deleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getItemTotal = (item) => item.qty * item.rate;

  return (
    <div className="modal-form">
      <h2>Enter Invoice Details</h2>

      <div className="invoice-meta">
        <div className="meta-to">
          <label>To:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Customer Name or Details"
          />
        </div>
        <div className="meta-date">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Row Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
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
                  onChange={(e) =>
                    handleChange(index, "qty", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleChange(index, "rate", e.target.value)
                  }
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
        <button onClick={addRow}>+ Add Row</button>
        <button onClick={onNext} className="next-btn">
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default InvoiceModalForm;