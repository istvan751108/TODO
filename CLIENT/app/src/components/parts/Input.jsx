import React from "react";

const Input = ({ name, label, errorMsg = "", onChange, type = "text" }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        className={"form-control" + (errorMsg.length > 0 ? "is-invalid" : "")}
      />
      {errorMsg.length > 0 && (
        <span className="invalid-feedback">{errorMsg}</span>
      )}
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
        className={"form-control" + (errorMsg.length > 0 ? "is-invalid" : "")}
        cols="30"
        rows="10"
      ></textarea>
      {errorMsg.length > 0 && (
        <span className="invalid-feedback">{errorMsg}</span>
      )}
    </>
  );
}
export default Input;
