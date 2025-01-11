import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import InitialPickSkillsPage from './Pages/InitialPickSkillsPage';
import Register from './Pages/Register';
import SignIn from './Pages/Sign-in';
import InitialPickMatchesPage from './Pages/InitialPickMatchesPage';
import SettingsModal from './Components/SettingsModal/SettingsModal.jsx';
import Main from './Sections/Main.jsx';
import MatchesModal from './Components/MatchesModal/Modal.jsx';

export const TokenContext = createContext();

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
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [learnProfiles, setLearnProfiles] = useState();
  const [teachProfiles, setTeachProfiles] = useState();
  //renderring the settings modal
  const [isSettings, setIsSettings] = useState(false);
  const [isDisplayedProfile, setIsDisplayedProfile] = useState(false);
  const [displayedProfile, setDisplayedProfile] = useState();
  //determine the type of call to display profile (recieved, or sent request or matched)
  const [displayedProfileType, setDisplayedProfileType] = useState('');
  const [matches, setMatches] = useState([]);
  //remount on accepting a request
  const [param, setParam] = useState();
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access token') || '');
  
  //trigger re-render to immediately view new matches when accepting
  useEffect(() => {
    fetchMatches();
  }, [param]);

  //fetch requests and matches on initial render, logout and signin
  useEffect(() => {
    if(user) {
      fetchRequests();
      fetchMatches();
    };
    fetchProfiles();
    console.log(teachProfiles);
    setMainFilter(prev => {
      const newObj = {};
      for(const key in prev) {
        newObj[key] = '';
      };
      return newObj;
    });
  }, [user]);

  useEffect(() => {
    fetchSkills();
  }, []);

  //update the ui as requests data changes
  useEffect(() => {
    if(user) {
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
        body: JSON.stringify({ username: user })
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
      if(!data.profiles) {
        setLearnProfiles();
        console.log(data);
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
    let sent = [];
    let recieved = [];
    const response = await fetch(`http://localhost:4000/fetch-requests?user=${user}`, {
      headers: { 'authorization': `Bearer ${sessionStorage.getItem('access token')}` }
    });
    const data = await response.json();
    if(response.status === 401 || response.status === 403) {
      signOut();
    };
    if(response.status === 200) {
      //prevent populating requests state with an undefined value
      data.sentRequests.length > 0 ? sent = data.sentRequests : sent = [];
      data.recievedRequests.length > 0 ? recieved = data.recievedRequests : recieved = []; 
      setRequests({ sent: sent, recieved: recieved });
    }; 
  };
  //fetch accepted matches
  async function fetchMatches(param) {
    const response = await fetch(`http://${backendURL}/matches?user=${user}`);
    const data = await response.json();
    if(response.status === 200) {
      const usernames = [];
      for(const obj of data.matches) {
        usernames.push(obj.username);
      };
      setMatches(usernames);
      //trigger useEffect to update UI
      setParam(param);
    };
  };

  async function displayProfile(selectedUser, type) {
    //show the profile modal
    setIsDisplayedProfile(true);
    setDisplayedProfileType(type);

    try {
      const response = await fetch(`http://localhost:4000/profile?selectedUser=${selectedUser}`, {
        headers: { 'authorization': `Bearer ${accessToken}` }
      });

      if(response.status === 401 || response.status === 403) {
        signOut();
        setDisplayedProfile();
        return;
      };

      const data = await response.json();
      const profileData = data.profileData;
      setDisplayedProfile(profileData);
    } catch(err) {
      console.error(err);
    };
  };

  async function unMatch(param, selectedUser) {
    console.log('selected user: ', selectedUser);
    console.log('rerender param: ', param);
    const response = await fetch(`http://localhost:4000/unmatch`, {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        'authorization': `Bearer ${sessionStorage.getItem('access token')}` 
      },
      body: JSON.stringify({ 
        selectedUser: selectedUser,
        user: localStorage.getItem('user')
      })
    });
    if(response.status === 404) {
      //check body values
      console.log('selectedUser: ', selectedUser + ', currentUser: ', user);
      return;
    };
    if(response.status === 403 || response.status === 401) {
      signOut();
      return;
    };
    //trigger rerender to update UI
    setParam(param);
    setIsDisplayedProfile(false);
  };

  async function signOut() {
    console.log('signing out');
    await fetch(`http://localhost:4000/signout`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    });
    localStorage.removeItem('user');
    sessionStorage.removeItem('access token');
    setUser();
  };

  //FOR NOW USE MATCHES MODAL TO DISPLAY PROFILE DETAILS IF MATCHED SHOW ALL DETAILS
  //IF NOT ONLY SHOW WHAT IS NOT PRIVATE
  return(
    <TokenContext.Provider value={{ accessToken, setAccessToken }}>
      <BrowserRouter>
          <Header 
            setWhichFilter={setWhichFilter} 
            skills={skills} 
            username={user} 
            fetchProfiles={fetchProfiles} 
            setUser={setUser} 
            setFilter={setHeaderFilter} 
            setIsSettings={setIsSettings} 
            requests={requests}
            fetchRequests={fetchRequests}
            matches={matches}
            fetchMatches={fetchMatches}
            displayProfile={displayProfile}
          />
          {user && <SettingsModal 
            isSettings={isSettings} 
            setIsSettings={setIsSettings} 
          />}
          <MatchesModal 
            isDisplayedProfile={isDisplayedProfile}
            setIsDisplayedProfile={setIsDisplayedProfile}
            displayedProfile={displayedProfile}
            displayedProfileType={displayedProfileType}
            teachProfiles={teachProfiles}
            learnProfiles={learnProfiles}
            matches={matches}
            unMatch={unMatch}
            fetchRequests={fetchRequests}
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
                                            //pass username to check if not null. If it is then redirect to home page.
                                            username={user} 
                                          />}
          />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
};

export default App;