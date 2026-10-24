import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Master default PIN (can be configured via ADMIN_PIN env variable)
const ADMIN_PIN = process.env.ADMIN_PIN || '1804';

// POST /api/admin/verify - Verify admin access PIN
router.post('/verify', (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin) {
      return res.status(400).json({ success: false, error: 'Vui lòng cung cấp mã PIN' });
    }

    if (pin.trim() === ADMIN_PIN) {
      return res.json({
        success: true,
        message: 'Xác thực quản trị viên thành công',
        authenticated: true,
        expiresIn: '24h',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Mã PIN không chính xác',
      authenticated: false,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/admin/stats - Overview metrics for dashboard
router.get('/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/admin/backup - Download complete database JSON snapshot
router.get('/backup', (req, res) => {
  try {
    const data = db.exportData();
    res.setHeader('Content-Disposition', `attachment; filename="cnd-backup-${new Date().toISOString().split('T')[0]}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/admin/restore - Restore database from JSON
router.post('/restore', (req, res) => {
  try {
    const backupData = req.body;
    if (!backupData || typeof backupData !== 'object') {
      return res.status(400).json({ success: false, error: 'Dữ liệu sao lưu không hợp lệ' });
    }

    db.importData(backupData);
    res.json({ success: true, message: 'Khôi phục dữ liệu hệ thống thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/admin/reset - Reset database to default seed state
router.post('/reset', (req, res) => {
  try {
    const resetData = db.resetToDefault();
    res.json({ success: true, message: 'Đã hoàn tác toàn bộ dữ liệu về trạng thái tiêu chuẩn ban đầu', data: resetData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
