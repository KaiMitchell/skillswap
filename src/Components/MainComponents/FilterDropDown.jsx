import { useEffect, useRef } from 'react';

function FilterDropDown({ isShown, setIsShown, setFilterValues, filterValueKey, options }) {
    const node = useRef();

    let mappedOptions;

    if(filterValueKey === 'toLearn' || filterValueKey === 'toTeach') {
        mappedOptions = Object.keys(options).map(category => {
            return(
                <h3 className='text-sm' key={category} onClick={() => handleFilterValueClick(category)}>{category}</h3>
            )
        });
    } else {
        mappedOptions = options.map(option => {
            return <p key={option} onClick={() => handleFilterValueClick(option)}>{option}</p>
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => document.removeEventListener('mousedown', handleOutSideClick);
    }, []);

    function handleOutSideClick(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsShown(false);
        };
    };

    function handleFilterValueClick(value) {
        setFilterValues(prev => {
            const newObj = {...prev};
            for(const key in newObj) {
                newObj[filterValueKey] = value;
            };
            return newObj;
        });
    };

    return(
        <div ref={node} className={`${isShown ? 'block' : 'hidden'} absolute w-full left-0 z-10 top-full h-fit bg-stone-900 rounded-lg`}>
            {mappedOptions}
        </div>
    );
};

export default FilterDropDown;