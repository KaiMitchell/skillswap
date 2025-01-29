import { useState } from "react";
import BottomLeft from "./Left/BottomLeft";
import { Revert } from "../../commonComponents/SVGs";
import Left from "./Left/Left";
import Right from "./Right/Right";
import MapData from "../../features/methods/MapData";
import Button from "../../commonComponents/Button";
import { Facebook, LinkedIn, Twitter } from "../../commonComponents/SVGs";

function Details({
    displayedProfile,
    isHovered,
    setIsHovered,
    unMatch,
    fetchRequests,
    setIsDisplayedProfile,
    displayedProfileType,
    matches,
    isSent,
}) {
    const [isRevertHovered, setIsRevertHovered] = useState(false);

    //determine whether profile shows private details or not based on matched status
    const isMatched = matches.includes(displayedProfile?.username);
    //display links to platforms if they are set
    const isPlatformLinks = displayedProfile?.socials.length > 0;
    const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
    const imgURL = import.meta.env.VITE_AUTH_URL;
    const imgPath = imgURL + '/' + displayedProfile?.profile_picture;

    //vist a users social page when clicking on their socials icon
    function goToSocialsPlatform(link) {    
        window.location = (`//${link}`);
    };

    return(
        <div className='relative flex gap-5 h-full'>
            <Button 
                text={<Revert isHovered={isRevertHovered} />}
                handleOnClick={() => setIsDisplayedProfile(false)}
                handleOnMouseOver={() => setIsRevertHovered(true)}
                handleOnMouseLeave={() => setIsRevertHovered(false)}
                styles={`fixed top-0 right-0 z-20 p-2.5 backdrop-blur-sm bg-black/30 rounded-bl sm:hidden`}
            />
            <div className='w-full min-h-1/4 h-full flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                {/* image */}
                <div className='w-full h-full'>
                    <div className="w-full h-full flex flex-col justify-between items-center sm:items-start sm:flex-row">
                        <div className="relative flex flex-col gap-5 justify-center items-center text-left">
                            <Left 
                                displayedProfile={displayedProfile}
                                img={displayedProfile?.profile_picture ? imgPath : defaultProfileImg}
                                isMatched={isMatched}
                            />
                            <BottomLeft 
                                displayedProfile={displayedProfile} 
                                unMatch={unMatch} 
                                isMatched={isMatched}
                            />
                            {isPlatformLinks && 
                                <div className='absolute top-0 right-full flex flex-col sm:top-auto sm:right-auto sm:flex-row sm:mt-2.5'>
                                    <MapData 
                                        data={displayedProfile?.socials}
                                        render={(obj) => {
                                            const [isHovered, setIsHovered] = useState();
            
                                            let svg;
    
                                            //set appropritate svg icons
                                            if(obj?.platform === 'twitter') {
                                                svg = <Twitter isHovered={isHovered} />
                                            };
    
                                            if(obj?.platform === 'facebook') {
                                                svg = <Facebook isHovered={isHovered} />
                                            };
    
                                            if(obj?.platform === 'linkedin') {
                                                svg = <LinkedIn isHovered={isHovered} />
                                            };
    
                                            return(
                                                <Button 
                                                    key={obj?.platform}
                                                    text={svg}
                                                    handleOnClick={() => goToSocialsPlatform(obj?.url)}
                                                    handleOnMouseOver={() => setIsHovered(true)}
                                                    handleOnMouseLeave={() => setIsHovered(false)}
                                                    isHandleHover={true}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <Right 
                            displayedProfileType={displayedProfileType}
                            setIsDisplayedProfile={setIsDisplayedProfile}
                            displayedProfile={displayedProfile}
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered}
                            isMatched={isMatched}
                            fetchRequests={fetchRequests}
                            isSent={isSent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;