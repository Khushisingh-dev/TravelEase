import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css"
import HeaderFooter from "./components/HeaderFooter";

const App = () => {
  return (
    <div className="page-layout">
      <HeaderFooter />
      <main >
        <Outlet />
      </main>
      <footer>
        © 2025 TravelEase. All rights reserved.
      </footer>
    </div>
  );
};

export default App;


