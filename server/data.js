// In-memory database for the e-learning platform

const { v4: uuidv4 } = require('uuid');

// Users database
const users = [];

// Course data
const course = {
  id: 'course-001',
  title: 'Complete Exam Preparation Masterclass',
  description: 'Master all concepts and ace your exam with our comprehensive preparation course. Learn from expert instructors with video lessons, downloadable study materials, and interactive quizzes.',
  price: 999,
  currency: 'INR',
  image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  features: [
    'Over 10 hours of video content',
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

// Chapters data
const chapters = [
  {
    id: 'chapter-1',
    courseId: 'course-001',
    title: 'Introduction to the Course',
    description: 'Get started with the basics and understand what this course covers.',
    order: 1,
    isFree: true,
    duration: '45 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfs: [
      { id: 'pdf-1-1', title: 'Course Overview', url: '/sample-pdfs/overview.pdf' },
      { id: 'pdf-1-2', title: 'Study Guide', url: '/sample-pdfs/study-guide.pdf' }
    ]
  },
  {
    id: 'chapter-2',
    courseId: 'course-001',
    title: 'Core Concepts',
    description: 'Deep dive into the fundamental concepts you need to know.',
    order: 2,
    isFree: false,
    duration: '1 hr 30 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfs: [
      { id: 'pdf-2-1', title: 'Core Concepts Notes', url: '/sample-pdfs/core-concepts.pdf' },
      { id: 'pdf-2-2', title: 'Practice Worksheets', url: '/sample-pdfs/worksheets.pdf' }
    ]
  },
  {
    id: 'chapter-3',
    courseId: 'course-001',
    title: 'Advanced Topics',
    description: 'Explore advanced topics and complex problem-solving techniques.',
    order: 3,
    isFree: false,
    duration: '2 hr',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfs: [
      { id: 'pdf-3-1', title: 'Advanced Topics Guide', url: '/sample-pdfs/advanced.pdf' },
      { id: 'pdf-3-2', title: 'Formula Sheet', url: '/sample-pdfs/formulas.pdf' }
    ]
  },
  {
    id: 'chapter-4',
    courseId: 'course-001',
    title: 'Practice Problems',
    description: 'Solve practice problems similar to actual exam questions.',
    order: 4,
    isFree: false,
    duration: '2 hr 30 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfs: [
      { id: 'pdf-4-1', title: 'Problem Set 1', url: '/sample-pdfs/problems-1.pdf' },
      { id: 'pdf-4-2', title: 'Problem Set 2', url: '/sample-pdfs/problems-2.pdf' },
      { id: 'pdf-4-3', title: 'Solutions', url: '/sample-pdfs/solutions.pdf' }
    ]
  },
  {
    id: 'chapter-5',
    courseId: 'course-001',
    title: 'Final Review & Exam Tips',
    description: 'Review all concepts and learn exam-taking strategies.',
    order: 5,
    isFree: false,
    duration: '1 hr 15 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfs: [
      { id: 'pdf-5-1', title: 'Quick Revision Notes', url: '/sample-pdfs/revision.pdf' },
      { id: 'pdf-5-2', title: 'Exam Tips & Tricks', url: '/sample-pdfs/tips.pdf' },
      { id: 'pdf-5-3', title: 'Last Minute Checklist', url: '/sample-pdfs/checklist.pdf' }
    ]
  }
];

