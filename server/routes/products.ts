import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/products
router.get('/', (req, res) => {
  try {
    let products = db.getProducts();
    const { category, search } = req.query;

    if (category && typeof category === 'string' && category !== 'Tất cả' && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const product = db.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm' });
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/products
router.post('/', (req, res) => {
  try {
    const { title, category, price, description, fullDetails, features, image } = req.body;
    if (!title || !category || price === undefined) {
      return res.status(400).json({ success: false, error: 'Tiêu đề, phân loại và giá sản phẩm là bắt buộc' });
    }

    const newProduct = db.createProduct({
      title,
      category,
      price: Number(price) || 0,
      description: description || '',
      fullDetails: fullDetails || description || '',
      image: image || '/images/profile/GRU02108.JPG?v=3',
      imageAlt: req.body.imageAlt || title,
      rating: Number(req.body.rating) || 5.0,
      features: Array.isArray(features) ? features : [],
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm để cập nhật' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa sản phẩm thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
