import { useEffect, useRef } from 'react';

const placeholder =[];
for(let i = 0; i < 10; i++) {
    placeholder.push(`skill ${i + 1}`);
};

function FilterDropDown({ isShown, setIsShown, setFilterValues, filterValueKey }) {
    const node = useRef();

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
            {placeholder.map(el => <p key={el} onClick={() => handleFilterValueClick(el)}>{el}</p>)}
        </div>
    );
};

export default FilterDropDown;