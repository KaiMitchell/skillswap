function Loading({ feedBack }) {
    return(
        <h3 className={`sticky z-20 top-1/2 left-1/2 transorm -translate-y-1/2 -translate-x-1/2 w-fit py-5 px-10 backdrop-blur-sm bg-black/30`}>{feedBack}</h3>
    )
};

export default Loading;