function RequestHander({ handler, icon, item }) {
    return(
        <button 
            onClick={() => handler(item)}
            className={`text-xl text-red-400 hover:font-bold cursor-pointer`}>
            {icon}
        </button>
    );
};

export default RequestHander;