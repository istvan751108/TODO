// Input.jsx

import React from "react";

const Input = ({ name, label, errorMsg = "", onChange, type = "text", options }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          id={name}
          onChange={onChange}
          className={"form-control" + (errorMsg.length > 0 ? " is-invalid" : "")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          className={"form-control" + (errorMsg.length > 0 ? " is-invalid" : "")}
        />
      )}
      {errorMsg.length > 0 && <span className="invalid-feedback">{errorMsg}</span>}
    </>
  );
};

export function Textarea({ name, label, onChange, errorMsg = "" }) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        className={"form-control" + (errorMsg.length > 0 ? " is-invalid" : "")}
        cols="100"
        rows="3"
      ></textarea>
      {errorMsg.length > 0 && <span className="invalid-feedback">{errorMsg}</span>}
    </>
  );
}

export default Input;
