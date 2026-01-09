// Turso Cloud Database Module - For Vercel deployment
const { createClient } = require('@libsql/client');

let db = null;

function getDatabase() {
  if (!db) {
    // For local development, use a local SQLite file via libsql
    // For production (Vercel), use Turso cloud database
    if (process.env.TURSO_DATABASE_URL) {
      db = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
      });
    } else {
      // Local development fallback
      db = createClient({
        url: 'file:./server/elearning.db'
      });
    }
  }
  return db;
}

async function initDatabase() {
  const database = getDatabase();

  // Create users table
  await database.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      mobile TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      has_purchased INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Create purchases table
  await database.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      payment_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      coupon_code TEXT,
      discount INTEGER DEFAULT 0,
      purchased_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, course_id)
    )
  `);

  // Create course_progress table
  await database.execute(`
    CREATE TABLE IF NOT EXISTS course_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      last_accessed TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, chapter_id)
    )
  `);

  // Create quiz_results table
  await database.execute(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      quiz_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      answers TEXT,
      completed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('✅ Database tables initialized');
}

// User operations
const userOps = {
  async findByEmail(email) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email.toLowerCase()]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      mobile: row.mobile,
      password: row.password,
      hasPurchased: row.has_purchased === 1,
      createdAt: row.created_at
    };
  },

  async findByMobile(mobile) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM users WHERE mobile = ?',
      args: [mobile]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      mobile: row.mobile,
      password: row.password,
      hasPurchased: row.has_purchased === 1,
      createdAt: row.created_at
    };
  },

  async findById(id) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      mobile: row.mobile,
      password: row.password,
      hasPurchased: row.has_purchased === 1,
      createdAt: row.created_at
    };
  },

  async create(id, name, email, mobile, hashedPassword) {
    const database = getDatabase();
    try {
      await database.execute({
        sql: 'INSERT INTO users (id, name, email, mobile, password) VALUES (?, ?, ?, ?, ?)',
        args: [id, name, email.toLowerCase(), mobile, hashedPassword]
      });
      return { id, name, email: email.toLowerCase(), mobile, hasPurchased: false };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        if (error.message.includes('email')) {
          throw new Error('Email already registered');
        }
        if (error.message.includes('mobile')) {
          throw new Error('Mobile number already registered');
        }
      }
      throw error;
    }
  },

  async updatePurchaseStatus(userId, hasPurchased) {
    const database = getDatabase();
    await database.execute({
      sql: 'UPDATE users SET has_purchased = ? WHERE id = ?',
      args: [hasPurchased ? 1 : 0, userId]
    });
  }
};

// Purchase operations
const purchaseOps = {
  async findByUserAndCourse(userId, courseId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM purchases WHERE user_id = ? AND course_id = ?',
      args: [userId, courseId]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      paymentId: row.payment_id,
      amount: row.amount,
      couponCode: row.coupon_code,
      discount: row.discount,
      purchasedAt: row.purchased_at
    };
  },

  async create(id, userId, courseId, paymentId, amount, couponCode, discount) {
    const database = getDatabase();
    
    // Check for duplicate purchase
    const existing = await this.findByUserAndCourse(userId, courseId);
    if (existing) {
      throw new Error('Course already purchased');
    }

    await database.execute({
      sql: `INSERT INTO purchases (id, user_id, course_id, payment_id, amount, coupon_code, discount) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [id, userId, courseId, paymentId, amount, couponCode || null, discount || 0]
    });

    // Update user's purchase status
    await userOps.updatePurchaseStatus(userId, true);

    return { id, userId, courseId, paymentId, amount };
  },

  async getByUser(userId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM purchases WHERE user_id = ?',
      args: [userId]
    });
    return result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      paymentId: row.payment_id,
      amount: row.amount,
      couponCode: row.coupon_code,
      discount: row.discount,
      purchasedAt: row.purchased_at
    }));
  }
};

// Progress operations
const progressOps = {
  async updateProgress(userId, chapterId, completed = false) {
    const database = getDatabase();
    
    // Check if progress exists
    const existing = await database.execute({
      sql: 'SELECT id FROM course_progress WHERE user_id = ? AND chapter_id = ?',
      args: [userId, chapterId]
    });

    if (existing.rows.length > 0) {
      await database.execute({
        sql: 'UPDATE course_progress SET completed = ?, last_accessed = datetime("now") WHERE user_id = ? AND chapter_id = ?',
        args: [completed ? 1 : 0, userId, chapterId]
      });
    } else {
      await database.execute({
        sql: 'INSERT INTO course_progress (user_id, chapter_id, completed) VALUES (?, ?, ?)',
        args: [userId, chapterId, completed ? 1 : 0]
      });
    }
  },

  async getProgress(userId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT chapter_id, completed, last_accessed FROM course_progress WHERE user_id = ?',
      args: [userId]
    });
    return result.rows.map(row => ({
      chapterId: row.chapter_id,
      completed: row.completed === 1,
      lastAccessed: row.last_accessed
    }));
  },

  async getChapterProgress(userId, chapterId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM course_progress WHERE user_id = ? AND chapter_id = ?',
      args: [userId, chapterId]
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      chapterId: row.chapter_id,
      completed: row.completed === 1,
      lastAccessed: row.last_accessed
    };
  }
};

// Quiz results operations
const quizOps = {
  async saveResult(userId, chapterId, quizId, score, totalQuestions, answers) {
    const database = getDatabase();
    await database.execute({
      sql: `INSERT INTO quiz_results (user_id, chapter_id, quiz_id, score, total_questions, answers)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [userId, chapterId, quizId, score, totalQuestions, JSON.stringify(answers || {})]
    });
  },

  async getResults(userId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: 'SELECT * FROM quiz_results WHERE user_id = ? ORDER BY completed_at DESC',
      args: [userId]
    });
    return result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      chapterId: row.chapter_id,
      quizId: row.quiz_id,
      score: row.score,
      totalQuestions: row.total_questions,
      completedAt: row.completed_at
    }));
  },

  async getBestScore(userId, chapterId, quizId) {
    const database = getDatabase();
    const result = await database.execute({
      sql: `SELECT MAX(score) as best_score, total_questions 
            FROM quiz_results 
            WHERE user_id = ? AND chapter_id = ? AND quiz_id = ?`,
      args: [userId, chapterId, quizId]
    });
    if (result.rows.length === 0 || result.rows[0].best_score === null) return null;
    return {
      bestScore: result.rows[0].best_score,
      totalQuestions: result.rows[0].total_questions
    };
  }
};

module.exports = {
  initDatabase,
  getDatabase,
  userOps,
  purchaseOps,
  progressOps,
  quizOps
};
