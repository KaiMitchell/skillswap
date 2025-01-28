function LandingPage() {
    return(
        <main className='flex flex-col gap-10 h-full w-screen'>
            {/* About */}
            <div className='font-bold px-5 py-10 text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 sm:p-5'>
                <div>
                    <h1 className="text-4xl">Trade your skills</h1>
                    <h1 className="text-4xl">With other people</h1>
                </div>
                <p className='font-bold mt-5'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias fugiat, magnam porro voluptates exercitationem dicta aut tenetur.                
                </p>
            </div>
            {/* purpose */}
            <div className='flex flex-col gap-10 p-5'>
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