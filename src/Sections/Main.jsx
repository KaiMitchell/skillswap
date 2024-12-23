import { useEffect, useState } from 'react';
import ProfileCard from '.././Components/ProfileCard';
import SearchInputButton from '../Components/SearchInputButton';

const backendURL = 'localhost:3000';

function Main({ user }) {   
    const [profiles, setProfiles] = useState();

    useEffect(() => {
        fetchProfiles();
    }, [user]);

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

    return(
        <main className='px-5'>
            <div className='h-full -mx-5 flex flex-col justify-center bg-red-500'>
                <div className='p-5 md:p-10'>
                    <h1 className='text-4xl pb-2.5 font-bold underline'>Skill Swap</h1>
                    <SearchInputButton type="text" />
                </div>
            </div>
            {/* The data for these cards will be collected from a database */}
            <section id='profile-cards' className='h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {profiles?.map((item) => {
                    return(
                        <div key={item.username}>
                            <ProfileCard skill={item.to_learn[0]} name={item.username} />
                        </div>
                    );
                })}
            </section>
        </main>
    );
};

export default Main;