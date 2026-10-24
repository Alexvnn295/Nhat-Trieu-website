import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/newsletter/subscribers
router.get('/subscribers', (req, res) => {
  try {
    const subscribers = db.getSubscribers();
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/newsletter/subscribe
router.post('/subscribe', (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp một địa chỉ email hợp lệ.',
      });
    }

    const { subscriber, isNew } = db.addSubscriber(email, source || 'website_footer');

    res.status(isNew ? 201 : 200).json({
      success: true,
      message: isNew
        ? 'Đăng ký nhận bản tin thành công! Bạn sẽ nhận được các báo cáo phân tích chiến lược mới nhất.'
        : 'Email này đã đăng ký trong hệ thống. Trạng thái đã được kích hoạt lại.',
      data: subscriber,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/newsletter/subscribers/:id
router.delete('/subscribers/:id', (req, res) => {
  try {
    const deleted = db.removeSubscriber(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy người đăng ký' });
    }
    res.json({ success: true, message: 'Đã hủy đăng ký thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
