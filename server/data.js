// Course data with hierarchical structure: Chapters → Sub-chapters → Materials

const course = {
  id: 'course-001',
  title: 'Complete Exam Preparation Masterclass',
  description: 'Master all concepts and ace your exam with our comprehensive preparation course. Learn from expert instructors with video lessons, audio lectures, downloadable study materials, and interactive quizzes.',
  price: 999,
  currency: 'INR',
  image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  features: [
    'Over 10 hours of video content',
    'Audio lectures for learning on-the-go',
    'Downloadable PDF study materials',
    'Interactive quizzes with explanations',
    'Lifetime access',
    'Certificate of completion'
  ],
  whatYouWillLearn: [
    'Master fundamental concepts and theories',
    'Solve complex problems with confidence',
    'Learn exam-taking strategies and time management',
    'Practice with real exam-style questions',
    'Build a strong foundation for advanced topics'
  ]
};

// Chapters (main topics)
const chapters = [
  {
    id: 'chapter-1',
    courseId: 'course-001',
    title: 'Introduction to the Course',
    description: 'Get started with the basics and understand what this course covers.',
    order: 1,
    isFree: true,
    icon: '📚'
  },
  {
    id: 'chapter-2',
    courseId: 'course-001',
    title: 'Core Concepts',
    description: 'Deep dive into the fundamental concepts you need to know.',
    order: 2,
    isFree: false,
    icon: '🎯'
  },
  {
    id: 'chapter-3',
    courseId: 'course-001',
    title: 'Advanced Topics',
    description: 'Explore advanced topics and complex problem-solving techniques.',
    order: 3,
    isFree: false,
    icon: '🚀'
  },
  {
    id: 'chapter-4',
    courseId: 'course-001',
    title: 'Practice & Application',
    description: 'Apply your knowledge with practical exercises and problems.',
    order: 4,
    isFree: false,
    icon: '✍️'
  },
  {
    id: 'chapter-5',
    courseId: 'course-001',
    title: 'Final Review & Exam Tips',
    description: 'Review all concepts and learn exam-taking strategies.',
    order: 5,
    isFree: false,
    icon: '🏆'
  }
];

// Sub-chapters within each chapter
const subChapters = {
  'chapter-1': [
    {
      id: 'sub-1-1',
      chapterId: 'chapter-1',
      title: 'Welcome & Course Overview',
      description: 'Introduction to the course structure and learning objectives.',
      order: 1,
      duration: '15 min'
    },
    {
      id: 'sub-1-2',
      chapterId: 'chapter-1',
      title: 'How to Use This Course',
      description: 'Learn how to navigate and make the most of this course.',
      order: 2,
      duration: '10 min'
    },
    {
      id: 'sub-1-3',
      chapterId: 'chapter-1',
      title: 'Study Tips & Strategies',
      description: 'Effective study techniques for exam preparation.',
      order: 3,
      duration: '20 min'
    }
  ],
  'chapter-2': [
    {
      id: 'sub-2-1',
      chapterId: 'chapter-2',
      title: 'Fundamental Principles',
      description: 'Understanding the basic principles that form the foundation.',
      order: 1,
      duration: '30 min'
    },
    {
      id: 'sub-2-2',
      chapterId: 'chapter-2',
      title: 'Key Definitions & Terminology',
      description: 'Important terms and definitions you must know.',
      order: 2,
      duration: '25 min'
    },
    {
      id: 'sub-2-3',
      chapterId: 'chapter-2',
      title: 'Core Theorems & Laws',
      description: 'Essential theorems and laws explained in detail.',
      order: 3,
      duration: '35 min'
    }
  ],
  'chapter-3': [
    {
      id: 'sub-3-1',
      chapterId: 'chapter-3',
      title: 'Complex Problem Solving',
      description: 'Techniques for solving complex problems step by step.',
      order: 1,
      duration: '40 min'
    },
    {
      id: 'sub-3-2',
      chapterId: 'chapter-3',
      title: 'Advanced Concepts Deep Dive',
      description: 'Detailed exploration of advanced topics.',
      order: 2,
      duration: '45 min'
    },
    {
      id: 'sub-3-3',
      chapterId: 'chapter-3',
      title: 'Case Studies',
      description: 'Real-world case studies and applications.',
      order: 3,
      duration: '35 min'
    }
  ],
  'chapter-4': [
    {
      id: 'sub-4-1',
      chapterId: 'chapter-4',
      title: 'Practice Problem Set 1',
      description: 'First set of practice problems with varying difficulty.',
      order: 1,
      duration: '50 min'
    },
    {
      id: 'sub-4-2',
      chapterId: 'chapter-4',
      title: 'Practice Problem Set 2',
      description: 'More challenging problems to test your understanding.',
      order: 2,
      duration: '50 min'
    },
    {
      id: 'sub-4-3',
      chapterId: 'chapter-4',
      title: 'Mock Test Walkthrough',
      description: 'Complete walkthrough of a mock exam.',
      order: 3,
      duration: '60 min'
    }
  ],
  'chapter-5': [
    {
      id: 'sub-5-1',
      chapterId: 'chapter-5',
      title: 'Quick Revision',
      description: 'Rapid revision of all important concepts.',
      order: 1,
      duration: '30 min'
    },
    {
      id: 'sub-5-2',
      chapterId: 'chapter-5',
      title: 'Exam Day Strategies',
      description: 'Tips and tricks for the exam day.',
      order: 2,
      duration: '20 min'
    },
    {
      id: 'sub-5-3',
      chapterId: 'chapter-5',
      title: 'Common Mistakes to Avoid',
      description: 'Learn from common mistakes students make.',
      order: 3,
      duration: '25 min'
    }
  ]
};

