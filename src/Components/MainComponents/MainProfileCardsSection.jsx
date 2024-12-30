import { useEffect, useState } from 'react';
import ProfileCard from "../ProfileCard/ProfileCard";

function MainProfileCardsSection({ learnProfiles, teachProfiles, filter, whichFilter }) {
    const [filterType, setFilterType] = useState({learn: '', teach: ''});

    useEffect(() => {
        let toLearnFilterHeader;
        let toTeachFilterHeader;

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

    const learnCount = learnProfiles?.length;
    const teachCount = teachProfiles?.length;
    const learnFilterInfo = `${learnCount === 0 ? 'No' : learnCount} profile${learnCount === 1 ? ' wants' : "'s want"} to learn...`;
    const teachFilterInfo = `${teachCount === 0 ? 'No' : teachCount} profile${teachCount === 1 ? ' wants' : "'s want"} to teach...`;

    return(
        <section id='profile-cards' className='relative h-full w-full flex gap-5'>
            <div className='w-1/2 flex flex-col gap-5 pt-5'>
                <h2 className='text-center text-2xl font-bold'>{`Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.learn}`}</h2>
                <h3 className='text-center'>{`${learnFilterInfo}`}</h3>
                {learnProfiles?.map((obj) => {
                    let skills;
                    if(whichFilter.headerFilter) {
                        skills = obj.name; //skill name
                    } else if(whichFilter.mainFilter) {
                        if(obj.skills){
                            skills = obj.skills;
                        } else {
                            skills = obj.to_learn;
                        };
                    } else {
                        skills = obj.to_learn;
                    };
                    return(
                        <ProfileCard key={obj.username} filter={filter} skills={skills} name={obj.username} />
                    );
                })};
            </div>
            <div className='w-1/2 flex flex-col gap-5 pt-5'>
                <h2 className='text-center text-2xl font-bold'>{`Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.teach}`}</h2>
                <h3 className='text-center'>{`${teachFilterInfo}`}</h3>
                {teachProfiles?.map((obj) => {
                    let skills;
                    if(whichFilter.headerFilter) {
                        skills = obj.name; //skill name
                    } else if(whichFilter.mainFilter) {
                        if(obj.skills){
                            skills = obj.skills;
                        } else {
                            skills = obj.to_teach;
                        };
                    } else {
                        skills = obj.to_teach;
                    };
                    return(
                        <ProfileCard key={obj.username} filter={filter} skills={skills} name={obj.username} />
                    );
                })};
            </div>
        </section>
    );
};

export default MainProfileCardsSection;