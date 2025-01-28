import { useEffect, useState } from 'react';
import MappedProfile from './MappedProfile';
import Button from '../../../commonComponents/Button.jsx';
import Loading from '../../../commonComponents/Loading.jsx';

function CardPanel({ 
    requests, 
    fetchRequests,
    learnProfiles, 
    teachProfiles, 
    filter, 
    user,
    whichFilter,
    headerFilter,
    isToLearnProfiles,
    isLoading,
    setIsSignInPrompt,
    setIsDisabled,
    isDisabled,
    setIsToLearnProfiles,
}) {
    const [filterType, setFilterType] = useState({learn: '', teach: ''});
    const [param, setParam] = useState(false);//Trigger useEffect to re render page with updated requests.

    useEffect(() => {
        if(user) {
            fetchRequests();
        };
    }, [param]);

    useEffect(() => {
        let toLearnFilterHeader;
        let toTeachFilterHeader;

        //label the filter type while filtering profiles
        if(filter.toTeachCategory && !filter.toTeach) {
            toTeachFilterHeader = 'CATEGORY';
        } else if(filter.toTeach) {
            toTeachFilterHeader = 'SKILL';    
        } else {
            toTeachFilterHeader = 'ALL';
        };
        
        if(filter.toLearnCategory && !filter.toLearn) {
            toLearnFilterHeader = 'CATEGORY';
        } else if(filter.toLearn) {
            toLearnFilterHeader = 'SKILL';
        } else {
            toLearnFilterHeader = 'ALL';
        };
        setFilterType({ learn: toLearnFilterHeader, teach: toTeachFilterHeader });
    }, [filter]);

    //Grab a unique value from the request matches click handler and set it as param state
    //to trigger a re render to update the UI
    function reMount(param) {
        setParam(() => param);
    };

    const learnCount = learnProfiles?.length;
    const teachCount = teachProfiles?.length;
    let learnSearchFor = '';
    let teachSearchFor = '';
    
    if(whichFilter.headerFilter) {
        //render in text the current header filter that is applied to the search
        learnSearchFor = headerFilter.skill && headerFilter.skill;
        teachSearchFor = headerFilter.skill && headerFilter.skill;
    } else if(whichFilter.mainFilter) {
        //render in text the skill or categories that are currently filtered in
        learnSearchFor = filter.toLearnCategory ? filter.toLearn :  filter.toLearnCategory;
        teachSearchFor = filter.toTeach ? filter.toTeach :  filter.toTeachCategory;
    };

    //display the cat or skill user is searching for
    let searchingFor = '';

    //ensure string does not render 'undefined profiles want to learn'
    const learnFilterInfo = 
        `
        ${learnCount === 0 ? 'No' : learnCount || 'No'} 
        profile${learnCount === 1 ? ' wants' : "'s want"}
        to `;

    const teachFilterInfo =     
        `
        ${teachCount === 0 ? 'No' : teachCount || 'No'} 
        profile${teachCount === 1 ? ' wants' : "'s want"}
        to `;

    if(isToLearnProfiles) {
        searchingFor = learnSearchFor;
    } else {
        searchingFor = teachSearchFor;
    };

    const learnSearchingByStr = 
        `
        Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.learn}
        `;

    const teachSearchingByStr = 
        `
        Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.teach}
        `;

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
        <section id='profile-cards' className='flex flex-col gap-2.5 h-full w-full'>
            {/* mobile description */}
            <div className='self-center text-3xl font-bold text-center sm:hidden'>
                <h1>Swap Skills</h1>
                <h1>Grow Together</h1>
            </div>
            {/* <h2 className='text-center text-white text-2xl font-bold sm:text-left'>{isToLearnProfiles ? learnSearchingByStr : teachSearchingByStr}</h2> */}
            <div className='relative flex flex-col gap-1 items-center sm:flex-row sm:gap-0'>
                <h3 className='text-center text-white text-xl'>{`${isToLearnProfiles ? learnFilterInfo : teachFilterInfo}`}</h3>
                <div className='flex w-fit mx-2 rounded-l rounded-r bg-white/20'>
                    <Button 
                        text={`learn`}
                        styles={`${isToLearnProfiles && 'font-bold bg-white'} rounded-l px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(true)}
                    />
                    <Button 
                        text={`teach`}
                        styles={`${!isToLearnProfiles && 'font-bold bg-white'} rounded-r px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(false)}
                    />
                </div>
                <h3 className='text-center text-white text-xl'>{searchingFor}</h3>
                <Button 
                    text='What is SkillSwap?'
                    styles={`absolute bottom-1 right-0 px-2.5 py-2 rounded-l text-xs bg-white/50 sm:rounded-none hover:bg-white/60`}
                />
            </div>
            {isLoading && <Loading feedBack={'Loading'} />}
            <div className='relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-full'>
                {isToLearnProfiles ? mappedLearnProfiles : mappedTeachProfiles}   
            </div>
        </section>
    );
};

export default CardPanel;