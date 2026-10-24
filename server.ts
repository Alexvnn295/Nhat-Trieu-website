import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import API Routers
import healthRouter from './server/routes/health';
import postsRouter from './server/routes/posts';
import projectsRouter from './server/routes/projects';
import productsRouter from './server/routes/products';
import contactsRouter from './server/routes/contacts';
import newsletterRouter from './server/routes/newsletter';
import ordersRouter from './server/routes/orders';
import accessCodesRouter from './server/routes/accessCodes';
import profileRouter from './server/routes/profile';
import seoRouter from './server/routes/seo';
import aiRouter from './server/routes/ai';
import adminRouter from './server/routes/admin';
import marketingRouter from './server/routes/marketing';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON & URL-encoded request parsers
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Basic CORS & Security headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Request logger in dev
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Mount API Endpoints FIRST
  app.use('/api/health', healthRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/contacts', contactsRouter);
  app.use('/api/newsletter', newsletterRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/access-codes', accessCodesRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/seo', seoRouter);
  app.use('/api/ai', aiRouter);
  app.use('/api/marketing', marketingRouter);
  app.use('/api/admin', adminRouter);

  // Specialized route for profile portraits (supporting SVG & JPEG formats)
  app.get('/images/profile/:filename', (req, res, next) => {
    try {
      const filename = req.params.filename.split('?')[0];
      const baseName = path.basename(filename, path.extname(filename));
      const profileDir = path.join(process.cwd(), 'public', 'images', 'profile');

      const candidates = [
        path.join(profileDir, filename),
        path.join(profileDir, `${baseName}.svg`),
        path.join(profileDir, `${baseName}.JPG`),
        path.join(profileDir, `${baseName}.jpg`),
      ];

      for (const targetPath of candidates) {
        if (fs.existsSync(targetPath)) {
          const content = fs.readFileSync(targetPath);
          if (content.slice(0, 100).includes('<svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return res.send(content);
          }
          return res.sendFile(targetPath);
        }
      }
    } catch (e) {
      console.error('[Server] Profile image serve error:', e);
    }
    next();
  });

  // Static route for public assets directly
  const publicDir = path.join(process.cwd(), 'public');
  app.use(express.static(publicDir));

  // Vite Middleware (Development) or Static Bundle (Production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Server] Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Server] Serving production static files from dist/');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(` Cao Nguyen Nhat Trieu Executive Platform Backend `);
    console.log(` URL: http://0.0.0.0:${PORT}`);
    console.log(` API Health: http://0.0.0.0:${PORT}/api/health`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Gemini Configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
    console.log(`====================================================`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error on startup:', err);
  process.exit(1);
});
