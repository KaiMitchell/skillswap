import { useState } from "react";
import BottomLeft from "./Left/BottomLeft";
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
    matches
}) {

    //determine whether profile shows private details or not based on matched status
    const isMatched = matches.includes(displayedProfile?.username);
    //display links to platforms if they are set
    const isPlatformLinks = displayedProfile?.socials.length > 0;
    const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
    const imgURL = 'http://localhost:3000/';
    const imgPath = imgURL + displayedProfile?.profile_picture;

    //vist a users social page when clicking on their socials icon
    function goToSocialsPlatform(link) {
        window.location = (`//${link}`);
        console.log(window.location);
    };

    return(
        <div className='flex gap-5 h-full'>
            <div className='w-full min-h-1/4 h-full flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                {/* image */}
                <div className='w-full h-full'>
                    <div className="w-full h-full flex justify-between">
                        <div className="relative text-left">
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
                                <div className='absolute bottom-0'>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;