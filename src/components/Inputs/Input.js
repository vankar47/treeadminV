import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const MyInput = props => {
  const { error, label, className, onChange } = props;
  let classes = className + " form-control form-control-alternative text-black";
  if (error) {
    classes = classes + " border border-danger";
  }
  return (
    <FormGroup>
      {label && <Label className="form-control-label">{label}</Label>}
      <Input
        {...props}
        className={classes}
        autoComplete="off"
        onChange={e => {
          if (onChange) onChange(e.target.value);
        }}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </FormGroup>
  );
};

export default MyInput;
