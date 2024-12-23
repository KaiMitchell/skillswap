function HeaderDropDown({ isShown, category, showRight }) {
    const headerCategories = {
        CreativeArts: [
            'Painting',
            'Drawing',
            'Photography',
            'Creative Writing',
            'Graphic Design',
            'Crafting',
            'Sculpting',
            'Digital Art',
            'Illustration',
            'Animation',
            'Calligraphy',
            'Fashion Design',
            'Interior Design',
            'Storyboarding',
            'Art Appreciation'
        ],
        Music: [
            'Guitar Playing',
            'Piano Playing',
            'Drumming',
            'Singing',
            'Music Composition',
            'Music Production',
            'DJing',
            'Violin Playing',
            'Music Theory',
            'Songwriting',
            'Sound Engineering',
            'Choir Singing',
            'Orchestration',
            'Audio Mixing',
            'Instrument Maintenance'
        ],
        LanguageLearning: [
            'Spanish',
            'French',
            'Mandarin',
            'English as a Second Language',
            'Accent Training',
            'Sign Language',
            'German',
            'Japanese',
            'Italian',
            'Arabic',
            'Pronunciation Improvement',
            'Grammar Mastery',
            'Vocabulary Building',
            'Language Immersion Techniques',
            'Cultural Exchange'
        ],
        FitnessAndWellness: [
            'Yoga',
            'Meditation',
            'Strength Training',
            'Cardio Workouts',
            'Pilates',
            'Martial Arts',
            'Nutrition Planning',
            'Running Techniques',
            'Flexibility Training',
            'Stress Management',
            'Zumba',
            'Breathing Techniques',
            'Bodyweight Exercises',
            'Posture Improvement',
            'Sleep Optimization'
        ],
        TechnologyAndCoding: [
            'Python Programming',
            'Web Development',
            'Mobile App Development',
            'Data Science',
            'Machine Learning',
            'Cybersecurity',
            'Game Development',
            'DevOps',
            'Blockchain',
            'Cloud Computing',
            'HTML/CSS',
            'JavaScript',
            'Database Management',
            'Linux Administration',
            'Version Control with Git'
        ],
        HomeImprovementAndDIY: [
            'Carpentry',
            'Plumbing Basics',
            'Gardening',
            'Interior Design',
            'Electrical Repairs',
            'Painting Walls',
            'Home Organization',
            'Furniture Restoration',
            'Landscaping',
            'Masonry',
            'Tile Installation',
            'Roof Maintenance',
            'Sewing and Upholstery',
            'Tool Usage',
            'Energy Efficiency Improvements'
        ],
        CulinarySkills: [
            'Cooking',
            'Baking',
            'Food Plating',
            'Mixology',
            'Knife Skills',
            'Grilling',
            'Pastry Making',
            'Vegetarian Cooking',
            'Meal Prepping',
            'Dessert Decoration',
            'Sauce Making',
            'Bread Making',
            'Cultural Cuisine',
            'Wine Pairing',
            'Fermentation Techniques'
        ],
        ProfessionalDevelopment: [
            'Public Speaking',
            'Leadership',
            'Resume Writing',
            'Time Management',
            'Networking',
            'Financial Literacy',
            'Critical Thinking',
            'Problem-Solving',
            'Negotiation Skills',
            'Presentation Skills',
            'Career Planning',
            'Business Writing',
            'Interview Preparation',
            'Project Management',
            'Team Collaboration'
        ]
    };
    
    return(
        <div id='dropDown' className={`${isShown ? 'block' : 'hidden'} absolute top-full ${showRight ? 'right-0' : 'left-0'} w-max h-fit py-5 grid grid-cols-2 gap-x-5 bg-stone-950 px-50 shadow-xl`}>
            {headerCategories[category].map((skill, index) => {
                return(
                    <p key={index} className='p-5 text-stone-500 hover:text-stone-400 hover:bg-stone-700 text-xs text-nowrap hover:cursor-pointer'>{skill}</p>
                );
            })}
        </div>
    );
};

export default HeaderDropDown;