// Materials for each sub-chapter (videos, audios, PDFs, quizzes)
const materials = {
  'sub-1-1': {
    videos: [
      {
        id: 'vid-1-1-1',
        title: 'Welcome to the Course',
        description: 'Introduction by the instructor',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '8 min'
      }
    ],
    audios: [
      {
        id: 'aud-1-1-1',
        title: 'Course Overview - Audio Version',
        description: 'Listen to the course overview on the go',
        url: '/audio/welcome.mp3',
        duration: '7 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-1-1-1',
        title: 'Course Syllabus',
        description: 'Complete course outline and objectives',
        url: '/pdfs/syllabus.pdf'
      },
      {
        id: 'pdf-1-1-2',
        title: 'Learning Roadmap',
        description: 'Your path to exam success',
        url: '/pdfs/roadmap.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-1-1-1',
        title: 'Introduction Quiz',
        description: 'Test your understanding of the course structure',
        questions: [
          {
            id: 'q1',
            question: 'What is the primary goal of this course?',
            options: [
              { id: 'a', text: 'To teach programming' },
              { id: 'b', text: 'To prepare students for the exam' },
              { id: 'c', text: 'To learn a new language' },
              { id: 'd', text: 'To get a job' }
            ],
            correctAnswer: 'b',
            explanation: 'This course is specifically designed to help you prepare for and pass your exam with comprehensive study materials.'
          },
          {
            id: 'q2',
            question: 'What materials are included in each sub-chapter?',
            options: [
              { id: 'a', text: 'Only videos' },
              { id: 'b', text: 'Videos, audios, PDFs, and quizzes' },
              { id: 'c', text: 'Only text content' },
              { id: 'd', text: 'Only quizzes' }
            ],
            correctAnswer: 'b',
            explanation: 'Each sub-chapter contains a variety of learning materials including videos, audio lectures, PDF notes, and interactive quizzes.'
          }
        ]
      }
    ]
  },
  'sub-1-2': {
    videos: [
      {
        id: 'vid-1-2-1',
        title: 'Navigating the Course',
        description: 'How to find and access all course materials',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '5 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-1-2-1',
        title: 'Quick Start Guide',
        description: 'Get started in 5 minutes',
        url: '/pdfs/quickstart.pdf'
      }
    ],
    quizzes: []
  },
  'sub-1-3': {
    videos: [
      {
        id: 'vid-1-3-1',
        title: 'Effective Study Techniques',
        description: 'Proven methods for better retention',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '12 min'
      }
    ],
    audios: [
      {
        id: 'aud-1-3-1',
        title: 'Study Tips Podcast',
        description: 'Audio guide to effective studying',
        url: '/audio/study-tips.mp3',
        duration: '15 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-1-3-1',
        title: 'Study Planner Template',
        description: 'Plan your study schedule',
        url: '/pdfs/planner.pdf'
      },
      {
        id: 'pdf-1-3-2',
        title: 'Memory Techniques',
        description: 'Techniques to remember better',
        url: '/pdfs/memory.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-1-3-1',
        title: 'Study Strategies Quiz',
        description: 'Check your understanding of study techniques',
        questions: [
          {
            id: 'q1',
            question: 'What is the recommended study approach?',
            options: [
              { id: 'a', text: 'Study only the night before' },
              { id: 'b', text: 'Consistent daily practice' },
              { id: 'c', text: 'Read notes once and never review' },
              { id: 'd', text: 'Only watch videos without practice' }
            ],
            correctAnswer: 'b',
            explanation: 'Consistent daily practice helps reinforce learning and improves long-term retention.'
          }
        ]
      }
    ]
  },
  'sub-2-1': {
    videos: [
      {
        id: 'vid-2-1-1',
        title: 'Introduction to Fundamental Principles',
        description: 'Overview of core principles',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15 min'
      },
      {
        id: 'vid-2-1-2',
        title: 'Principle Deep Dive',
        description: 'Detailed explanation with examples',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15 min'
      }
    ],
    audios: [
      {
        id: 'aud-2-1-1',
        title: 'Fundamentals Audio Lecture',
        description: 'Complete audio lecture on principles',
        url: '/audio/fundamentals.mp3',
        duration: '20 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-2-1-1',
        title: 'Fundamental Principles Notes',
        description: 'Comprehensive notes on all principles',
        url: '/pdfs/fundamentals.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-2-1-1',
        title: 'Fundamentals Quiz',
        description: 'Test your understanding of basic principles',
        questions: [
          {
            id: 'q1',
            question: 'What is the most important aspect of understanding core concepts?',
            options: [
              { id: 'a', text: 'Memorizing everything' },
              { id: 'b', text: 'Building a strong foundation' },
              { id: 'c', text: 'Skipping to advanced topics' },
              { id: 'd', text: 'Only reading summaries' }
            ],
            correctAnswer: 'b',
            explanation: 'A strong foundation in core concepts helps you understand advanced topics better.'
          },
          {
            id: 'q2',
            question: 'How should you approach new concepts?',
            options: [
              { id: 'a', text: 'Skip them if they seem hard' },
              { id: 'b', text: 'Practice with examples and exercises' },
              { id: 'c', text: 'Just read once' },
              { id: 'd', text: 'Memorize without understanding' }
            ],
            correctAnswer: 'b',
            explanation: 'Practicing with examples and exercises helps solidify your understanding of new concepts.'
          }
        ]
      }
    ]
  },
  'sub-2-2': {
    videos: [
      {
        id: 'vid-2-2-1',
        title: 'Key Terms Explained',
        description: 'All important terminology covered',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '18 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-2-2-1',
        title: 'Glossary of Terms',
        description: 'Complete glossary with definitions',
        url: '/pdfs/glossary.pdf'
      },
      {
        id: 'pdf-2-2-2',
        title: 'Terminology Flashcards',
        description: 'Printable flashcards for revision',
        url: '/pdfs/flashcards.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-2-2-1',
        title: 'Terminology Quiz',
        description: 'Test your knowledge of key terms',
        questions: [
          {
            id: 'q1',
            question: 'Why is understanding terminology important?',
            options: [
              { id: 'a', text: 'It is not important' },
              { id: 'b', text: 'It helps understand questions correctly' },
              { id: 'c', text: 'Only for advanced students' },
              { id: 'd', text: 'Just for memorization' }
            ],
            correctAnswer: 'b',
            explanation: 'Understanding terminology helps you interpret exam questions correctly and communicate your answers effectively.'
          }
        ]
      }
    ]
  },
  'sub-2-3': {
    videos: [
      {
        id: 'vid-2-3-1',
        title: 'Core Theorems Explained',
        description: 'All important theorems with proofs',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '25 min'
      }
    ],
    audios: [
      {
        id: 'aud-2-3-1',
        title: 'Theorems Audio Guide',
        description: 'Listen and learn theorems on the go',
        url: '/audio/theorems.mp3',
        duration: '20 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-2-3-1',
        title: 'Theorem Summary Sheet',
        description: 'One-page summary of all theorems',
        url: '/pdfs/theorems.pdf'
      },
      {
        id: 'pdf-2-3-2',
        title: 'Detailed Proofs',
        description: 'Step-by-step proofs for each theorem',
        url: '/pdfs/proofs.pdf'
      }
    ],
    quizzes: []
  },
  'sub-3-1': {
    videos: [
      {
        id: 'vid-3-1-1',
        title: 'Problem Solving Framework',
        description: 'A systematic approach to complex problems',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '20 min'
      },
      {
        id: 'vid-3-1-2',
        title: 'Worked Examples',
        description: 'Step-by-step problem solutions',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '20 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-3-1-1',
        title: 'Problem Solving Guide',
        description: 'Complete guide to tackling complex problems',
        url: '/pdfs/problem-solving.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-3-1-1',
        title: 'Problem Solving Quiz',
        description: 'Test your problem-solving skills',
        questions: [
          {
            id: 'q1',
            question: 'What is the first step in solving a complex problem?',
            options: [
              { id: 'a', text: 'Jump to the solution' },
              { id: 'b', text: 'Understand the problem completely' },
              { id: 'c', text: 'Guess the answer' },
              { id: 'd', text: 'Skip it' }
            ],
            correctAnswer: 'b',
            explanation: 'Understanding the problem completely is crucial before attempting to solve it.'
          }
        ]
      }
    ]
  },
  'sub-3-2': {
    videos: [
      {
        id: 'vid-3-2-1',
        title: 'Advanced Concepts Part 1',
        description: 'First part of advanced topics',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '22 min'
      },
      {
        id: 'vid-3-2-2',
        title: 'Advanced Concepts Part 2',
        description: 'Second part of advanced topics',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '23 min'
      }
    ],
    audios: [
      {
        id: 'aud-3-2-1',
        title: 'Advanced Topics Summary',
        description: 'Audio summary of advanced concepts',
        url: '/audio/advanced.mp3',
        duration: '25 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-3-2-1',
        title: 'Advanced Topics Notes',
        description: 'Detailed notes on advanced concepts',
        url: '/pdfs/advanced-notes.pdf'
      }
    ],
    quizzes: []
  },
  'sub-3-3': {
    videos: [
      {
        id: 'vid-3-3-1',
        title: 'Case Study Analysis',
        description: 'Real-world application examples',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '25 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-3-3-1',
        title: 'Case Study Collection',
        description: 'Collection of important case studies',
        url: '/pdfs/case-studies.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-3-3-1',
        title: 'Case Study Quiz',
        description: 'Test your understanding of case studies',
        questions: [
          {
            id: 'q1',
            question: 'Why are case studies important for exam preparation?',
            options: [
              { id: 'a', text: 'They are not important' },
              { id: 'b', text: 'They show real-world applications' },
              { id: 'c', text: 'They are just for entertainment' },
              { id: 'd', text: 'Only for advanced students' }
            ],
            correctAnswer: 'b',
            explanation: 'Case studies demonstrate how concepts are applied in real-world scenarios, which is often tested in exams.'
          }
        ]
      }
    ]
  },
  'sub-4-1': {
    videos: [
      {
        id: 'vid-4-1-1',
        title: 'Practice Set 1 Walkthrough',
        description: 'Solving problems from set 1',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '30 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-4-1-1',
        title: 'Problem Set 1',
        description: '25 practice problems',
        url: '/pdfs/problem-set-1.pdf'
      },
      {
        id: 'pdf-4-1-2',
        title: 'Problem Set 1 Solutions',
        description: 'Detailed solutions with explanations',
        url: '/pdfs/solutions-1.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-4-1-1',
        title: 'Practice Quiz 1',
        description: 'Timed practice quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the best way to approach practice problems?',
            options: [
              { id: 'a', text: 'Look at solutions first' },
              { id: 'b', text: 'Try solving without hints first' },
              { id: 'c', text: 'Skip difficult ones' },
              { id: 'd', text: 'Do only easy problems' }
            ],
            correctAnswer: 'b',
            explanation: 'Attempting problems without looking at solutions first helps build problem-solving skills.'
          }
        ]
      }
    ]
  },
  'sub-4-2': {
    videos: [
      {
        id: 'vid-4-2-1',
        title: 'Practice Set 2 Walkthrough',
        description: 'Solving challenging problems',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '35 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-4-2-1',
        title: 'Problem Set 2',
        description: '30 challenging problems',
        url: '/pdfs/problem-set-2.pdf'
      },
      {
        id: 'pdf-4-2-2',
        title: 'Problem Set 2 Solutions',
        description: 'Detailed solutions',
        url: '/pdfs/solutions-2.pdf'
      }
    ],
    quizzes: []
  },
  'sub-4-3': {
    videos: [
      {
        id: 'vid-4-3-1',
        title: 'Mock Test Part 1',
        description: 'First half of the mock exam',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '30 min'
      },
      {
        id: 'vid-4-3-2',
        title: 'Mock Test Part 2',
        description: 'Second half of the mock exam',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '30 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-4-3-1',
        title: 'Mock Test Paper',
        description: 'Full mock exam paper',
        url: '/pdfs/mock-test.pdf'
      },
      {
        id: 'pdf-4-3-2',
        title: 'Mock Test Solutions',
        description: 'Complete answer key with explanations',
        url: '/pdfs/mock-solutions.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-4-3-1',
        title: 'Mock Test Quiz',
        description: 'Online version of mock test',
        questions: [
          {
            id: 'q1',
            question: 'How should you manage time during the mock test?',
            options: [
              { id: 'a', text: 'Spend unlimited time on each question' },
              { id: 'b', text: 'Allocate time per question and stick to it' },
              { id: 'c', text: 'Rush through all questions' },
              { id: 'd', text: 'Only do half the questions' }
            ],
            correctAnswer: 'b',
            explanation: 'Time management is crucial in exams. Allocate time wisely and move on if stuck.'
          },
          {
            id: 'q2',
            question: 'What should you do after completing the mock test?',
            options: [
              { id: 'a', text: 'Forget about it' },
              { id: 'b', text: 'Review your mistakes and learn from them' },
              { id: 'c', text: 'Only check the score' },
              { id: 'd', text: 'Do another test immediately' }
            ],
            correctAnswer: 'b',
            explanation: 'Reviewing mistakes is the most valuable part of taking mock tests.'
          }
        ]
      }
    ]
  },
  'sub-5-1': {
    videos: [
      {
        id: 'vid-5-1-1',
        title: 'Quick Revision Video',
        description: 'Rapid review of all key concepts',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '20 min'
      }
    ],
    audios: [
      {
        id: 'aud-5-1-1',
        title: 'Revision Audio',
        description: 'Listen while commuting or relaxing',
        url: '/audio/revision.mp3',
        duration: '25 min'
      }
    ],
    pdfs: [
      {
        id: 'pdf-5-1-1',
        title: 'Quick Revision Notes',
        description: 'One-page summary per topic',
        url: '/pdfs/quick-revision.pdf'
      },
      {
        id: 'pdf-5-1-2',
        title: 'Formula Sheet',
        description: 'All important formulas in one place',
        url: '/pdfs/formula-sheet.pdf'
      }
    ],
    quizzes: []
  },
  'sub-5-2': {
    videos: [
      {
        id: 'vid-5-2-1',
        title: 'Exam Day Tips',
        description: 'What to do on the day of the exam',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '12 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-5-2-1',
        title: 'Exam Day Checklist',
        description: 'Things to remember on exam day',
        url: '/pdfs/exam-checklist.pdf'
      }
    ],
    quizzes: []
  },
  'sub-5-3': {
    videos: [
      {
        id: 'vid-5-3-1',
        title: 'Common Mistakes',
        description: 'Learn what NOT to do in exams',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15 min'
      }
    ],
    audios: [],
    pdfs: [
      {
        id: 'pdf-5-3-1',
        title: 'Common Mistakes Guide',
        description: 'Avoid these pitfalls',
        url: '/pdfs/common-mistakes.pdf'
      }
    ],
    quizzes: [
      {
        id: 'quiz-5-3-1',
        title: 'Final Review Quiz',
        description: 'Comprehensive review quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the most common mistake students make?',
            options: [
              { id: 'a', text: 'Not reading questions carefully' },
              { id: 'b', text: 'Studying too much' },
              { id: 'c', text: 'Arriving too early' },
              { id: 'd', text: 'Bringing too many pens' }
            ],
            correctAnswer: 'a',
            explanation: 'Not reading questions carefully leads to misunderstanding and wrong answers.'
          },
          {
            id: 'q2',
            question: 'What should you do if you get stuck on a question?',
            options: [
              { id: 'a', text: 'Spend all remaining time on it' },
              { id: 'b', text: 'Mark it and move on, come back later' },
              { id: 'c', text: 'Leave it blank' },
              { id: 'd', text: 'Guess randomly immediately' }
            ],
            correctAnswer: 'b',
            explanation: 'Mark difficult questions and return to them after completing easier ones.'
          },
          {
            id: 'q3',
            question: 'What is the best pre-exam preparation?',
            options: [
              { id: 'a', text: 'Stay up all night studying' },
              { id: 'b', text: 'Get good sleep and light revision' },
              { id: 'c', text: 'Learn new topics' },
              { id: 'd', text: 'Skip breakfast' }
            ],
            correctAnswer: 'b',
            explanation: 'Good sleep and light revision before exams helps maintain focus and recall.'
          }
        ]
      }
    ]
  }
};

// Coupons
const coupons = {
  'WELCOME20': { code: 'WELCOME20', discount: 20, type: 'percentage' },
  'FLAT100': { code: 'FLAT100', discount: 100, type: 'fixed' },
  'STUDENT50': { code: 'STUDENT50', discount: 50, type: 'percentage' }
};

module.exports = {
  course,
  chapters,
  subChapters,
  materials,
  coupons
};
