import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InitialCardsContainer from '../Components/InitialSignUpComponents/InitialCardsContainer';

const backendURL = 'localhost:3000';

function InitialPickMatchesPage({ newUserData, setNewUserData }) {
    const [matches, setMatches] = useState({});

    useEffect(() => {
        fetchUsers();
        console.log(matches);
    }, []);

    async function fetchUsers() {
        const response = await fetch(`http://${backendURL}/fetch-matches`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: newUserData.username })
        });
        const data = await response.json();
        console.log(data);

        setMatches(data);
    };

    function clearRegistrationForm() {
        setNewUserData(prev => {
            const newValues = {};
            Object.keys(prev).forEach((key) => newValues[key] = '');
            return newValues;
        });
    };

    return(
        <div className='p-5'>
            <main className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>Recommended matches</h1>
                <InitialCardsContainer isPickMatches={true} matches={matches} contentHeader={'Complimentary skill matches'} />
                <InitialCardsContainer isPickMatches={true} matches={matches} contentHeader={'Interested skill matches'} />
                <div className='self-end flex w-1/4'>
                    <button className='w-1/2 mr-5 p-2.5 border'>Skip</button>
                    <Link to='/'><button onClick={() => clearRegistrationForm()} className='w-1/2 p-2.5 border'>Submit</button></Link>
                </div>
            </main>
        </div>
    );
}

export default InitialPickMatchesPage;