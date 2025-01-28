import { useEffect } from 'react';
import bricks from '../assets/bricks.jpg';

function LandingPage({
    setIsLandingPage,
    isLandingPage,
}) {
    useEffect(() => {
        setIsLandingPage(true);
    });
    return(
        <main className='flex flex-col h-full w-screen'>
            <div 
                style={{ backgroundImage: `url(${bricks})`}}
                className={`flex flex-col justify-center min-h-48 px-5 text-white sm:h-full`}>
                {/* About */}
                <div className='hidden sm:block'>
                    <h1 className="text-6xl">Trade your skills</h1>
                    <h1 className="text-6xl">With other people</h1>
                </div>
                <p className='hidden font-bold mt-5 sm:block'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias fugiat, magnam porro voluptates exercitationem dicta aut tenetur.                
                </p>
            </div>
            {/* purpose */}
            <div className='flex flex-col gap-5 p-5'>
                {/* About */}
                <div className='sm:hidden'>
                    <h1 className="text-4xl">Trade your skills</h1>
                    <h1 className="text-4xl">With other people</h1>
                </div>
                <p className='font-bold mt-5 sm:hidden'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias fugiat, magnam porro voluptates exercitationem dicta aut tenetur.                
                </p>
                <h3 className='font-bold'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, perspiciatis. Dicta aut fuga inventore! Architecto!
                </h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, odio. Qui facere et harum, praesentium est eum ut nisi quis quam. Amet, quia ex! Cum sint laboriosam nisi vero dolorem.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit eaque ratione nam temporibus aliquam minima nihil assumenda sunt corrupti, ea quis! Sed delectus quia quas quis mollitia voluptate expedita explicabo laudantium quasi perspiciatis, nesciunt suscipit facilis fuga quaerat placeat dolorum tenetur hic numquam repellat quod! Magni tenetur illum minima nemo?
                </p>
            </div>
        </main>
    );
};

export default LandingPage;