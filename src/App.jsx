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
  const [skills, setSkills] = useState();
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  //TODO: add token.
  const [user, setUser] = useState({ username: localStorage.getItem("user") || '' });
  const [whichFilter, setWhichFilter] = useState({
    headerFilter: false,
    mainFilter: false
  });
  const [headerFilter, setHeaderFilter] = useState();
  const [mainFilter, setMainFilter] = useState({
      toLearnCategory: '',
      toTeachCategory: '',
      toLearn: '',
      toTeach: '',
      yourGender: '',
      preferredGender: '',
      meetUp: '',
    }
  );
  const [profiles, setProfiles] = useState([]);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {fetchSkills()}, []);
  useEffect(() => {
    if(whichFilter.headerFilter || whichFilter.mainFilter) {
      filterProfiles();
    } else {
      fetchProfiles();
    }
  }, [user, whichFilter]);

  async function fetchProfiles() {
    // setFilter(prev => ({...prev, isFilter: false}));
    const response = await fetch(`http://${backendURL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username })
    });
    const data = await response.json();
    setProfiles(data.data);
  };

  async function fetchSkills() {
    const response = await fetch(`http://localhost:3000/fetch-skills`);
    const data = await response.json();
    setSkills(data.data);
  };

  async function filterProfiles() {
    const reqBody = whichFilter.headerFilter ? { ...headerFilter, headerFilter: true } : { ...mainFilter, mainFilter: true };
    try {
      const response = await fetch(`http://${backendURL}/fetch-filtered-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });
      const data = await response.json();
      const results = data.data;

      if(data.noData) {
        console.log(data.noData);
        return;
      } else if(data.filter === 'main') {
        setWhichFilter({ headerFilter: false, mainFilter: true});
        setProfiles(results);
      } else if(data.filter === 'header') {
        setWhichFilter({ headerFilter: true, mainFilter: false});
        setProfiles(results);
      };
    } catch(err) {
      console.error(err.stack);
    };
  };

  return(
    <BrowserRouter>
        <Header setWhichFilter={setWhichFilter} skills={skills} username={user.username} fetchProfiles={fetchProfiles} setUser={setUser} setFilter={setHeaderFilter} setIsSettings={setIsSettings} />
        <SettingsModal isSettings={isSettings} setIsSettings={setIsSettings} />
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route index element={<Home profiles={profiles} filter={mainFilter} skills={skills} setFilter={setMainFilter} whichFilter={whichFilter} setWhichFilter={setWhichFilter} />} />
        <Route path='pick-skills' element={<InitialPickSkillsPage skills={skills} username={newUserData.username} setUser={setUser} />} />
        <Route path='pick-matches' element={<InitialPickMatchesPage setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="register" element={<Register setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="sign-in" element={<SignIn setUser={setUser} username={user.username} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;