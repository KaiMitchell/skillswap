const skillCategories = { 
    //1
    Communication: [
      'Active Listening',
      'Verbal Communication',
      'Written Communication',
      'Nonverbal Communication',
      'Public Speaking',
      'Presentation Skills',
      'Negotiation',
      'Conflict Resolution',
      'Interpersonal Skills',
      'Storytelling',
      'Persuasion',
      'Empathy',
      'Constructive Feedback',
      'Clarity and Conciseness',
      'Cross-Cultural Communication',
      'Team Collaboration',
      'Emotional Intelligence',
      'Networking',
      'Adaptability in Communication',
      'Questioning Techniques'
    ],
    //2
    Leadership: [
      'Decision-Making',
      'Strategic Thinking',
      'Team Building',
      'Delegation',
      'Conflict Management',
      'Motivation',
      'Emotional Intelligence',
      'Vision Setting',
      'Problem-Solving',
      'Adaptability',
      'Accountability',
      'Mentoring and Coaching',
      'Time Management',
      'Communication',
      'Influencing',
      'Negotiation',
      'Crisis Management',
      'Planning and Organization',
      'Goal Setting',
      'Change Management'
    ],
    //3 ON NOW!!!
    Technical: [
      'Programming',
      'Data Analysis',
      'Database Management',
      'Cybersecurity',
      'Software Development',
      'Cloud Computing',
      'Machine Learning',
      'Networking',
      'System Administration',
      'Technical Writing',
      'Web Development',
      'Mobile App Development',
      'DevOps',
      'Hardware Maintenance',
      'Game Development'
    ],
    ProblemSolving: [
      'Critical Thinking',
      'Analytical Thinking',
      'Creativity',
      'Research',
      'Troubleshooting',
      'Decision Making',
      'Innovation',
      'Logic',
      'Prioritization',
      'Root Cause Analysis',
      'Brainstorming'
    ],
    Creativity: [
      'Idea Generation',
      'Innovation',
      'Artistic Design',
      'Writing',
      'Storytelling',
      'Graphic Design',
      'Video Production',
      'Problem Solving',
      'Imagination',
      'Adaptability',
      'Collaboration in Creative Processes'
    ],
    Interpersonal: [
      'Empathy',
      'Active Listening',
      'Conflict Resolution',
      'Team Collaboration',
      'Building Trust',
      'Networking',
      'Persuasion',
      'Patience',
      'Adaptability',
      'Cultural Sensitivity',
      'Emotional Intelligence'
    ],
    Organizational: [
      'Time Management',
      'Project Management',
      'Prioritization',
      'Scheduling',
      'Goal Setting',
      'Task Delegation',
      'Resource Management',
      'Efficiency Optimization',
      'Detail Orientation',
      'Strategic Planning'
    ],
    Analytical: [
      'Data Analysis',
      'Research Skills',
      'Critical Thinking',
      'Problem Solving',
      'Forecasting',
      'Statistical Analysis',
      'Attention to Detail',
      'Logical Reasoning',
      'Pattern Recognition',
      'Quantitative Analysis'
    ],
    Adaptability: [
      'Flexibility',
      'Resilience',
      'Learning Agility',
      'Open-Mindedness',
      'Problem Solving Under Pressure',
      'Handling Ambiguity',
      'Quick Thinking',
      'Dealing with Change',
      'Crisis Management',
      'Emotional Control'
    ],
    CustomerService: [
      'Active Listening',
      'Empathy',
      'Patience',
      'Problem Solving',
      'Conflict Resolution',
      'Effective Communication',
      'Product Knowledge',
      'Time Management',
      'Adaptability',
      'Positive Attitude'
    ],
    Financial: [
      'Budgeting',
      'Accounting',
      'Financial Analysis',
      'Forecasting',
      'Investment Management',
      'Risk Management',
      'Tax Preparation',
      'Expense Tracking',
      'Cost Control',
      'Auditing'
    ],
    TeachingTraining: [
      'Lesson Planning',
      'Public Speaking',
      'Active Listening',
      'Empathy',
      'Adaptability',
      'Coaching',
      'Mentoring',
      'Communication',
      'Feedback Delivery',
      'Conflict Resolution'
    ],
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

  const allSkills = [];
  const uniqueSkills = [];
  let insertQuery = '';

  function buildInsertQuery(obj) {
    for (const category of Object.keys(obj)) {
        let skillsString = '';
        skillCategories[category].forEach((skill, index) => skillsString += `'${skill}'${index === skillCategories[category].length - 1 ? '' : ','}
        `);
        insertQuery = 
        `
        INSERT INTO categories_skills(category_id, skill_id)
        SELECT c.id AS category_id, s.id AS skill_id
        FROM categories c CROSS JOIN skills s
        WHERE c.category = '${category}'
        AND s.name IN (${skillsString});
        `;

        console.log(insertQuery);
    };
  };

//   function sortSkills(obj) {
//     const sortedSkills = {};
    
//     for (const [category, skills] of Object.entries(obj)) {
//       // Sort the skills alphabetically for better readability
//       sortedSkills[category] = skills.sort((a, b) => a.localeCompare(b));
//     };

//     Object.keys(sortedSkills).forEach(key => {
//       sortedSkills[key].forEach(val => allSkills.push(val));
//     });

//     allSkills.sort((a, b) => a.localeCompare(b));

//     allSkills.map(skill => {
//       if(!uniqueSkills.includes(skill) || uniqueSkills.length === 0) {
//         uniqueSkills.push(skill);
//       };
//     });
    
//     return uniqueSkills;
//   };
  
  // console.log(sortSkills(skillCategories));  
  buildInsertQuery(skillCategories);
//   console.log(sortSkills(skillCategories).forEach(skill => console.log(skill)));