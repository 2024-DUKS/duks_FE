import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import "./App.css";

import Main from "./pages/Main";
import Join from "./pages/Join";
import SignUp from "./pages/SignUp";
import Card from "./pages/Card"

function App() {
  return (
    <div className="App">
      {}
      <Router>
        <Routes>
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/card" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
