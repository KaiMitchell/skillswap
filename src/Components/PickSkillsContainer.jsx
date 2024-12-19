import { useState, useEffect } from 'react';

function PickSkillsContainer({ handleSkillAdd }) {
    const [categories, setCategories] = [
        "Communication",
        "Leadership",
        "Technical",
        "Problem-Solving",
        "Creativity",
        "Interpersonal",
        "Organizational",
        "Analytical",
        "Adaptability",
        "Customer Service",
        "Financial",
        "Teaching/Training"
    ];
    const [skillCategories, setSkillCategories] = useState({
        Communication: [
            "Active Listening",
            "Verbal Communication",
            "Written Communication",
            "Nonverbal Communication",
            "Public Speaking",
            "Presentation Skills",
            "Negotiation",
            "Conflict Resolution",
            "Interpersonal Skills",
            "Storytelling",
            "Persuasion",
            "Empathy",
            "Constructive Feedback",
            "Clarity and Conciseness",
            "Cross-Cultural Communication",
            "Team Collaboration",
            "Emotional Intelligence",
            "Networking",
            "Adaptability in Communication",
            "Questioning Techniques"
          ],
          Leadership: [
            "Decision-Making",
            "Strategic Thinking",
            "Team Building",
            "Delegation",
            "Conflict Management",
            "Motivation",
            "Emotional Intelligence",
            "Vision Setting",
            "Problem-Solving",
            "Adaptability",
            "Accountability",
            "Mentoring and Coaching",
            "Time Management",
            "Communication",
            "Influencing",
            "Negotiation",
            "Crisis Management",
            "Planning and Organization",
            "Goal Setting",
            "Change Management"
          ],
          Technical: [
            "Programming",
            "Data Analysis",
            "Database Management",
            "Cybersecurity",
            "Software Development",
            "Cloud Computing",
            "Machine Learning",
            "Networking",
            "System Administration",
            "Technical Writing",
            "Web Development",
            "Mobile App Development",
            "DevOps",
            "Hardware Maintenance",
            "Game Development"
          ],
          ProblemSolving: [
            "Critical Thinking",
            "Analytical Thinking",
            "Creativity",
            "Research",
            "Troubleshooting",
            "Decision Making",
            "Innovation",
            "Logic",
            "Prioritization",
            "Root Cause Analysis",
            "Brainstorming"
          ],
          Creativity: [
            "Idea Generation",
            "Innovation",
            "Artistic Design",
            "Writing",
            "Storytelling",
            "Graphic Design",
            "Video Production",
            "Problem Solving",
            "Imagination",
            "Adaptability",
            "Collaboration in Creative Processes"
          ],
          Interpersonal: [
            "Empathy",
            "Active Listening",
            "Conflict Resolution",
            "Team Collaboration",
            "Building Trust",
            "Networking",
            "Persuasion",
            "Patience",
            "Adaptability",
            "Cultural Sensitivity",
            "Emotional Intelligence"
          ],
          Organizational: [
            "Time Management",
            "Project Management",
            "Prioritization",
            "Scheduling",
            "Goal Setting",
            "Task Delegation",
            "Resource Management",
            "Efficiency Optimization",
            "Detail Orientation",
            "Strategic Planning"
          ],
          Analytical: [
            "Data Analysis",
            "Research Skills",
            "Critical Thinking",
            "Problem Solving",
            "Forecasting",
            "Statistical Analysis",
            "Attention to Detail",
            "Logical Reasoning",
            "Pattern Recognition",
            "Quantitative Analysis"
          ],
          Adaptability: [
            "Flexibility",
            "Resilience",
            "Learning Agility",
            "Open-Mindedness",
            "Problem Solving Under Pressure",
            "Handling Ambiguity",
            "Quick Thinking",
            "Dealing with Change",
            "Crisis Management",
            "Emotional Control"
          ],
          CustomerService: [
            "Active Listening",
            "Empathy",
            "Patience",
            "Problem Solving",
            "Conflict Resolution",
            "Effective Communication",
            "Product Knowledge",
            "Time Management",
            "Adaptability",
            "Positive Attitude"
          ],
          Financial: [
            "Budgeting",
            "Accounting",
            "Financial Analysis",
            "Forecasting",
            "Investment Management",
            "Risk Management",
            "Tax Preparation",
            "Expense Tracking",
            "Cost Control",
            "Auditing"
          ],
          TeachingTraining: [
            "Lesson Planning",
            "Public Speaking",
            "Active Listening",
            "Empathy",
            "Adaptability",
            "Coaching",
            "Mentoring",
            "Communication",
            "Feedback Delivery",
            "Conflict Resolution"
          ]
    });

    const cardBgColors = {
        red: 'bg-red-700',
        stone: 'bg-stone-800'
    };

    const cardUlBgColors = {
        red: 'bg-red-600',
        stone: 'bg-stone-700'
    };

          return(
        <div className='flex h-96 p-5 bg-black rounded-md'>
            {
                categories.map((item, index) => {
                    
                    return(
                        // If I use transition I can't open the accordion the the end... find out why. I need transitioning.    
                        <article key={index} className={`group rounded-md relative flex justify-center hover:justify-between w-10 hover:w-full items-center p-5 ${index % 2 === 0 ? cardBgColors['red'] : cardBgColors['stone']} text-slate-100`}>
                            <div className='hidden group-hover:block w-fit text-center'>
                                <h2 className='hidden group-hover:block mb-2.5'>Select a skill</h2>
                                <ul className={`hidden w-full rounded-md group-hover:block h-64 px-10 group-hover:flex flex-col self-center justify-center items-center gap-5 ${index % 2 === 0 ? cardUlBgColors['red'] : cardUlBgColors['stone']} shadow-inner overflow-y-scroll no-scrollbar`}>
                                    {skills.map(item => {
                                        return(
                                            <li key={item} onClick={() => handleSkillAdd(item)} className={`hover:text-slate-500 cursor-pointer w-full`}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='hidden group-hover:block h-full rounded-full border border-stone-900'></div>
                            <h3 className='text-xl group-hover:text-3xl group-hover:font-bold rotate-90 group-hover:rotate-0 text-nowrap'>{item}</h3>

                            <div className='hidden h-96 bg-green-500'>
                                
                            </div>
                        </article>
                    );
                })
            }
        </div>
    );
};

export default PickSkillsContainer;