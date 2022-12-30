import './App.css';
import React from "react";
import ViewVideogames from './components/ViewVideogames';
import HomePage from './components/HomePage';
import NavbarLateral from './components/navbar';
import ViewIndividual from './components/ViewIndividual';
import TopPage from "./components/TopPage"
import TopPageMetacritic from "./components/TopPageMetacritic"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage"


function App() {
  return (
    <BrowserRouter>
      <NavbarLateral/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/info" element={<ViewIndividual/>}/>
        <Route path="/toppage" element={<TopPage/>}/>
        <Route path="/TopPageMetacritic" element={<TopPageMetacritic/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
