import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/contacts - List all inquiries
router.get('/', (req, res) => {
  try {
    const { status } = req.query;
    let contacts = db.getContacts();

    if (status && typeof status === 'string') {
      contacts = contacts.filter((c) => c.status === status);
    }

    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/contacts - Submit a new inquiry
router.post('/', (req, res) => {
  try {
    const { name, email, phone, service, serviceLabel, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng điền họ tên, địa chỉ email và nội dung tin nhắn.',
      });
    }

    const newInquiry = db.createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      service: service || 'consultation',
      serviceLabel: serviceLabel || 'Tư vấn Chiến lược',
      message: message.trim(),
      source: source || 'contact_modal',
    });

    res.status(201).json({
      success: true,
      message: 'Yêu cầu tư vấn đã được tiếp nhận thành công. Chuyên gia sẽ phản hồi sớm nhất.',
      data: newInquiry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/contacts/:id - Update status / notes
router.patch('/:id', (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = db.updateContact(req.params.id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy yêu cầu tư vấn' });
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteContact(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy yêu cầu để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa yêu cầu thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
