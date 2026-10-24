import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/access-codes
router.get('/', (req, res) => {
  try {
    const codes = db.getAccessCodes();
    res.json({ success: true, count: codes.length, data: codes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/access-codes/verify - Validate an access/discount code
router.post('/verify', (req, res) => {
  try {
    const { code } = req.body;
    const result = db.verifyAccessCode(code);

    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        isValid: false,
        errorMessage: result.errorMessage,
      });
    }

    const c = result.codeObj!;
    res.json({
      success: true,
      isValid: true,
      code: c.code,
      type: c.type,
      scope: c.scope,
      discountPercent: c.discountPercent || 0,
      discountAmountUsd: c.discountAmountUsd || 0,
      isFullAccess: c.type === 'full_access',
      permissions: c.permissions || [],
      description: c.description,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/access-codes - Create new code
router.post('/', (req, res) => {
  try {
    const { code, description, type, discountPercent, discountAmountUsd, scope, validFrom, validUntil, hasExpiry, maxUsage, permissions, isActive, assignedTo, notes } = req.body;

    if (!code || !type) {
      return res.status(400).json({ success: false, error: 'Mã và loại quyền là bắt buộc' });
    }

    const created = db.createAccessCode({
      code,
      description: description || '',
      type,
      discountPercent: Number(discountPercent) || undefined,
      discountAmountUsd: Number(discountAmountUsd) || undefined,
      scope: scope || 'all',
      validFrom: validFrom || new Date().toISOString().split('T')[0],
      validUntil: validUntil || '',
      hasExpiry: Boolean(hasExpiry),
      maxUsage: Number(maxUsage) || 0,
      permissions: Array.isArray(permissions) ? permissions : [],
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      assignedTo: assignedTo || undefined,
      notes: notes || undefined,
    });

    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/access-codes/:id
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateAccessCode(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy mã truy cập' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/access-codes/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteAccessCode(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy mã để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa mã truy cập thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
