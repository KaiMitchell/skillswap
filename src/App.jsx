import { useState, useEffect } from 'react';
import Header from './Sections/Header';
import Main from './Sections/Main';
import SignUp from '../Pages/Sign-up';

function App() {
  const [message, setMessage] = useState();

  async function makeApiCall() {
    const data = await fetch('http://localhost:3000');
    setMessage(await data.json());
  }

  return (
    <div className='bg-slate-100'>
      <Header />
      <Main />
    </div>
  )
}

export default App;