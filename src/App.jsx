import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import Home from './Pages/Home';
import InitialPickSkillsPage from './Pages/InitialPickSkillsPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';
import InitialPickMatchesPage from './Pages/InitialPickMatchesPage';

function App() {
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  //TODO: add token.
  const [user, setUser] = useState({ username: localStorage.getItem("user") || '' });

  return(
    <BrowserRouter>
        <Header username={user.username} setUser={setUser} />
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route index element={<Home user={user} />} />
        <Route path='pick-skills' element={<InitialPickSkillsPage username={newUserData.username} />} />
        <Route path='pick-matches' element={<InitialPickMatchesPage setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="register" element={<Register setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="sign-in" element={<SignIn setUser={setUser} username={user.username} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;