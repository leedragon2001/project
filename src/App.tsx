import React from 'react';
// import './App.scss';
import { Routes, BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
