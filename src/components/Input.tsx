import React from "react";

interface InputProps {
  label: string;
  value: any;
  setValue: (val: any) => void;
  type: "text" | "number";
  className?: string;
  placeholder: string;
}

const Input = ({
  label,
  value,
  setValue,
  type,
  className = "",
  placeholder = "",
}: InputProps): JSX.Element => {
  return (
    <div className={`${className} flex flex-col`}>
      <label className="font-medium">{label}</label>
      <input
        className="max-w-xl rounded border px-3 py-2 outline-none"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
