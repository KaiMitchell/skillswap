

function ProfileDropDownSidePopOut({ isPopOut }) {
    return(
        <div className={`${isPopOut ? 'block' : 'hidden'} absolute -left-full w-full top-0 min-h-full size-10 bg-blue-500`}>
            <div></div>
        </div>
    );
};

export default ProfileDropDownSidePopOut;