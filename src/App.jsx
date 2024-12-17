import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import Home from './Pages/Home';
import SignUp from './Pages/Sign-up';
import SignIn from './Pages/Sign-in';

function App() {
    return(
      <BrowserRouter>
          <Header />
        <Routes>  
          <Route path='/' element={<Header />} />
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;