import { useEffect, useState } from 'react';
import { ToLearnProfiles, ToTeachProfiles } from './RenderType';
import DisplayCards from './DisplayCards';

function CardPanel({ 
    requests, 
    fetchRequests,
    learnProfiles, 
    teachProfiles, 
    filter, 
    user,
    whichFilter,
    headerFilter
}) {
    const [filterType, setFilterType] = useState({learn: '', teach: ''});
    const [param, setParam] = useState(false);//Trigger useEffect to re render page with updated requests.

    useEffect(() => {
        if(user) {
            console.log('username: ', user);
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
        learnSearchFor = headerFilter.skill && headerFilter.skill;
        teachSearchFor = headerFilter.skill && headerFilter.skill;
    } else if(whichFilter.mainFilter) {
        learnSearchFor = filter.toLearnCategory ? filter.toLearn :  filter.toLearnCategory;
        teachSearchFor = filter.toTeach ? filter.toTeach :  filter.toTeachCategory;
        console.log(filter);
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
    let mappedLearnProfiles = <ToLearnProfiles 
                                fetchRequests={fetchRequests} 
                                requests={requests} 
                                learnprofiles={learnProfiles} 
                                whichfilter={whichFilter} 
                                reMount={reMount}
                              />
    let mappedTeachProfiles = <ToTeachProfiles 
                                fetchRequests={fetchRequests} 
                                requests={requests} 
                                teachprofiles={teachProfiles} 
                                whichfilter={whichFilter} 
                                reMount={reMount}
                              />
    return(
        <section id='profile-cards' className='relative h-full w-full flex gap-5'>
            <DisplayCards 
                filterInfo={learnFilterInfo}
                searchingByStr={learnSearchingByStr}
                mappedProfiles={mappedLearnProfiles}
            />
            <DisplayCards 
                filterInfo={teachFilterInfo}
                searchingByStr={teachSearchingByStr}
                mappedProfiles={mappedTeachProfiles} 
            />
        </section>
    );
};

export default CardPanel;