import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import InitialPickSkillsPage from './Pages/InitialPickSkillsPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';
import InitialPickMatchesPage from './Pages/InitialPickMatchesPage';
import SettingsModal from './Components/SettingsModal/SettingsModal.jsx';
import Main from './Sections/Main.jsx';
import MatchesModal from './Components/MatchesModal/Modal.jsx';

const backendURL = 'localhost:3000';

function App() {
  const [requests, setRequests] = useState({
    sent: [],
    recieved: []
  }); 
  const [whichFilter, setWhichFilter] = useState({
    headerFilter: false,
    mainFilter: false
  });
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
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [headerFilter, setHeaderFilter] = useState({category: '', skill: ''});
  const [skills, setSkills] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);//TODO: add token.
  const [learnProfiles, setLearnProfiles] = useState();
  const [teachProfiles, setTeachProfiles] = useState();
  const [isSettings, setIsSettings] = useState(false);//renderring the settings modal
  const [isDisplayMatch, setIsDisplayMatch] = useState(false);
  const [displayedMatch, setDisplayedMatch] = useState();
  const [matches, setMatches] = useState([]);
  const [param, setParam] = useState(); // remount on accepting a request

  //set user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser?.username) {
      try {
        setUser(savedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    fetchMatches();
  }, [param]);

  //fetch requests and matches on initial render
  useEffect(() => {
    if(user?.username) {
      fetchRequests();
      fetchMatches();
    };
    fetchProfiles();
  }, [user]);

  //fetch all skills
  useEffect(() => {
    fetchSkills();
  }, []);

  //update the ui as requests data changes
  useEffect(() => {
    if(user?.username) {
      fetchProfiles();
    };
  }, [requests]);

  //filter profile result using filters
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
      fetchProfiles();
    };
  }, [user, whichFilter]);

    useEffect(() => {
    if(mainFilter.toTeachCategory || mainFilter.toTeach) {
      filterTeachProfiles();
    };
  }, [mainFilter.toTeachCategory, mainFilter.toTeach]);

  useEffect(() => {
    if(mainFilter.toLearnCategory || mainFilter.toLearn) {
      filterLearnProfiles();
    };
  }, [mainFilter.toLearnCategory, mainFilter.toLearn]);

  //fetch all unfilterred profiles
  async function fetchProfiles() {
    const response = await fetch(`http://${backendURL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username })
    });
    const data = await response.json();
    setLearnProfiles(data.data.learnProfiles);
    setTeachProfiles(data.data.teachProfiles);
  };
  //fetch skills for skill/category selections
  async function fetchSkills() {
    const response = await fetch(`http://localhost:3000/fetch-skills`);
    const data = await response.json();
    setSkills(data.data);
  };
  //fetch profiles that want to learn the skills filtered by the main drop down options
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
 //fetch profiles that want to teach the skills filtered by the main drop down options
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
  //fetch profiles that want to learn and teach the skills selected from the nav bar options
  async function headerFilterProfiles() {
    try {
      const response = await fetch(`http://${backendURL}/fetch-quick-filtered-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(headerFilter)
      });
      const data = await response.json();
      console.log(data);
      setTeachProfiles(data.teachProfiles);
      setLearnProfiles(data.learnProfiles);
    } catch(err) {
      console.error(err.stack);
    };
  };
  //fetch sent match requests
  async function fetchRequests() {
    if(!user.username) {
      console.error('No user found');
      return;
    };
    let sent = [];
    let recieved = [];
    const response = await fetch(`http://localhost:3000/fetch-requests?user=${user?.username}`);
    const data = await response.json();
    if(response.status === 200) {
      data.sentRequests.length > 0 ? sent = data.sentRequests : sent = [];
      data.recievedRequests.length > 0 ? recieved = data.recievedRequests : recieved = []; 
      setRequests({ sent: sent, recieved: recieved });
    }; 
  };
  //fetch accepted matches
  async function fetchMatches(param) {
    const response = await fetch(`http://${backendURL}/matches?user=${user.username}`);
    const data = await response.json();
    if(response.status === 200) {
      const usernames = [];
      for(const obj of data.matches) {
        usernames.push(obj.username);
      };
      setMatches(usernames);
      setParam(param);
      console.log(param);
      console.log(data.matches);
    };
  };

  async function displayProfile(username) {
    setIsDisplayMatch(true);
    const response = await fetch(`http://localhost:3000/profile?user=${username}`);
    const data = await response.json();
    const profileData = data.profileData;
    console.log(profileData);
    setDisplayedMatch(profileData);
    // setIsProfileDisplayed(true);
};

  return(
    <BrowserRouter>
        <Header 
          setWhichFilter={setWhichFilter} 
          skills={skills} 
          username={user?.username} 
          fetchProfiles={fetchProfiles} 
          setUser={setUser} 
          setFilter={setHeaderFilter} 
          setIsSettings={setIsSettings} 
          requests={requests}
          fetchRequests={fetchRequests}//CHANGE BACK TO FETCH REQUESTS
          matches={matches}
          fetchMatches={fetchMatches}
          displayProfile={displayProfile}
        />
        {user && <SettingsModal 
          isSettings={isSettings} 
          setIsSettings={setIsSettings} 
        />}
        <MatchesModal 
          isDisplayMatch={isDisplayMatch}
          setIsDisplayMatch={setIsDisplayMatch}
          displayedMatch={displayedMatch}
          teachProfiles={teachProfiles}
          learnProfiles={learnProfiles}
        />
      <Routes>  
        <Route path='/' element={<Main />} />
        <Route index element={<Main 
                                requests={requests}
                                fetchRequests={fetchRequests}
                                learnProfiles={learnProfiles} 
                                teachProfiles={teachProfiles} 
                                filter={mainFilter} 
                                skills={skills} 
                                setFilter={setMainFilter} 
                                headerFilter={headerFilter} 
                                whichFilter={whichFilter} 
                                setWhichFilter={setWhichFilter} 
                                user={user || ''}
                              />} 
        />
        <Route path='pick-skills' element={<InitialPickSkillsPage 
                                              skills={skills} 
                                              username={newUserData.username} 
                                              setUser={setUser} 
                                            />} 
        />
        <Route path='pick-matches' element={<InitialPickMatchesPage 
                                              setNewUserData={setNewUserData} 
                                              newUserData={newUserData} 
                                            />} 
        />
        <Route path="register" element={<Register 
                                          setNewUserData={setNewUserData} 
                                          newUserData={newUserData} 
                                       />} 
        />
        <Route path="sign-in" element={<SignIn 
                                          setUser={setUser} 
                                          username={user} 
                                        />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;