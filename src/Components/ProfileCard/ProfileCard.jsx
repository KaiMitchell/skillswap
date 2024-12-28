import ProfileCardFooter from "./ProfileCardFooter";
import ProfileCardMain from "./ProfileCardMain";

function ProfileCard({ img, skills, name }) {
    return(
        <article className='flex flex-col bg-black items-center my-10 shadow-xl bg-white'>
            {/* <div className='relative bg-contain h-64 w-full bg-center' style={{backgroundImage: `url(${img})`}}> */}
            <ProfileCardMain name={name} skills={skills} />
            <ProfileCardFooter city='city' availability='availability' />
        </article>
    );
};

export default ProfileCard;