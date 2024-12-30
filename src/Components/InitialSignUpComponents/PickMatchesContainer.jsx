import InitialMatchCard from "./InitialMatchCard";

function PickMatchesContainer({ matches }) {
  const skillCategories = { 
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
    ]
  };
  const communicationArray = [];
  Object.keys(skillCategories).forEach((category, index) => {
    Object.keys(skillCategories)['Communication'].forEach(skill => {
      Object.keys(skillCategories)[category].forEach(item => {
        if(skill === item) {
          communicationArray.push(skill);
        };
      });
    });
  });

    return(
      <div className='flex h-96 p-5 bg-black rounded-md'>
        {matches?.data?.map((item, index) => {   
            return(
              <InitialMatchCard key={index} item={item} index={index} />
            );
        })};
      </div>
    );
};

export default PickMatchesContainer;