import { useEffect } from 'react';
import Card from '.././Components/Card';
import SearchInputButton from '../Components/SearchInputButton';

function Main() {
    const profilePlaceholder = [
            {
                img: "https://i0.wp.com/www.thewrap.com/wp-content/uploads/2020/12/GettyImages-812168728-1.jpg?fit=618%2C412&ssl=1",
                skill: "Looking after kids"
            },
            {
                img: "https://lumiere-a.akamaihd.net/v1/images/open-uri20150608-27674-1ymefwb_483d5487.jpeg?region=0%2C0%2C1200%2C675",
                skill: "Persuassion"
            },
            {
                img: "https://media.licdn.com/dms/image/v2/D5603AQH_yJ3r89e-Wg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710389760370?e=2147483647&v=beta&t=BQv50Qo1zH5ms9p6dilQUl_jtT2K02qRdF7N7XDGEfM",
                skill: "Communication"
            },
            {
                img: "https://static.wikia.nocookie.net/fiction-wrestling-multiverse/images/f/f8/Arthur_Read.png/revision/latest?cb=20140415100946",
                skill: "Tech skills"
            },
            {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdyHMyq1ljpM_TwUa3oSH1Nyo-FEAtl9M5qg&s",
                skill: "Cooking"
            }
    ];

    return(
        <main className='px-5'>
            <div className='h-full -mx-5 flex flex-col justify-center bg-red-500'>
                <div className='p-5 md:p-10'>
                    <h1 className='text-4xl pb-2.5 font-bold underline'>Skill Swap</h1>
                    <SearchInputButton type="text" />
                </div>
            </div>
            {/* The data for these cards will be collected from a database */}
            <section id='profile-cards' className='h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {profilePlaceholder.map((item, index) => {
                    return(
                        <div key={index}>
                            <Card img={item.img} skill={item.skill} />
                        </div>
                    );
                })}
            </section>
        </main>
    );
};

export default Main;