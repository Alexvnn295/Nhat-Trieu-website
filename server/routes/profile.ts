import { Router } from 'express';
import { db } from '../db';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/profile
router.get('/', (req, res) => {
  try {
    const profile = db.getProfile();
    res.json({ success: true, data: profile });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/profile
router.put('/', (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/profile/upload-photo
router.post('/upload-photo', (req, res) => {
  try {
    const { filename, base64Data, photoId } = req.body;
    if (!base64Data) {
      return res.status(400).json({ success: false, error: 'Dữ liệu ảnh base64 là bắt buộc' });
    }

    // Clean safe filename
    const safeFilename = (filename || `portrait_${Date.now()}.jpg`).replace(/[^a-zA-Z0-9_.-]/g, '_');
    const profileDir = path.join(process.cwd(), 'public', 'images', 'profile');
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }

    // Extract binary buffer from base64
    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Clean, 'base64');
    const filePath = path.join(profileDir, safeFilename);
    fs.writeFileSync(filePath, buffer);

    // Also copy to dist if dist exists
    const distProfileDir = path.join(process.cwd(), 'dist', 'images', 'profile');
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      if (!fs.existsSync(distProfileDir)) {
        fs.mkdirSync(distProfileDir, { recursive: true });
      }
      fs.writeFileSync(path.join(distProfileDir, safeFilename), buffer);
    }

    const versionedUrl = `/images/profile/${safeFilename}?v=${Date.now()}`;

    // Update profile in DB
    const currentProfile = db.getProfile();
    const existingList = currentProfile.personalPortraits || [];
    let found = false;

    const updatedPortraits = existingList.map((p: any) => {
      if (p.id === photoId || p.filename === safeFilename) {
        found = true;
        return {
          ...p,
          url: versionedUrl,
          fallbackUrl: versionedUrl,
          filename: safeFilename,
        };
      }
      return p;
    });

    if (!found && photoId) {
      updatedPortraits.push({
        id: photoId,
        filename: safeFilename,
        url: versionedUrl,
        fallbackUrl: versionedUrl,
        titleVi: `Ảnh chân dung tải lên (${safeFilename})`,
        titleEn: `Uploaded Executive Portrait (${safeFilename})`,
        poseVi: 'Hình ảnh chân dung do người dùng tải lên',
        poseEn: 'Custom executive portrait uploaded by user',
        badgeVi: 'Ảnh Đã Tải Lên',
        badgeEn: 'Uploaded Photo',
        descriptionVi: 'Ảnh chụp doanh nhân cập nhật từ thiết bị.',
        descriptionEn: 'Executive portrait uploaded from device.',
        isDefault: false,
      });
    }

    const updatedProfile = db.updateProfile({
      ...currentProfile,
      personalPortraits: updatedPortraits,
      avatarUrl: versionedUrl,
      activePhotoId: photoId || currentProfile.activePhotoId,
    });

    res.json({
      success: true,
      url: versionedUrl,
      filename: safeFilename,
      profile: updatedProfile,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
