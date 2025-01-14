function StandardSVG({dAttribute, size, strokeWidth}) {
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={strokeWidth || 1.5} 
            stroke="currentColor" 
            className={size || 'size-6'}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d={dAttribute} 
            />
        </svg>
    );
};

export default StandardSVG;