import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import Home from './Pages/Home';
import InitialPickSkillsPage from './Pages/InitialPickSkillsPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';
import InitialPickMatchesPage from './Pages/InitialPickMatchesPage';

function App() {
    return(
      <BrowserRouter>
          {/* <Header /> */}
        <Routes>  
          <Route path='/' element={<Header />} />
          <Route index element={<InitialPickMatchesPage />} />
          <Route path='pick-skills' element={<InitialPickSkillsPage />} />
          <Route path='pick-matches' element={<InitialPickMatchesPage />} />
          <Route path="register" element={<Register />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;