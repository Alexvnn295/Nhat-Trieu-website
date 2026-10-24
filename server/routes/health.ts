import { Router } from 'express';
import { db } from '../db';

const router = Router();
const startTime = Date.now();

// GET /api/health
router.get('/', (req, res) => {
  try {
    const stats = db.getStats();
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

    res.json({
      status: 'ok',
      service: 'Cao Nguyen Nhat Trieu Executive Platform API',
      version: '2.0.0',
      nodeEnv: process.env.NODE_ENV || 'development',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      uptimeSeconds,
      timestamp: new Date().toISOString(),
      stats,
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
