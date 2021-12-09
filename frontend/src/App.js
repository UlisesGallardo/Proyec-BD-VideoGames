import './App.css';
import React from "react";
import ViewVideogames from './components/ViewVideogames';
import NavbarLateral from './components/navbar';
import ViewIndividual from './components/ViewIndividual';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <NavbarLateral/>
      <Routes>
        <Route path="/" element={<ViewVideogames/>}/>
        <Route path="/info" element={<ViewIndividual/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
