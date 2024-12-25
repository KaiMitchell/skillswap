import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import Home from './Pages/Home';
import InitialPickSkillsPage from './Pages/InitialPickSkillsPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';
import InitialPickMatchesPage from './Pages/InitialPickMatchesPage';
import SettingsModal from './Components/SettingsModal/SettingsModal.jsx';

const backendURL = 'localhost:3000';

function App() {
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  //TODO: add token.
  const [user, setUser] = useState({ username: localStorage.getItem("user") || '' });
  const [filter, setFilter] = useState();
  const [profiles, setProfiles] = useState([]);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    if(filter) {
      filterProfiles(filter);
    } else {
      fetchProfiles();
    }
  }, [user, filter]);

  async function fetchProfiles() {
      console.log(user);
      const response = await fetch(`http://${backendURL}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username })
      });
      const data = await response.json();
      setProfiles(data.data);
  };

  async function filterProfiles(filter) {
    try {
      const response = await fetch(`http://${backendURL}/fetch-filtered-profiles?skill=${filter.skill}&category=${filter.category}`);
      const data = await response.json();
      const results = data.data;
      if(Array.isArray(results) && results.length === 0) {
        console.log('No Data');
        fetchProfiles();
      } else {
        setProfiles(results);
      };
    } catch(err) {
      console.error(err);
    };
  };

  return(
    <BrowserRouter>
        <Header username={user.username} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
        <SettingsModal isSettings={isSettings} setIsSettings={setIsSettings} />
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route index element={<Home profiles={profiles} />} />
        <Route path='pick-skills' element={<InitialPickSkillsPage username={newUserData.username} />} />
        <Route path='pick-matches' element={<InitialPickMatchesPage setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="register" element={<Register setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="sign-in" element={<SignIn setUser={setUser} username={user.username} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;