import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/marketing - Fetch all marketing configurations, UTM links, campaigns, and banner
router.get('/', (req, res) => {
  try {
    const promoBanner = db.getPromoBanner();
    const utmLinks = db.getUTMLinks();
    const campaigns = db.getCampaigns();
    const leadMagnets = db.getLeadMagnets();
    const subscribers = db.getSubscribers();

    res.json({
      success: true,
      data: {
        promoBanner,
        utmLinks,
        campaigns,
        leadMagnets,
        subscribersCount: subscribers.filter((s) => s.active).length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/marketing/promo-banner
router.get('/promo-banner', (req, res) => {
  try {
    const banner = db.getPromoBanner();
    res.json({ success: true, data: banner });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/marketing/promo-banner
router.put('/promo-banner', (req, res) => {
  try {
    const updated = db.updatePromoBanner(req.body);
    res.json({
      success: true,
      message: 'Cập nhật thanh thông báo quảng bá thành công',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- UTM CAMPAIGN LINKS ---
// GET /api/marketing/utm-links
router.get('/utm-links', (req, res) => {
  try {
    const links = db.getUTMLinks();
    res.json({ success: true, count: links.length, data: links });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/marketing/utm-links
router.post('/utm-links', (req, res) => {
  try {
    const { title, targetUrl, channel, utmSource, utmMedium, utmCampaign, utmContent, fullUrl, notes } = req.body;
    if (!title || !targetUrl || !utmSource || !utmMedium || !utmCampaign) {
      return res.status(400).json({
        success: false,
        error: 'Tiêu đề, URL đích, UTM Source, Medium và Campaign là bắt buộc',
      });
    }

    const created = db.createUTMLink({
      title: title.trim(),
      targetUrl: targetUrl.trim(),
      channel: channel || 'linkedin',
      utmSource: utmSource.trim(),
      utmMedium: utmMedium.trim(),
      utmCampaign: utmCampaign.trim(),
      utmContent: utmContent ? utmContent.trim() : undefined,
      fullUrl: fullUrl ? fullUrl.trim() : targetUrl.trim(),
      notes: notes ? notes.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Tạo liên kết chiến dịch UTM thành công',
      data: created,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/marketing/utm-links/:id
router.put('/utm-links/:id', (req, res) => {
  try {
    const updated = db.updateUTMLink(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy liên kết UTM' });
    }
    res.json({ success: true, message: 'Cập nhật liên kết UTM thành công', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/marketing/utm-links/:id
router.delete('/utm-links/:id', (req, res) => {
  try {
    const deleted = db.deleteUTMLink(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy liên kết UTM' });
    }
    res.json({ success: true, message: 'Đã xóa liên kết chiến dịch UTM' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/marketing/utm-links/:id/click - Track click
router.post('/utm-links/:id/click', (req, res) => {
  try {
    const tracked = db.recordUTMClick(req.params.id);
    res.json({ success: tracked });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- BROADCAST CAMPAIGNS ---
// GET /api/marketing/campaigns
router.get('/campaigns', (req, res) => {
  try {
    const campaigns = db.getCampaigns();
    res.json({ success: true, count: campaigns.length, data: campaigns });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/marketing/campaigns - Send/Schedule broadcast newsletter
router.post('/campaigns', (req, res) => {
  try {
    const { subject, previewText, targetSegment, contentMarkdown, status } = req.body;
    if (!subject || !contentMarkdown) {
      return res.status(400).json({
        success: false,
        error: 'Tiêu đề và nội dung chiến dịch là bắt buộc',
      });
    }

    const subscribers = db.getSubscribers().filter((s) => s.active);
    const recipientsCount = subscribers.length;

    const created = db.createCampaign({
      subject: subject.trim(),
      previewText: previewText ? previewText.trim() : subject.slice(0, 80),
      targetSegment: targetSegment || 'all',
      contentMarkdown: contentMarkdown.trim(),
      status: status || 'sent',
      sentAt: status === 'draft' ? undefined : new Date().toISOString(),
      recipientsCount: recipientsCount > 0 ? recipientsCount : 1,
      openRateEstimated: Number((45 + Math.random() * 15).toFixed(1)),
      clickRateEstimated: Number((12 + Math.random() * 10).toFixed(1)),
    });

    res.status(201).json({
      success: true,
      message:
        status === 'draft'
          ? 'Đã lưu bản nháp chiến dịch thành công'
          : `Chiến dịch đã được phát lệnh gửi tới ${created.recipientsCount} người đăng ký hoạt động!`,
      data: created,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- LEAD MAGNETS ---
// GET /api/marketing/lead-magnets
router.get('/lead-magnets', (req, res) => {
  try {
    const leadMagnets = db.getLeadMagnets();
    res.json({ success: true, data: leadMagnets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/marketing/lead-magnets/:id
router.put('/lead-magnets/:id', (req, res) => {
  try {
    const updated = db.updateLeadMagnet(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài liệu phễu' });
    }
    res.json({ success: true, message: 'Cập nhật tài liệu phễu thành công', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/marketing/lead-magnets/:id/download
router.post('/lead-magnets/:id/download', (req, res) => {
  try {
    const tracked = db.recordLeadDownload(req.params.id);
    res.json({ success: tracked, message: 'Ghi nhận lượt tải thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
