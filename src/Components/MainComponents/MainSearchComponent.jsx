import SearchInputButton from "../SearchInputButton";

function MainSearchSection() {
    return(
        <div className='h-full -mx-5 flex flex-col justify-center bg-red-500'>
            <div className='p-5 md:p-10'>
                <h1 className='text-4xl pb-2.5 font-bold underline'>Skill Swap</h1>
                <SearchInputButton type="text" />
            </div>
        </div>
    );
};

export default MainSearchSection;