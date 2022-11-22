import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";

import React from "react";
import { 
  BrowserRouter as Router,
   Switch, Route, Link, Routes,useParams ,
  } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
