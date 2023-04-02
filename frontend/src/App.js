import './App.css';
import React from "react";
import NavbarLateral from './components/navbar';
import TopPageMetacritic from "./components/TopPageMetacritic"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage"
import InfoGame from './components/InfoGame';
import ImageGenerationForm from './components/ImageGenerationForm';

function App() {
  return (
    <BrowserRouter>
      <NavbarLateral/>
      <Routes>
        <Route path="/" element={<TopPageMetacritic/>}/>
        <Route path="/info" element={<InfoGame/>}/>
        <Route path="/TopPageMetacritic" element={<TopPageMetacritic/>}/>
        <Route path="/arteGenerativo" element={<ImageGenerationForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
