// Vercel Serverless API Entry Point
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const { initDatabase, userOps, purchaseOps, progressOps, quizOps } = require('../server/database-turso');
const { course, chapters, quizzes, coupons } = require('../server/data');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

// Razorpay instance
let razorpay = null;
function getRazorpay() {
  if (!razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return razorpay;
}

// Database initialization flag
let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    req.user = err ? null : user;
    next();
  });
}

// ============== HEALTH CHECK ==============
app.get('/api/health', async (req, res) => {
  try {
    await ensureDb();
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// ============== AUTH ROUTES ==============

// Signup
app.post('/api/auth/signup', async (req, res) => {
  await ensureDb();
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number. Enter 10-digit Indian mobile number.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email exists
    const existingEmail = await userOps.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if mobile exists
    const existingMobile = await userOps.findByMobile(mobile);
    if (existingMobile) {
      return res.status(400).json({ error: 'Mobile number already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const user = await userOps.create(userId, name, email, mobile, hashedPassword);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        hasPurchased: user.hasPurchased
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message || 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  await ensureDb();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await userOps.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        hasPurchased: user.hasPurchased
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const user = await userOps.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        hasPurchased: user.hasPurchased
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============== COURSE ROUTES ==============

app.get('/api/course', (req, res) => {
  res.json({ course });
});

app.get('/api/chapters', optionalAuth, async (req, res) => {
  await ensureDb();
  try {
    let hasPurchased = false;
    let userProgress = [];

    if (req.user) {
      const user = await userOps.findById(req.user.id);
      hasPurchased = user?.hasPurchased || false;
      userProgress = await progressOps.getProgress(req.user.id);
    }

    const chaptersWithAccess = chapters.map(chapter => {
      const progress = userProgress.find(p => p.chapterId === chapter.id);
      return {
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        order: chapter.order,
        duration: chapter.duration,
        isFree: chapter.isFree,
        isLocked: !chapter.isFree && !hasPurchased,
        completed: progress?.completed || false,
        lastAccessed: progress?.lastAccessed || null
      };
    });

    res.json({ chapters: chaptersWithAccess, hasPurchased });
  } catch (error) {
    console.error('Chapters error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/chapters/:id', optionalAuth, async (req, res) => {
  await ensureDb();
  try {
    const chapter = chapters.find(c => c.id === req.params.id);

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    let hasPurchased = false;
    if (req.user) {
      const user = await userOps.findById(req.user.id);
      hasPurchased = user?.hasPurchased || false;

      // Update progress
      await progressOps.updateProgress(req.user.id, chapter.id, false);
    }

    const hasAccess = chapter.isFree || hasPurchased;

    if (!hasAccess) {
      return res.json({
        chapter: {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          order: chapter.order,
          duration: chapter.duration,
          isFree: chapter.isFree,
          isLocked: true
        },
        hasAccess: false
      });
    }

    res.json({
      chapter: { ...chapter, isLocked: false },
      hasAccess: true
    });
  } catch (error) {
    console.error('Chapter error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark chapter complete
app.post('/api/chapters/:id/complete', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const chapter = chapters.find(c => c.id === req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    const user = await userOps.findById(req.user.id);
    const hasAccess = chapter.isFree || user?.hasPurchased;

    if (!hasAccess) {
      return res.status(403).json({ error: 'Purchase required' });
    }

    await progressOps.updateProgress(req.user.id, chapter.id, true);
    res.json({ success: true, message: 'Chapter marked as completed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get progress
app.get('/api/progress', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const progress = await progressOps.getProgress(req.user.id);
    const quizResults = await quizOps.getResults(req.user.id);
    res.json({ progress, quizResults });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============== QUIZ ROUTES ==============

app.get('/api/chapters/:id/quizzes', optionalAuth, async (req, res) => {
  await ensureDb();
  try {
    const chapter = chapters.find(c => c.id === req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    let hasPurchased = false;
    if (req.user) {
      const user = await userOps.findById(req.user.id);
      hasPurchased = user?.hasPurchased || false;
    }

    const hasAccess = chapter.isFree || hasPurchased;
    if (!hasAccess) {
      return res.status(403).json({ error: 'Purchase required to access quizzes' });
    }

    const chapterQuizzes = quizzes[req.params.id];
    if (!chapterQuizzes || chapterQuizzes.length === 0) {
      return res.json({ quizzes: [] });
    }

    const quizzesList = chapterQuizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questionCount: quiz.questions.length
    }));

    res.json({ quizzes: quizzesList });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/chapters/:chapterId/quizzes/:quizId', optionalAuth, async (req, res) => {
  await ensureDb();
  try {
    const chapter = chapters.find(c => c.id === req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    let hasPurchased = false;
    if (req.user) {
      const user = await userOps.findById(req.user.id);
      hasPurchased = user?.hasPurchased || false;
    }

    const hasAccess = chapter.isFree || hasPurchased;
    if (!hasAccess) {
      return res.status(403).json({ error: 'Purchase required to access quiz' });
    }

    const chapterQuizzes = quizzes[req.params.chapterId];
    if (!chapterQuizzes) {
      return res.status(404).json({ error: 'No quizzes found for this chapter' });
    }

    const quiz = chapterQuizzes.find(q => q.id === req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const quizWithoutAnswers = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      }))
    };

    res.json({ quiz: quizWithoutAnswers });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/chapters/:chapterId/quizzes/:quizId/check-answer', optionalAuth, async (req, res) => {
  await ensureDb();
  try {
    const chapter = chapters.find(c => c.id === req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    let hasPurchased = false;
    if (req.user) {
      const user = await userOps.findById(req.user.id);
      hasPurchased = user?.hasPurchased || false;
    }

    const hasAccess = chapter.isFree || hasPurchased;
    if (!hasAccess) {
      return res.status(403).json({ error: 'Purchase required' });
    }

    const chapterQuizzes = quizzes[req.params.chapterId];
    if (!chapterQuizzes) {
      return res.status(404).json({ error: 'No quizzes found' });
    }

    const quiz = chapterQuizzes.find(q => q.id === req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const { questionId, answer } = req.body;
    const question = quiz.questions.find(q => q.id === questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const isCorrect = answer === question.correctAnswer;

    res.json({
      questionId,
      userAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanations[answer]
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/chapters/:chapterId/quizzes/:quizId/save-result', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const { score, totalQuestions, answers } = req.body;

    await quizOps.saveResult(
      req.user.id,
      req.params.chapterId,
      req.params.quizId,
      score,
      totalQuestions,
      answers
    );

    res.json({ success: true, message: 'Quiz result saved' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============== PAYMENT ROUTES ==============

// Get Razorpay key for frontend
app.get('/api/payment/config', (req, res) => {
  res.json({
    keyId: process.env.RAZORPAY_KEY_ID || '',
    currency: course.currency,
    coursePrice: course.price
  });
});

app.post('/api/payment/validate-coupon', (req, res) => {
  const { code } = req.body;
  const coupon = coupons[code?.toUpperCase()];

  if (!coupon) {
    return res.status(400).json({ error: 'Invalid coupon code' });
  }

  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = Math.round(course.price * (coupon.discount / 100));
  } else {
    discount = coupon.discount;
  }

  const finalPrice = Math.max(0, course.price - discount);

  res.json({
    valid: true,
    discount,
    finalPrice,
    message: `Coupon applied! You save ₹${discount}`
  });
});

// Create Razorpay order
app.post('/api/payment/create-order', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const { couponCode } = req.body;
    const user = await userOps.findById(req.user.id);

    const existingPurchase = await purchaseOps.findByUserAndCourse(req.user.id, course.id);
    if (existingPurchase || user.hasPurchased) {
      return res.status(400).json({ error: 'You have already purchased this course' });
    }

    let finalPrice = course.price;
    let discount = 0;

    if (couponCode) {
      const coupon = coupons[couponCode.toUpperCase()];
      if (coupon) {
        if (coupon.type === 'percentage') {
          discount = Math.round(course.price * (coupon.discount / 100));
        } else {
          discount = coupon.discount;
        }
        finalPrice = Math.max(0, course.price - discount);
      }
    }

    const razorpayInstance = getRazorpay();
    
    if (razorpayInstance) {
      // Create Razorpay order
      const order = await razorpayInstance.orders.create({
        amount: finalPrice * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `receipt_${uuidv4().slice(0, 8)}`,
        notes: {
          userId: req.user.id,
          courseId: course.id,
          couponCode: couponCode?.toUpperCase() || ''
        }
      });

      res.json({
        orderId: order.id,
        amount: finalPrice,
        currency: 'INR',
        discount,
        couponCode: couponCode?.toUpperCase() || null,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        courseName: course.title,
        userEmail: user.email,
        userName: user.name,
        userMobile: user.mobile
      });
    } else {
      // Demo mode - no Razorpay configured
      const orderId = `order_demo_${uuidv4().replace(/-/g, '').slice(0, 16)}`;
      res.json({
        orderId,
        amount: finalPrice,
        currency: 'INR',
        discount,
        couponCode: couponCode?.toUpperCase() || null,
        demoMode: true,
        courseName: course.title
      });
    }
  } catch (error) {
    console.error('Payment order error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify Razorpay payment
app.post('/api/payment/verify', authenticate, async (req, res) => {
  await ensureDb();
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, couponCode, amount, discount, demoMode } = req.body;
    const user = await userOps.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingPurchase = await purchaseOps.findByUserAndCourse(req.user.id, course.id);
    if (existingPurchase || user.hasPurchased) {
      return res.status(400).json({ error: 'You have already purchased this course' });
    }

    // Verify signature if not demo mode
    if (!demoMode && process.env.RAZORPAY_KEY_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
      }
    }

    // Record purchase
    const purchaseId = uuidv4();
    await purchaseOps.create(
      purchaseId,
      user.id,
      course.id,
      razorpay_payment_id || `demo_${uuidv4().slice(0, 8)}`,
      amount || course.price,
      couponCode,
      discount || 0
    );

    res.json({
      success: true,
      message: 'Payment successful! You now have full access to the course.'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    if (error.message === 'Course already purchased') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Export for Vercel
module.exports = app;
