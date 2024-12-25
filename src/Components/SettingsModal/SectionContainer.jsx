function SectionContainer({ header, section1, section2 }) {
    return(
        <div>
            <h2 className='text-left text-3xl font-bold'>{header}</h2>
            <div className='w-full min-h-44 flex flex-col lg:flex-row gap-2.5'>
                {section1}
                {section2}
            </div>
        </div>
    );
};

export default SectionContainer;