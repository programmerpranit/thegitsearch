import React from "react";

interface InputProps {
  label: string;
  value?: any;
  setValue?: (val: any) => void;
  type: "text" | "number";
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Input = ({
  label,
  value = "",
  setValue = () => {},
  type,
  className = "",
  placeholder = "",
  disabled = false,
  ...rest
}: InputProps & Record<string, any>): JSX.Element => {
  return (
    <div className={`${className} my-3 flex flex-col`}>
      <label className="font-medium">{label}</label>
      <input
        {...rest}
        className="max-w-xl rounded border px-3 py-2 outline-none"
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
