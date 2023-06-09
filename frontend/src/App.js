import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shoppingList" element={<List />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
