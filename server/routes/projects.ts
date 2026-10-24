import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/projects
router.get('/', (req, res) => {
  try {
    let projects = db.getProjects();
    const { category, search, featured } = req.query;

    if (category && typeof category === 'string' && category !== 'Tất cả' && category !== 'All') {
      projects = projects.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      projects = projects.filter((p) => p.featured);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  try {
    const project = db.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy dự án' });
    }
    res.json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/projects
router.post('/', (req, res) => {
  try {
    const { title, badge, category, excerpt, description, techStack, image } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Tiêu đề, phân loại và mô tả dự án là bắt buộc' });
    }

    const newProject = db.createProject({
      title,
      badge: badge || 'Dự án Tiêu biểu',
      category,
      excerpt: excerpt || description.substring(0, 150) + '...',
      description,
      image: image || '/images/profile/GRU02108.JPG?v=4',
      imageAlt: req.body.imageAlt || title,
      highlights: req.body.highlights || [],
      techStack: Array.isArray(techStack) ? techStack : [],
      metrics: req.body.metrics || [],
      featured: Boolean(req.body.featured),
      articleUrl: req.body.articleUrl,
      videoUrl: req.body.videoUrl,
      pressSource: req.body.pressSource,
      pressTitle: req.body.pressTitle,
      pressLinks: req.body.pressLinks || [],
    });

    res.status(201).json({ success: true, data: newProject });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/projects/:id
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy dự án để cập nhật' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy dự án để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa dự án thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
