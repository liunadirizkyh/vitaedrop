import React from "react";

interface TextAreaProps {
  label: string;
  name?: string; // Optional karena di skills kita nggak pakai atribut name
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows = 3,
}: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all rounded-xl resize-none text-sm text-black"
      />
    </div>
  );
}
