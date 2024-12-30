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
  const [learnProfiles, setLearnProfiles] = useState();
  const [teachProfiles, setTeachProfiles] = useState();
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {console.log(mainFilter)}, [mainFilter]);

  useEffect(() => {fetchSkills()}, []);

  useEffect(() => {
    if(whichFilter.headerFilter) {
      setMainFilter(prev => {
        const newValue = {...prev};
        for(const key in newValue) {
          newValue[key] = ''
        };
        return newValue; 
      });
      headerFilterProfiles();
    } else if(!whichFilter.mainFilter) {
      console.log('re-render');
      fetchProfiles();
    };
  }, [user, whichFilter]);

    useEffect(() => {
    if(mainFilter.toTeachCategory || mainFilter.toTeach) {
      console.log('teaching!');
      filterTeachProfiles();
    };
  }, [mainFilter.toTeachCategory, mainFilter.toTeach]);

  useEffect(() => {
    if(mainFilter.toLearnCategory || mainFilter.toLearn) {
      console.log('learning');
      filterLearnProfiles();
    };
  }, [mainFilter.toLearnCategory, mainFilter.toLearn]);

  async function fetchProfiles() {
    const response = await fetch(`http://${backendURL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username })
    });
    const data = await response.json();
    setLearnProfiles(data.data.learnProfiles);
    setTeachProfiles(data.data.teachProfiles);
  };

  async function fetchSkills() {
    const response = await fetch(`http://localhost:3000/fetch-skills`);
    const data = await response.json();
    setSkills(data.data);
  };

  async function filterLearnProfiles() {
    const body = { ...mainFilter };
    try{
      const response = await fetch(`http://${backendURL}/fetch-filtered-learn-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if(data.noData) {
        console.log('no data');
        return;
      };
      setLearnProfiles(data.profiles);
    }catch(err) {
      console.error(err);
    };
  };

  async function filterTeachProfiles() {
    setTeachProfiles();
    const body = { ...mainFilter, mainFilter: true };
    try{
      const response = await fetch(`http://${backendURL}/fetch-filtered-teach-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if(data.noData) {
        console.log('no data');
        return;
      };
      setTeachProfiles(data.profiles);
    }catch(err) {
      console.error(err);
    };
  };

  async function headerFilterProfiles() {
    const body = { ...mainFilter, mainFilter: true };
    try {
      const response = await fetch(`http://${backendURL}/fetch-filtered-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      setTeachProfiles(data.teachProfiles);
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
        <Route index element={<Home learnProfiles={learnProfiles} teachProfiles={teachProfiles} filter={mainFilter} skills={skills} setFilter={setMainFilter} whichFilter={whichFilter} setWhichFilter={setWhichFilter} />} />
        <Route path='pick-skills' element={<InitialPickSkillsPage skills={skills} username={newUserData.username} setUser={setUser} />} />
        <Route path='pick-matches' element={<InitialPickMatchesPage setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="register" element={<Register setNewUserData={setNewUserData} newUserData={newUserData} />} />
        <Route path="sign-in" element={<SignIn setUser={setUser} username={user.username} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;