import MainFilterDropDownContainer from "./MainFilterDropDownContainer";

function MainSearchSection() {
    return(
        <div className='h-full -mx-5 flex flex-col bg-red-500'>
            <div className='p-5 md:px-10'>
                <h1 className='text-4xl pb-2.5 font-bold underline'>Skill Swap</h1>
                <MainFilterDropDownContainer />
            </div>
        </div>
    );
};

export default MainSearchSection;