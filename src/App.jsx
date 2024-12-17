import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
// import Home from './Pages/Home';
import FirstAfterSignUp from './Pages/FirstAfterSignUpPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';

function App() {
    return(
      <BrowserRouter>
          {/* <Header /> */}
        <Routes>  
          <Route path='/' element={<Header />} />
          <Route index element={<FirstAfterSignUp />} />
          <Route path="register" element={<Register />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;