import React, { useState } from "react";

const Cell = ({ row, col, value, onChange, style }) => {
  const [editValue, setEditValue] = useState(value);

  const handleBlur = () => {
    onChange(row, col, editValue);
  };

  return (
    <input
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={handleBlur}
      className="border border-gray-300 w-full h-full px-2"
      style={style}
    />
  );
};

export default Cell;
