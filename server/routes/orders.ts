import { Router } from 'express';
import { db, OrderItem } from '../db';

const router = Router();

// GET /api/orders
router.get('/', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/orders - Place a new digital order or book request
router.post('/', (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      items,
      appliedCode,
      paymentMethod,
      notes,
    } = req.body;

    if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Tên khách hàng, email và danh sách sản phẩm là bắt buộc',
      });
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, it: OrderItem) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1),
      0
    );

    let discountAmount = 0;

    // Validate access code if provided
    if (appliedCode) {
      const val = db.verifyAccessCode(appliedCode);
      if (val.isValid && val.codeObj) {
        if (val.codeObj.type === 'full_access') {
          discountAmount = subtotal;
        } else if (val.codeObj.type === 'discount_percent' && val.codeObj.discountPercent) {
          discountAmount = (subtotal * val.codeObj.discountPercent) / 100;
        } else if (val.codeObj.type === 'discount_fixed' && val.codeObj.discountAmountUsd) {
          discountAmount = Math.min(subtotal, val.codeObj.discountAmountUsd);
        }
      }
    }

    const total = Math.max(0, subtotal - discountAmount);
    const effectivePaymentMethod = total === 0 ? 'free_access' : (paymentMethod || 'bank_transfer');
    const paymentStatus = total === 0 ? 'completed' : 'pending';

    const order = db.createOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone ? customerPhone.trim() : undefined,
      items,
      subtotal,
      discountAmount,
      appliedCode: appliedCode ? appliedCode.trim().toUpperCase() : undefined,
      total,
      paymentMethod: effectivePaymentMethod,
      paymentStatus,
      notes: notes ? notes.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      message:
        total === 0
          ? 'Đơn hàng được kích hoạt miễn phí thành công!'
          : 'Đơn hàng đã tạo thành công. Vui lòng thanh toán theo thông tin hướng dẫn.',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/orders/:id/status - Update payment status
router.patch('/:id/status', (req, res) => {
  try {
    const { paymentStatus, notes } = req.body;
    if (!paymentStatus) {
      return res.status(400).json({ success: false, error: 'Trạng thái thanh toán là bắt buộc' });
    }

    const updated = db.updateOrderStatus(req.params.id, paymentStatus, notes);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy đơn hàng' });
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
