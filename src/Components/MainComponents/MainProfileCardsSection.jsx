import ProfileCard from "../ProfileCard/ProfileCard";

function MainProfileCardsSection({ profiles }) {
    return(
        <section id='profile-cards' className='h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {profiles?.map((item) => <ProfileCard key={item.username} skills={item.to_learn || item.to_teach} name={item.username} />)}
        </section>
    );
};

export default MainProfileCardsSection;