import { useEffect, useState } from 'react';
import MappedProfile from './MappedProfile';
import IsLoading from '../../../commonComponents/LoadingComponents/IsLoading.jsx';

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

    //ensure string does not render 'undefined profiles want to learn'
    const learnFilterInfo = 
        `
        ${learnCount === 0 ? 'No' : learnCount || 'No'} 
        profile${learnCount === 1 ? ' wants' : "'s want"} 
        to learn... ${learnSearchFor || ''}
        `;

    const teachFilterInfo =     
        `
        ${teachCount === 0 ? 'No' : teachCount || 'No'} 
        profile${teachCount === 1 ? ' wants' : "'s want"} 
        to teach... ${teachSearchFor || ''}
        `;

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
        />

    let mappedTeachProfiles = 
        <MappedProfile 
            fetchRequests={fetchRequests} 
            requests={requests} 
            profiles={teachProfiles} 
            whichfilter={whichFilter} 
            reMount={reMount}
            isToLearnProfiles={isToLearnProfiles}
        />

    return(
        <section id='profile-cards' className='flex flex-col gap-2.5 h-full w-full'>
            <h2 className='text-center text-white text-2xl font-bold'>{isToLearnProfiles ? learnSearchingByStr : teachSearchingByStr}</h2>
            <h3 className='text-center text-white'>{`${isToLearnProfiles ? learnFilterInfo : teachFilterInfo}`}</h3>
            {isLoading && <IsLoading isLoading={isLoading} />}
            <div className='relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 h-full max-w-full'>
                {isToLearnProfiles ? mappedLearnProfiles : mappedTeachProfiles}   
            </div>
        </section>
    );
};

export default CardPanel;