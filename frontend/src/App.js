import './App.css';
import React from "react";
import ViewVideogames from './components/ViewVideogames';
import NavbarLateral from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavbarLateral/>
      <ViewVideogames/>
    </>
  );
}

export default App;
