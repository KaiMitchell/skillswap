import { useEffect, useState } from 'react';
import { ToLearnProfiles, ToTeachProfiles } from './MainProfileCardRendering';
import MainProfileCardsContainer from './MainProfileCardsContainer';

function MainProfileCardsSection({ 
    requests, 
    fetchRequests,
    learnProfiles, 
    teachProfiles, 
    filter, 
    whichFilter 
}) {
    const [filterType, setFilterType] = useState({learn: '', teach: ''});
    const [param, setParam] = useState(false);//Trigger useEffect to re render page with updated requests.

    useEffect(() => {
        console.log('re-rendering using para: ', param);
        fetchRequests();
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
    const learnFilterInfo = `${learnCount === 0 ? 'No' : learnCount} profile${learnCount === 1 ? ' wants' : "'s want"} to learn...`;
    const teachFilterInfo = `${teachCount === 0 ? 'No' : teachCount} profile${teachCount === 1 ? ' wants' : "'s want"} to teach...`;
    const learnSearchingByStr = `Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.learn}`;
    const teachSearchingByStr = `Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.teach}`;
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
            <MainProfileCardsContainer 
                filterInfo={learnFilterInfo}
                searchingByStr={learnSearchingByStr}
                mappedProfiles={mappedLearnProfiles}
            />
            <MainProfileCardsContainer 
                filterInfo={teachFilterInfo}
                searchingByStr={teachSearchingByStr}
                mappedProfiles={mappedTeachProfiles} 
            />
        </section>
    );
};

export default MainProfileCardsSection;