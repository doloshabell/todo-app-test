import React from "react";

function Button({ type, variant = "primary", children, ...rest }) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`${
        variant === "primary"
          ? "bg-red-500 text-slate-100 hover:bg-red-700"
          : "bg-slate-300 text-black hover:bg-slate-400"
      } px-5 py-3 rounded-xl text-2xl font-bold`}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  return (
    <select
      id={id}
      className="bg-gray-300 px-5 py-3 rounded-xl text-2xl font-bold"
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
