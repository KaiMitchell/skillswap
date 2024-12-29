import ProfileCard from "../ProfileCard/ProfileCard";

function MainProfileCardsSection({ learnProfiles, teachProfiles, filter, whichFilter }) {
    return(
        <section id='profile-cards' className='h-full w-full flex gap-5'>
            <div className='w-1/2 flex flex-col gap-5'>
                <h3>These profiles want to learn...</h3>
                {learnProfiles?.map((obj) => {
                    let skills;
                    if(whichFilter.headerFilter) {
                        skills = obj.name; //skill name
                    } else if(whichFilter.mainFilter) {
                        skills = obj.skills;
                    } else {
                        skills = obj.to_learn;
                    };
                    return(
                        <ProfileCard key={obj.username} filter={filter} skills={skills} name={obj.username} />
                    );
                })};
            </div>
            <div className='w-1/2 flex flex-col gap-5'>
                <h3>These profiles want to teach...</h3>
                {teachProfiles?.map((obj) => {
                    let skills;
                    if(whichFilter.headerFilter) {
                        skills = obj.name; //skill name
                    } else if(whichFilter.mainFilter) {
                        skills = obj.skills;
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