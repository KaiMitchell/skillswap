import Selection from "../Selection";

function Categories({ 
    skills,
    setWhichFilter,
    setFilter
 }) {
    return(
        <>
            {skills?.map((obj, index) => 
                <Selection 
                    setWhichFilter={setWhichFilter} 
                    key={obj.category} 
                    category={obj.category} 
                    text={obj.category} 
                    canHover={true} 
                    isLink={false} 
                    setFilter={setFilter} 
                    showRight={index > 1 ? true : false} 
                    obj={obj}
                />
            )};
        </>
    );
};

export default Categories;