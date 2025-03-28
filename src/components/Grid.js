import React, { useState, useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import Cell from "./Cell";

const numRows = 10000;
const numCols = 26;
const columnWidth = 120; 
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
    if (value.startsWith("=")) {
      try {
        const formula = value.substring(1);
        const result = formula.replace(/([A-Z]+)(\d+)/g, (match, colRef, rowRef) => {
          const cellKey = `${colRef}${rowRef}`;
          return prev[cellKey] || 0; 
        });
        newData[`${col}${row}`] = eval(result);
      } catch (error) {
        console.error("Invalid formula:", value);
      }
    }

    return newData;
  });
};

  const Row = useCallback(({ index, style }) => {
    return (
      <div key={index} className="flex" style={style}>
        <div
          className="text-center font-bold border-r border-gray-300 flex items-center justify-center bg-gray-100"
          style={{ height: rowHeight, width: 50 }}
        >
          {index + 1}
        </div>
        {columnLabels.map((col) => (
          <Cell
            key={`${col}${index + 1}`}
            row={index + 1}
            col={col}
            value={data[`${col}${index + 1}`] || ""}
            onChange={handleCellChange}
            style={{
              width: columnWidth, 
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
      <div
        className="flex sticky top-0 bg-gray-100 border-b border-gray-300"
        style={{
          width: numCols * columnWidth + 50, 
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
      <List
        ref={listRef}
        height={window.innerHeight - 50} 
        itemCount={numRows}
        itemSize={rowHeight}
        width={numCols * columnWidth + 50} 
      >
        {Row}
      </List>
    </div>
  );
};

export default Spreadsheet;