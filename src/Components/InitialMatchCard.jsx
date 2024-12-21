import { useState, useEffect } from 'react';

function InitialMatchCard({ index, item, placeholder }) {
    const [selectedProfiles, setSelectedProfiles] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    let bgColor;

    if(isSelected) {
        bgColor = 'bg-green-500';
    } else if(index % 2 === 0) {
        bgColor = 'bg-red-700';
    } else {
        bgColor = 'bg-stone-800';
    };

    function matchRequest() {

    };

    return(
            // If I use transition I can't open the accordion the the end... find out why. I need transitioning.    
        <article className={`group h-full rounded-md relative flex justify-center gap-5 hover:justify-between w-10 hover:w-full items-center p-5 ${bgColor} text-slate-100`}>
            <div className='hidden h-full group-hover:w-full group-hover:block group-hover:flex group-hover:flex-col w-1/2 text-center'>
                <h3>To learn</h3>
                {/* to learn */}
                <ul className={`hidden rounded-md group-hover:block w-full h-1/2 pt-1 group-hover:flex flex-col self-center items-center gap-2.5 ${index % 2 === 0 ? 'bg-red-600' : 'bg-stone-700'} shadow-inner overflow-y-auto no-scrollbar`}>
                    {placeholder.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h3 className='mt-2.5'>To teach</h3>
                {/* to teach */}
                <ul className={`hidden rounded-md group-hover:block w-full h-1/2 pt-1 group-hover:flex flex-col self-center items-center gap-2.5 ${index % 2 === 0 ? 'bg-red-600' : 'bg-stone-700'} shadow-inner overflow-y-auto no-scrollbar`}>
                    {placeholder.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </div>
            <h3 className='group-hover:hidden ml-5 text-xl w-fitrotate-90 self-center text-center text-nowrap'>{item}</h3>
            <div className='w-1/2 h-full flex flex-col justify-between gap-5'>
                <img className='w-full size-64' />
                <button className='hidden group-hover:block w-full border'>Match</button>
            </div>
        </article>
    );
};

export default InitialMatchCard;