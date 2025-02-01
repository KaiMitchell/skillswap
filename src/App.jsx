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
import SignInPrompt from './commonComponents/SignInPrompt.jsx';
import LandingPage from './Pages/LandingPage.jsx';

const apiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

const accessToken = sessionStorage.getItem('access token');

function App() {
  const [headerFilter, setHeaderFilter] = useState({category: '', skill: ''});
  const [skills, setSkills] = useState();
  const [learnProfiles, setLearnProfiles] = useState([]);
  const [teachProfiles, setTeachProfiles] = useState([]);
  //renderring the settings modal
  const [isSettings, setIsSettings] = useState(false);
  const [isDisplayedProfile, setIsDisplayedProfile] = useState(false);
  const [displayedProfile, setDisplayedProfile] = useState();
  //determine the type of call to display profile (recieved, or sent request or matched)
  const [displayedProfileType, setDisplayedProfileType] = useState('');
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignInPrompt, setIsSignInPrompt] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  // const [remount, setRemount] = useState(0);
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
      // yourGender: '',
      // preferredGender: '',
      // meetUp: '',
    }
  );
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  //only execute this code if a user is signed in.
  //fetch requests and matches on initial render, logout and signin
  useEffect(() => {
    fetchSkills();
    if(user) {
      setIsLoading(true);
      fetchRequests();
      fetchMatches();
      //Only set is Loading on initial render
      setMainFilter(prev => {
        const newObj = {};
        for(const key in prev) {
          newObj[key] = '';
        };
        return newObj;
      });
    };
  }, []);

  //update the ui as requests data changes
  useEffect(() => {
    if(user) {
      if(whichFilter.headerFilter) {
        //clear main sec filters to prevent conflicts
        setMainFilter(prev => {
          const newValue = {...prev};
          for(const key in newValue) {
            newValue[key] = ''
          };
          return newValue; 
        });
        headerFilterProfiles();
        //only render profiles if main filter is not applied
        fetchProfiles();
      } else if(whichFilter.mainFilter) {
        //only render profiles if main filter is applied
        fetchProfiles();
      };
      if(!whichFilter.mainFilter && !whichFilter.headerFilter) {
        fetchProfiles();
      };
    };
  }, [requests, whichFilter]);

  //apply appropriate filter types to search results
  useEffect(() => {
    if(user) {
      //apply filters like 'gender', 'gender preference', or 'meet up preference'
      // if(mainFilter.preferredGender || mainFilter.yourGender || mainFilter.meetUp) {
      //   filterLearnProfiles();
      //   filterTeachProfiles();
      // };
  
      //apply filters to return profiles that teach skills that pass a filter
      if(mainFilter.toTeachCategory || mainFilter.toTeach) {
        filterTeachProfiles();
      };
  
      //apply filters to return profiles that teach skills that pass a filter
      if(mainFilter.toLearnCategory || mainFilter.toLearn) {
        filterLearnProfiles();
      };
    };
  }, [mainFilter]);

  // fetch all unfilterred profiles
  async function fetchProfiles() {
    const response = await fetch(`${apiUrl}/api?username=${user}`);
    const data = await response.json();
    setLearnProfiles(data.data.learnProfiles);
    setTeachProfiles(data.data.teachProfiles);
    setIsLoading(false);
  };
  
  //fetch skills for skill/category selections
  async function fetchSkills() {
    const response = await fetch(`${apiUrl}/api/fetch-skills`);
    const data = await response.json();
    setSkills(data.data);
  };

  //fetch profiles that want to learn the skills filtered by the main drop down options
  async function filterLearnProfiles() {
    const queryValues = {};

    //only apply properties from main filter to the query
    //value object if the value is not null
    for(const prop in mainFilter) {
        //if the current prop is not null then populate the query values object
        if (mainFilter[prop]) {
          if(prop === 'yourGender' || prop === 'preferredGender' || prop === 'meetUp') {
            queryValues[prop] = mainFilter[prop].toLowerCase();
          } else {
            queryValues[prop] = mainFilter[prop];
          };
        }; 
    };

    //generate query parameters
    const searchParams = new URLSearchParams(queryValues);

    try{
      const response = await fetch(`${apiUrl}/api/main-filter-learn-profiles?${searchParams}`);
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

    const queryValues = {};

    for(const prop in mainFilter) {

        if (mainFilter[prop]) {

          if(prop === 'yourGender' || prop === 'preferredGender' || prop === 'meetUp') {
            queryValues[prop] = mainFilter[prop].toLowerCase();
          } else {
            queryValues[prop] = mainFilter[prop];
          };
        };  
    };

    const searchParams = new URLSearchParams(queryValues);

    try{
      const response = await fetch(`${apiUrl}/api/main-filter-teach-profiles?${searchParams}`);
      const data = await response.json();

      if(!data.profiles) {
        setTeachProfiles();
        console.log(data);
        return;
      };
      
      console.log('teach data: ', data.profiles);

      setTeachProfiles(data.profiles);  
    }catch(err) {
      console.error(err);
    };
  };

  //fetch profiles that want to learn and teach the skills selected from the nav bar options
  async function headerFilterProfiles() {
    try {
      const response = await fetch(`${apiUrl}/api/fetch-quick-filtered-profiles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(headerFilter)
      });
      const data = await response.json();
      setTeachProfiles(data.teachProfiles);
      setLearnProfiles(data.learnProfiles);
    } catch(err) {
      console.error(err.stack);
    };
  };

  //fetch sent match requests   
  async function fetchRequests() {
    console.log('being called');
    setIsLoading(true);
    let sent = [];
    let recieved = [];
    const response = await fetch(`${authUrl}/api/fetch-requests?user=${user}`, {
      headers: { 'authorization': `Bearer ${sessionStorage.getItem('access token')}` }
    });
    const data = await response.json();
    if(response.status === 401 || response.status === 403) {
      setIsLoading(false);
      signOut();
    };
    if(response.status === 200) {
      //prevent populating requests state with an undefined value
      data.sentRequests.length > 0 ? sent = data.sentRequests : sent = [];
      data.recievedRequests.length > 0 ? recieved = data.recievedRequests : recieved = []; 
      setRequests(prev => ({ sent: sent || prev.sent, recieved: recieved || prev.recieved }));
    }; 
  };

  //fetch accepted matches
  async function fetchMatches() {
    const response = await fetch(`${apiUrl}/api/matches?user=${user}`);
    const data = await response.json();
    if(response.status === 200) {
      const usernames = [];
      for(const obj of data.matches) {
        usernames.push(obj.username);
      };
      setMatches(usernames);
    };
  };

  async function displayProfile(selectedUser, type, isSent) {
    //show the profile modal
    setIsDisplayedProfile(true);
    setIsSent(isSent);
    setDisplayedProfileType(type);

    try {
      const response = await fetch(`${authUrl}/api/profile?selectedUser=${selectedUser}`, {
        headers: { 'authorization': `Bearer ${accessToken}` }
      });

      if(response.status === 401 || response.status === 403) {
        signOut();
        setDisplayedProfile();
        return;
      };

      const data = await response.json();
      const profileData = data.profileData;
      console.log(profileData);
      setDisplayedProfile(profileData);
    } catch(err) {
      console.error(err);
    };
  };

  async function unMatch(param, selectedUser) {
    const response = await fetch(`${authUrl}/api/unmatch`, {
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
      //check response body values
      console.log('selectedUser: ', selectedUser + ', currentUser: ', user);
      return;
    };
    if(response.status === 403 || response.status === 401) {
      signOut();
      return;
    };
    setIsDisplayedProfile(false);
  };

  async function signOut() {
    console.log('signing out');

    await fetch(`${authUrl}/api/signout`, {
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
    <BrowserRouter>
        {isSignInPrompt && <SignInPrompt setIsSignInPrompt={setIsSignInPrompt} />}
        <Header 
          setWhichFilter={setWhichFilter} 
          skills={skills} 
          username={user} 
          fetchProfiles={fetchProfiles}             
          setFilter={setHeaderFilter} 
          setIsSettings={setIsSettings} 
          requests={requests}
          fetchRequests={fetchRequests}
          matches={matches}
          fetchMatches={fetchMatches}
          displayProfile={displayProfile}
          isLandingPage={isLandingPage}
          setUser={setUser}
        />
        {user && isSettings && <SettingsModal 
          isSettings={isSettings} 
          setIsSettings={setIsSettings} 
        />}
        <MatchesModal 
          isDisplayedProfile={isDisplayedProfile}
          setIsDisplayedProfile={setIsDisplayedProfile}
          displayedProfile={displayedProfile}
          displayedProfileType={displayedProfileType}
          matches={matches}
          unMatch={unMatch}
          fetchRequests={fetchRequests}
          isSent={isSent}
        />
      <Routes>  
        <Route path='/' element={<Main />} />
        <Route index element={user ? 
            <Main 
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
              isLoading={isLoading}
              setIsSignInPrompt={setIsSignInPrompt}
            />
          :
            <LandingPage 
              setIsLandingPage={setIsLandingPage}
              isLandingPage={isLandingPage}
            />
          }
        />
        <Route path='pick-skills' element={
          <InitialPickSkillsPage 
            skills={skills} 
            username={newUserData.username}               
          />
        } 
        />
        <Route path='pick-matches' element={
          <InitialPickMatchesPage 
                setNewUserData={setNewUserData} 
                newUserData={newUserData} 
          />
        } 
        />
        <Route path="register" element={
          <Register               
            setNewUserData={setNewUserData} 
            newUserData={newUserData} 
            setIsLandingPage={setIsLandingPage}
          />
        } 
        />
        <Route path="sign-in" element={
          <SignIn               
            setIsLandingPage={setIsLandingPage}
            setUser={setUser}
          />
        }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;