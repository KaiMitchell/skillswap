function MapData({ 
    data,
    Component,
    render,
    componentProps = {},
    styles,
    isInitialSkillPick
}) {

    return(
        data?.map((el, index) => {
            if(render && !isInitialSkillPick) {
                //use when nested map methods are required
                return render(el, index);
            } else if(Component) {
                //return a component as the maps element
                return(
                    <Component 
                        key={el} 
                        index={index}
                        { ...el }
                        { ...componentProps } 
                    />
                )
            } else {    
                //standard method returning a list element
                return <li key={el} id={index} className={styles}>{el}</li>;
            };
        })
    );
};

export default MapData;