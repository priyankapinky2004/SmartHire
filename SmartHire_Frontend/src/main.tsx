import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // ✔️ correct
import "./index.css"; // ✅ Alternatively, you can move this import here instead of App.tsx

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
