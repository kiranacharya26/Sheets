import React, { useState, useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import Cell from "./Cell";

const numRows = 10000;
const numCols = 26;
const columnWidth = 120; // 🔹 Ensure header & cells match
const rowHeight = 35;

const columnLabels = Array.from({ length: numCols }, (_, i) =>
  String.fromCharCode(65 + i)
);

const Spreadsheet = () => {
  const [data, setData] = useState({});
  const tableRef = useRef(null);
  const listRef = useRef(null);

  const handleCellChange = (row, col, value) => {
  setData((prev) => {
    let newData = { ...prev, [`${col}${row}`]: value };

    // Check if value starts with '=' (formula)
    if (value.startsWith("=")) {
      try {
        // Extract referenced cells (e.g., A1, B1)
        const formula = value.substring(1);
        const result = formula.replace(/([A-Z]+)(\d+)/g, (match, colRef, rowRef) => {
          const cellKey = `${colRef}${rowRef}`;
          return prev[cellKey] || 0; // Replace with cell value or 0
        });

        // Evaluate the formula safely
        newData[`${col}${row}`] = eval(result);
      } catch (error) {
        console.error("Invalid formula:", value);
      }
    }

    return newData;
  });
};


  // Row Component for Virtualized List
  const Row = useCallback(({ index, style }) => {
    return (
      <div key={index} className="flex" style={style}>
        {/* Row Number */}
        <div
          className="text-center font-bold border-r border-gray-300 flex items-center justify-center bg-gray-100"
          style={{ height: rowHeight, width: 50 }}
        >
          {index + 1}
        </div>
        {/* Cells */}
        {columnLabels.map((col) => (
          <Cell
            key={`${col}${index + 1}`}
            row={index + 1}
            col={col}
            value={data[`${col}${index + 1}`] || ""}
            onChange={handleCellChange}
            style={{
              width: columnWidth, // 🔹 Exact width for alignment
              height: rowHeight,
              minWidth: columnWidth,
              minHeight: rowHeight,
            }}
          />
        ))}
      </div>
    );
  }, [data]);

  return (
    <div ref={tableRef} className="w-full h-screen overflow-auto">
      {/* Column Headers (A-Z) */}
      <div
        className="flex sticky top-0 bg-gray-100 border-b border-gray-300"
        style={{
          width: numCols * columnWidth + 50, // 🔹 Adjusted for row numbers
        }}
      >
        <div
          className="w-[50px] border-r border-gray-300 bg-gray-100"
          style={{ minWidth: 50 }}
        ></div>
        {columnLabels.map((col) => (
          <div
            key={col}
            className="text-center font-bold border-r border-gray-300 p-1"
            style={{ width: columnWidth }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Virtualized List for Rows */}
      <List
        ref={listRef}
        height={window.innerHeight - 50} // 🔹 Adjusted for header space
        itemCount={numRows}
        itemSize={rowHeight}
        width={numCols * columnWidth + 50} // 🔹 Ensures full alignment
      >
        {Row}
      </List>
    </div>
  );
};

export default Spreadsheet;
