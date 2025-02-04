import { useState } from 'react';
import MappedProfile from './MappedProfile';
import Loading from '../../../commonComponents/Loading.jsx';

function CardPanel({ 
    requests, 
    fetchRequests,
    learnProfiles, 
    teachProfiles, 
    whichFilter,
    isToLearnProfiles,
    isLoading,
    setIsSignInPrompt,
    setIsDisabled,
    isDisabled,
    setRemount,
}) {
    let mappedLearnProfiles =
        <MappedProfile
            isToLearn={true}
            fetchRequests={fetchRequests} 
            requests={requests} 
            profiles={learnProfiles} 
            whichfilter={whichFilter} 
            isToLearnProfiles={isToLearnProfiles}
            setIsSignInPrompt={setIsSignInPrompt}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            setRemount={setRemount}
        />

    let mappedTeachProfiles = 
        <MappedProfile 
            fetchRequests={fetchRequests} 
            requests={requests} 
            profiles={teachProfiles} 
            whichfilter={whichFilter} 
            isToLearnProfiles={isToLearnProfiles}
            setIsSignInPrompt={setIsSignInPrompt}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            setRemount={setRemount}
        />

    return(
        <section id='profile-cards' className='flex flex-col gap-2.5 min-h-screen h-full grow w-full'>
            {isLoading && <Loading feedBack={'Loading'} />}
            <div className='relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-full'>
                {isToLearnProfiles ? mappedLearnProfiles : mappedTeachProfiles}   
            </div>
        </section>
    );
};

export default CardPanel;