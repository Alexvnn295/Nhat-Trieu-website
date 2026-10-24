import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/seo
router.get('/', (req, res) => {
  try {
    const seo = db.getSEO();
    res.json({ success: true, data: seo });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/seo
router.put('/', (req, res) => {
  try {
    const updated = db.updateSEO(req.body);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
