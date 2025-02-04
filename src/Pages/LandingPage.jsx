import { useEffect } from 'react';
import broke from '../assets/broke.jpg';

function LandingPage({
    setIsLandingPage,
    isLandingPage,
}) {
    useEffect(() => {
        setIsLandingPage(true);
        localStorage.removeItem('profile picture');
    }, []);
    return(
        <main className='flex flex-col h-full w-screen'>
            <div 
                style={{ 
                    backgroundImage: `url(${broke})`,
                    backgroundSize: 'cover',
                }}
                className={`flex flex-col justify-center min-h-48 px-5 text-white sm:h-full`}>
                {/* About */}
                <div className='hidden sm:block'>
                    <h1 className="text-6xl">Trade your skills</h1>
                    <h1 className="text-6xl">With other people</h1>
                </div>
                <p className='hidden font-bold mt-5 sm:block'>
                    "Empower your growth through skill sharing—no money involved, just expertise."                
                </p>
            </div>
            {/* purpose */}
            <div className='flex flex-col gap-5 p-5'>
                {/* About */}
                <div className='sm:hidden'>
                    <h1 className="text-4xl">Trade your skills</h1>
                    <h1 className="text-4xl">With other people</h1>
                </div>
                <p className='italic font-light sm:hidden'>
                    "Empower your growth through skill sharing—no money involved, just expertise."              
                </p>
                <h3 className='font-bold'>
                    Unlock New Possibilities Through Collaboration
                </h3>
                <p>
                    SkillSwap is a community-driven platform where your unique abilities become valuable assets. By exchanging skills with others, you can learn new talents, expand your network, and grow personally and professionally—all without spending a dime.
                </p>
                <p>
                    Whether you're picking up a new language, honing your design skills, or helping someone learn to code, SkillSwap thrives on mutual exchange. It’s about sharing knowledge, fostering connections, and creating opportunities through collaboration.
                </p>
            </div>
        </main>
    );
};

export default LandingPage;