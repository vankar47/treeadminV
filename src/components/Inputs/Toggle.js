import React from "react";

export default props => {
  const { checked, onChange, label } = props;
  return (
    <>
      {label && <label className="form-control-label mt-2">{label}</label>}
      <br />
      <label className="custom-toggle mt-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => {
            e.preventDefault();
            onChange(e.target.checked);
          }}
        />
        <span className="custom-toggle-slider rounded-circle"></span>
      </label>
    </>
  );
};
