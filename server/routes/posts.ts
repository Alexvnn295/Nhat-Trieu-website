import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/posts - Get all posts with optional filtering
router.get('/', (req, res) => {
  try {
    let posts = db.getPosts();
    const { category, search, tag } = req.query;

    if (category && typeof category === 'string' && category !== 'Tất cả' && category !== 'All') {
      posts = posts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag && typeof tag === 'string') {
      posts = posts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: posts.length, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/posts/:id - Get single post by id or slug
router.get('/:id', (req, res) => {
  try {
    const post = db.getPost(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy bài viết' });
    }
    res.json({ success: true, data: post });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/posts - Create new post
router.post('/', (req, res) => {
  try {
    const { title, category, excerpt, content, readTime, tags, image, imageAlt, author } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ success: false, error: 'Tiêu đề, chuyên mục và nội dung là bắt buộc' });
    }

    const newPost = db.createPost({
      title,
      category,
      date: req.body.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }),
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      readTime: readTime || '5 phút đọc',
      tags: Array.isArray(tags) ? tags : [],
      image: image || '/images/profile/GRU02101.JPG?v=3',
      imageAlt: imageAlt || title,
      author: author || 'Cao Nguyễn Nhật Triều',
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/posts/:id - Update existing post
router.put('/:id', (req, res) => {
  try {
    const updated = db.updatePost(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy bài viết để cập nhật' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy bài viết để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa bài viết thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
