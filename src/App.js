import React from 'react';
import './css/App.css';
import { Header } from './components/Header';
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
