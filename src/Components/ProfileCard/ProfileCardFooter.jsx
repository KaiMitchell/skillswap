

function ProfileCardFooter({ city, availability }) {
    return(
        <footer id="card-footer" className="flex justify-between w-1/2 mt-5">
            <p>{city}</p>
            <p>{availability}</p>
        </footer>
    );
};

export default ProfileCardFooter;