import MapData from "../features/methods/MapData";

const HorizontalListItems = ({ data }) => {
    return(
        <ul className='flex w-full bg-zinc-300 text-nowrap snap-mandatory snap-x overflow-x-auto no-scrollbar'>
            <MapData 
                data={data} 
                styles={`p-2.5 min-w-full text-center snap-center`}
            />
        </ul>
    );
};

export default HorizontalListItems;