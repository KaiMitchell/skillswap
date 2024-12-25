import ProfileCard from "../ProfileCard/ProfileCard";

function MainProfileCardsSection({ profiles }) {
    return(
        <section id='profile-cards' className='h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {profiles?.map((item) => <ProfileCard key={item.username} skill={item.to_learn ? item.to_learn[0] : item.to_teach[0]} name={item.username} />)}
        </section>
    );
};

export default MainProfileCardsSection;