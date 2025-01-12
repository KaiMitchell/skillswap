import Button from "../../../commonComponents/Button";
import MapData from "../../../features/methods/MapData";

//main filter options for skillls
function SkillFilterDropDown({ 
    options, 
    handleFilterValueClick, 
    dropDownTitle 
}) {
    return(
        <div>
            <MapData
                data={options}
                render={(obj, index) => {
                    if(obj.category === dropDownTitle) {
                        return(
                            <div key={index}>
                                <MapData 
                                    data={obj.skills}
                                    render={(skill, index) => (         
                                        <Button 
                                            key={index}
                                            handleOnClick={() => handleFilterValueClick(skill)}
                                            styles={`w-full p-2.5 text-sm hover:bg-zinc-100 hover:font-bold`}
                                            text={skill}
                                        />
                                    )}
                                />
                            </div>
                        );
                    };
                }}
            />
        </div>
    );
};

//main filter options for categories
function CategoryFilterDropDown({ 
    options, 
    handleFilterValueClick, 
}) {
    return(
        <MapData 
            data={options}
            render={(obj, index) => (                  
                <Button 
                    key={index}
                    handleOnClick={() => handleFilterValueClick(obj.category, true)}
                    styles={`w-full p-2.5 text-sm hover:bg-zinc-100 hover:font-bold`}
                    text={obj.category}
                />
            )}
        />
    );
};

//main filter opitons for miscellaneous
function ExtraFilterDropDowns({ 
    options, 
    handleFilterValueClick, 
}) {
    return(
        <div>
            <MapData 
                data={options}
                render={(option, index) => (
                    <Button 
                        key={option}
                        handleOnClick={() => handleFilterValueClick(option)}
                        styles={`w-full p-2.5 text-sm hover:bg-zinc-100 hover:font-bold`}
                        text={option}
                    />
                )}
            />
        </div>
    );
    
};

export {
    SkillFilterDropDown,
    CategoryFilterDropDown,
    ExtraFilterDropDowns
};