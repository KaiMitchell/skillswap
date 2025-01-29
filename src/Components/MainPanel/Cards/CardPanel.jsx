import { useEffect, useState } from 'react';
import MappedProfile from './MappedProfile';
import Button from '../../../commonComponents/Button.jsx';
import Loading from '../../../commonComponents/Loading.jsx';

function CardPanel({ 
    requests, 
    fetchRequests,
    learnProfiles, 
    teachProfiles, 
    user,
    whichFilter,
    isToLearnProfiles,
    isLoading,
    setIsSignInPrompt,
    setIsDisabled,
    isDisabled,
    reMount,
    param,
}) {

    useEffect(() => {
        if(user) {
            fetchRequests();
        };
    }, [param]);

    let mappedLearnProfiles =
        <MappedProfile
            isToLearn={true}
            fetchRequests={fetchRequests} 
            requests={requests} 
            profiles={learnProfiles} 
            whichfilter={whichFilter} 
            reMount={reMount}
            isToLearnProfiles={isToLearnProfiles}
            setIsSignInPrompt={setIsSignInPrompt}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
        />

    let mappedTeachProfiles = 
        <MappedProfile 
            fetchRequests={fetchRequests} 
            requests={requests} 
            profiles={teachProfiles} 
            whichfilter={whichFilter} 
            reMount={reMount}
            isToLearnProfiles={isToLearnProfiles}
            setIsSignInPrompt={setIsSignInPrompt}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
        />

    return(
        <section id='profile-cards' className='flex flex-col gap-2.5 pt-2.5 min-h-screen grow w-full bg-stone-100'>
            {isLoading && <Loading feedBack={'Loading'} />}
            <div className='relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-full'>
                {isToLearnProfiles ? mappedLearnProfiles : mappedTeachProfiles}   
            </div>
        </section>
    );
};

export default CardPanel;