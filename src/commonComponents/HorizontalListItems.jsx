import { useRef } from "react";
import MapData from "../features/methods/MapData";
import Button from "./Button";

const HorizontalListItems = ({ data, isMatchesModal }) => {
    const listRef = useRef();

    function handleScroll(direction) {
        direction === 'left' ? listRef.current.scrollLeft -= listRef.current.offsetWidth : listRef.current.scrollLeft += listRef.current.offsetWidth;
    };

    return(
        <ul 
            className={`${isMatchesModal && 'w-full'} relative flex justify-between bg-zinc-300 text-nowrap snap-mandatory grow snap-x overflow-x-auto no-scrollbar`}
            ref={listRef}   
        > 
            <Button 
                text='<'
                styles={`sticky left-2.5`}
                handleOnClick={() => handleScroll('left')}
            />
            <MapData 
                data={data} 
                styles={`text-xs p-2.5 min-w-full text-center snap-center lg:text-lg`}
            />
            <Button 
                text='>'
                styles={`sticky right-2.5`}
                handleOnClick={() => handleScroll('right')}
            />
        </ul>
    );
};

export default HorizontalListItems;