// Quiz data for each chapter (multiple quizzes per chapter)
const quizzes = {
  'chapter-1': [
    {
      id: 'quiz-1-1',
      chapterId: 'chapter-1',
      title: 'Introduction Basics',
      description: 'Test your understanding of course basics',
      questions: [
        {
          id: 'q1-1',
          question: 'What is the primary goal of this course?',
          options: [
            { id: 'a', text: 'To teach programming' },
            { id: 'b', text: 'To prepare students for the exam' },
            { id: 'c', text: 'To learn a new language' },
            { id: 'd', text: 'To get a job' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. This course is focused on exam preparation, not programming.',
            'b': 'Correct! This course is specifically designed to help you prepare for and pass your exam.',
            'c': 'Incorrect. Language learning is not the focus of this course.',
            'd': 'Incorrect. While passing exams can help with jobs, the primary goal is exam preparation.'
          }
        },
        {
          id: 'q1-2',
          question: 'How many chapters are in this course?',
          options: [
            { id: 'a', text: '3 chapters' },
            { id: 'b', text: '4 chapters' },
            { id: 'c', text: '5 chapters' },
            { id: 'd', text: '6 chapters' }
          ],
          correctAnswer: 'c',
          explanations: {
            'a': 'Incorrect. There are more than 3 chapters in this course.',
            'b': 'Incorrect. There are more than 4 chapters.',
            'c': 'Correct! The course contains 5 comprehensive chapters.',
            'd': 'Incorrect. There are only 5 chapters, not 6.'
          }
        },
        {
          id: 'q1-3',
          question: 'Which chapter is available for free?',
          options: [
            { id: 'a', text: 'All chapters are free' },
            { id: 'b', text: 'Chapter 1 only' },
            { id: 'c', text: 'No chapters are free' },
            { id: 'd', text: 'Last chapter only' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Only the first chapter is free.',
            'b': 'Correct! Chapter 1 is free for everyone to preview the course quality.',
            'c': 'Incorrect. Chapter 1 is available for free.',
            'd': 'Incorrect. The first chapter, not the last, is free.'
          }
        }
      ]
    },
    {
      id: 'quiz-1-2',
      chapterId: 'chapter-1',
      title: 'Course Structure Quiz',
      description: 'Check your knowledge about how the course is organized',
      questions: [
        {
          id: 'q1-2-1',
          question: 'What materials are included in each chapter?',
          options: [
            { id: 'a', text: 'Only videos' },
            { id: 'b', text: 'Videos, PDFs, and quizzes' },
            { id: 'c', text: 'Only text content' },
            { id: 'd', text: 'Only quizzes' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Each chapter includes more than just videos.',
            'b': 'Correct! Each chapter contains video lessons, downloadable PDFs, and practice quizzes.',
            'c': 'Incorrect. The course includes multimedia content.',
            'd': 'Incorrect. Quizzes are just one part of the course materials.'
          }
        },
        {
          id: 'q1-2-2',
          question: 'What type of access do you get after purchasing?',
          options: [
            { id: 'a', text: '30-day access' },
            { id: 'b', text: '1 year access' },
            { id: 'c', text: 'Lifetime access' },
            { id: 'd', text: 'Weekly access' }
          ],
          correctAnswer: 'c',
          explanations: {
            'a': 'Incorrect. Access is not limited to 30 days.',
            'b': 'Incorrect. Access is not limited to 1 year.',
            'c': 'Correct! You get lifetime access to all course content after purchase.',
            'd': 'Incorrect. Access is not weekly.'
          }
        }
      ]
    }
  ],
  'chapter-2': [
    {
      id: 'quiz-2-1',
      chapterId: 'chapter-2',
      title: 'Core Concepts Quiz',
      description: 'Test your understanding of fundamental concepts',
      questions: [
        {
          id: 'q2-1',
          question: 'What is the most important aspect of understanding core concepts?',
          options: [
            { id: 'a', text: 'Memorizing everything' },
            { id: 'b', text: 'Building a strong foundation' },
            { id: 'c', text: 'Skipping to advanced topics' },
            { id: 'd', text: 'Only reading summaries' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Memorization without understanding is not effective for long-term learning.',
            'b': 'Correct! A strong foundation in core concepts helps you understand advanced topics better.',
            'c': 'Incorrect. Skipping fundamentals will make advanced topics harder to understand.',
            'd': 'Incorrect. Summaries are helpful but not sufficient for deep understanding.'
          }
        },
        {
          id: 'q2-2',
          question: 'How should you approach problem-solving in exams?',
          options: [
            { id: 'a', text: 'Rush through all questions quickly' },
            { id: 'b', text: 'Spend all time on hard questions' },
            { id: 'c', text: 'Read carefully and manage time wisely' },
            { id: 'd', text: 'Skip all difficult questions' }
          ],
          correctAnswer: 'c',
          explanations: {
            'a': 'Incorrect. Rushing leads to careless mistakes.',
            'b': 'Incorrect. This could waste time and cause you to miss easier questions.',
            'c': 'Correct! Careful reading and time management are key to exam success.',
            'd': 'Incorrect. Some difficult questions may be worth attempting.'
          }
        },
        {
          id: 'q2-3',
          question: 'What is the recommended study approach?',
          options: [
            { id: 'a', text: 'Study only the night before' },
            { id: 'b', text: 'Consistent daily practice' },
            { id: 'c', text: 'Read notes once and never review' },
            { id: 'd', text: 'Only watch videos without practice' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Last-minute cramming is ineffective for retention.',
            'b': 'Correct! Consistent daily practice helps reinforce learning and improves retention.',
            'c': 'Incorrect. Regular review is essential for long-term memory.',
            'd': 'Incorrect. Active practice is necessary alongside passive learning.'
          }
        }
      ]
    }
  ],
  'chapter-3': [
    {
      id: 'quiz-3-1',
      chapterId: 'chapter-3',
      title: 'Advanced Topics Quiz',
      description: 'Challenge yourself with advanced concepts',
      questions: [
        {
          id: 'q3-1',
          question: 'What distinguishes advanced topics from basic concepts?',
          options: [
            { id: 'a', text: 'They are easier to understand' },
            { id: 'b', text: 'They build upon fundamental knowledge' },
            { id: 'c', text: 'They can be learned without basics' },
            { id: 'd', text: 'They are not important for exams' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Advanced topics are typically more complex.',
            'b': 'Correct! Advanced topics require a solid understanding of fundamental concepts.',
            'c': 'Incorrect. Basics are essential for understanding advanced material.',
            'd': 'Incorrect. Advanced topics often carry significant weight in exams.'
          }
        },
        {
          id: 'q3-2',
          question: 'How should you handle complex problems?',
          options: [
            { id: 'a', text: 'Give up immediately' },
            { id: 'b', text: 'Break them into smaller parts' },
            { id: 'c', text: 'Guess the answer' },
            { id: 'd', text: 'Skip all complex problems' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Persistence is key to learning.',
            'b': 'Correct! Breaking complex problems into smaller, manageable parts makes them easier to solve.',
            'c': 'Incorrect. Guessing doesn\'t help you learn.',
            'd': 'Incorrect. Practicing complex problems improves your skills.'
          }
        }
      ]
    }
  ],
  'chapter-4': [
    {
      id: 'quiz-4-1',
      chapterId: 'chapter-4',
      title: 'Practice Problems Quiz',
      description: 'Test your problem-solving skills',
      questions: [
        {
          id: 'q4-1',
          question: 'Why is practicing problems important?',
          options: [
            { id: 'a', text: 'It\'s not important' },
            { id: 'b', text: 'It helps apply theoretical knowledge' },
            { id: 'c', text: 'It wastes time' },
            { id: 'd', text: 'It only helps slow learners' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Practice is crucial for exam success.',
            'b': 'Correct! Practice helps you apply what you\'ve learned and identify gaps in understanding.',
            'c': 'Incorrect. Practice time is well invested.',
            'd': 'Incorrect. Practice benefits all learners.'
          }
        },
        {
          id: 'q4-2',
          question: 'What should you do after solving a practice problem?',
          options: [
            { id: 'a', text: 'Move on immediately' },
            { id: 'b', text: 'Check the solution and understand mistakes' },
            { id: 'c', text: 'Never look at the solution' },
            { id: 'd', text: 'Solve the same problem repeatedly' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Reviewing your work is essential.',
            'b': 'Correct! Understanding your mistakes helps you avoid them in the future.',
            'c': 'Incorrect. Solutions help you learn the correct approach.',
            'd': 'Incorrect. Variety in practice is more beneficial.'
          }
        }
      ]
    }
  ],
  'chapter-5': [
    {
      id: 'quiz-5-1',
      chapterId: 'chapter-5',
      title: 'Final Review Quiz',
      description: 'Comprehensive review before your exam',
      questions: [
        {
          id: 'q5-1',
          question: 'What is the best way to review before an exam?',
          options: [
            { id: 'a', text: 'Read everything from scratch' },
            { id: 'b', text: 'Focus on weak areas and key concepts' },
            { id: 'c', text: 'Don\'t review at all' },
            { id: 'd', text: 'Only review easy topics' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. This is time-consuming and inefficient.',
            'b': 'Correct! Focusing on weak areas and key concepts maximizes your review time.',
            'c': 'Incorrect. Review is essential before exams.',
            'd': 'Incorrect. Weak areas need more attention.'
          }
        },
        {
          id: 'q5-2',
          question: 'What should you do the night before the exam?',
          options: [
            { id: 'a', text: 'Study all night' },
            { id: 'b', text: 'Get good rest and light revision' },
            { id: 'c', text: 'Watch movies to relax' },
            { id: 'd', text: 'Start learning new topics' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. All-night studying leads to fatigue.',
            'b': 'Correct! Good rest and light revision help you perform better.',
            'c': 'Incorrect. Some revision is beneficial.',
            'd': 'Incorrect. Focus on reviewing what you\'ve learned.'
          }
        },
        {
          id: 'q5-3',
          question: 'How should you manage time during the exam?',
          options: [
            { id: 'a', text: 'Spend equal time on all questions' },
            { id: 'b', text: 'Allocate time based on marks and difficulty' },
            { id: 'c', text: 'Answer only questions you like' },
            { id: 'd', text: 'Leave time management to chance' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Not all questions deserve equal time.',
            'b': 'Correct! Smart time allocation based on marks and difficulty maximizes your score.',
            'c': 'Incorrect. You should attempt all questions if possible.',
            'd': 'Incorrect. Planning your time is crucial.'
          }
        }
      ]
    },
    {
      id: 'quiz-5-2',
      chapterId: 'chapter-5',
      title: 'Exam Day Preparation',
      description: 'Final tips for exam day success',
      questions: [
        {
          id: 'q5-2-1',
          question: 'What should you bring to the exam?',
          options: [
            { id: 'a', text: 'Nothing at all' },
            { id: 'b', text: 'Required ID, stationery, and admit card' },
            { id: 'c', text: 'Your entire notebook collection' },
            { id: 'd', text: 'Electronic devices' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. You need essential items for the exam.',
            'b': 'Correct! Always carry required identification, writing materials, and your admit card.',
            'c': 'Incorrect. You typically cannot bring study materials into the exam.',
            'd': 'Incorrect. Electronic devices are usually prohibited.'
          }
        },
        {
          id: 'q5-2-2',
          question: 'How early should you arrive at the exam center?',
          options: [
            { id: 'a', text: 'Just on time' },
            { id: 'b', text: '30-45 minutes early' },
            { id: 'c', text: '5 minutes late' },
            { id: 'd', text: '3 hours early' }
          ],
          correctAnswer: 'b',
          explanations: {
            'a': 'Incorrect. Arriving just on time can cause stress if there are delays.',
            'b': 'Correct! Arriving 30-45 minutes early gives you time to settle and relax.',
            'c': 'Incorrect. Being late can disqualify you from the exam.',
            'd': 'Incorrect. Arriving too early may increase anxiety.'
          }
        }
      ]
    }
  ]
};

// Coupon codes
const coupons = {
  'LAUNCH50': { discount: 50, type: 'percentage' },
  'FLAT100': { discount: 100, type: 'fixed' },
  'STUDENT20': { discount: 20, type: 'percentage' }
};

// Purchases tracking
const purchases = [];

module.exports = {
  users,
  course,
  chapters,
  quizzes,
  coupons,
  purchases
};
