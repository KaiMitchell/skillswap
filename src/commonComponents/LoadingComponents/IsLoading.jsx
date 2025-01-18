import { useState, useEffect } from "react";

function IsLoading({ isLoading }) {
    const [loadingCount, setLoadingCount] = useState('.');

    return(
        <div className="h-fit mx-auto font-bold text-3xl">{`Loading${loadingCount}`}</div>
    )
};

export default IsLoading;