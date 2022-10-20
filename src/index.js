import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { About } from './components/About';
import Contacts from './components/Contacts';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './components/Profile';
import { NotFound } from './components/NotFound';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <App /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contacts" element={ <Contacts /> } />
        <Route path="/profile">
          <Route index element={ <Profile /> } />
          <Route path=":id" element={ <Profile /> } />
        </Route>
        <Route path="/error" element={ <NotFound /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
