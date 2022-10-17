import React from 'react';
import './App.css';
//import { ButtonFetcher } from './components/ButtonFetcher';  // tutte importazioni non default, quindi 
//import { MapEntry } from './components/MapEntry';  // vanno fatte tutte con il nome classe tra parentesi {}.
import { Header } from './components/Header';
//import { ButtonMatches } from './components/ButtonMatches';
import { ButtonSearch } from './components/ButtonSearch';
import { Helper } from './components/Helper';
import { CustomFooter } from './components/CustomFooter';
import { NavBar } from './components/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <div id="search-container">
        <Helper />
        <ButtonSearch type="search-input-home" />
      </div>
      <CustomFooter position="stay_fixed" />
    </div>
  );
}

export default App;
