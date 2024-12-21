import { useState, useEffect } from 'react';
import PickSkillList from './pickSkillList';

function PickSkillsContainer({ handleSkillAdd, selectedSkills }) {  
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

    return(
      <div className='flex h-96 p-5 bg-black rounded-md'>
        {Object.keys(skillCategories).map((category, index) => {   
            return(
                // If I use transition I can't open the accordion the the end... find out why. I need transitioning.    
                <article key={index} className={`group rounded-md relative flex justify-center hover:justify-between w-10 hover:w-full items-center p-5 ${index % 2 === 0 ? 'bg-red-700' : 'bg-stone-800'} text-slate-100`}>
                    <div className='hidden group-hover:block w-1/2 text-center'>
                        <h2 className='hidden group-hover:block mb-2.5'>Select a skill</h2>
                        <ul className={`hidden rounded-md group-hover:block h-64 pt-1 group-hover:flex flex-col self-center items-center gap-2.5 ${index % 2 === 0 ? 'bg-red-600' : 'bg-stone-700'} shadow-inner overflow-y-auto no-scrollbar`}>
                            {skillCategories[category].map(skill => {  
                                return(
                                  <div key={skill}>
                                    <PickSkillList skill={skill} index={index} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} />
                                  </div>
                                )
                            })}
                        </ul>
                    </div>
                    <h3 className='text-xl w-fit group-hover:w-1/2 group-hover:text-3xl group-hover:font-bold rotate-90 group-hover:rotate-0 self-center text-center text-nowrap'>{category}</h3>
                </article>
            );
        })}
      </div>
    );
};

export default PickSkillsContainer;