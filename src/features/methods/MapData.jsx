function MapData({ 
    data,
    Component,
    render,
    componentProps = {},
    styles,
}) {

    return(
        data?.map((el, index) => {
            if(render) {
                return render(el, index);
            } else if(Component) {
                return <Component key={el} {...componentProps} />;
            } else {
                return <li key={el} className={styles}>{el}</li>;
            };
        })
    );
};

export default MapData;