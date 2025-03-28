 Overview

This project is a React-based spreadsheet that supports large datasets (10,000+ rows) with formula evaluation and cell reference clicking, similar to Excel.

 Features

Virtualized rendering using react-window for performance.

Cell referencing in formulas (e.g., =A1+B2).

Dynamic formula evaluation using mathjs.

🛠 Tech Stack

React (Functional Components, Hooks)

React Window (Virtualized List)

Math.js (Formula Evaluation)

Tailwind CSS (Styling)

📦 Installation

git clone https://github.com/your-repo/spreadsheet.git
cd spreadsheet
npm install
npm start


Type = in a cell to start a formula.




