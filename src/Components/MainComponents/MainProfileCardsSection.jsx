import ProfileCard from "../ProfileCard/ProfileCard";

function MainProfileCardsSection({ profiles, isFiltered }) {
    return(
        <section id='profile-cards' className='h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {profiles?.map((obj) => {
                let skills;
                if(isFiltered) {
                    skills = obj.name; //skill name
                } else {
                    skills = obj.to_learn || obj.to_teach;
                };
                return(
                    <ProfileCard key={obj.username} skills={skills} name={obj.username} />
                );
            })};
        </section>
    );
};

export default MainProfileCardsSection;