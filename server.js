const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_PATH = path.join(__dirname, 'content.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin123';

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Route for /admin -> serves admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOADS_DIR));

// API 1: Get Content
app.get('/api/content', (req, res) => {
  try {
    const data = fs.readFileSync(CONTENT_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read content file' });
  }
});

// API 2: Save Content
app.post('/api/content', (req, res) => {
  try {
    const newContent = req.body;
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(newContent, null, 2), 'utf8');
    res.json({ success: true, message: 'Content saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// API 3: Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: imageUrl });
});

// API 4: Admin Password Auth
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-authenticated-token' });
  } else {
    res.status(401).json({ error: 'Incorrect Admin Password' });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Redemption Muay Thai Site Running!`);
  console.log(`👉 Visitor Site: http://localhost:${PORT}`);
  console.log(`✏️ Admin Portal:  http://localhost:${PORT}/admin`);
  console.log(`🔑 Password Env: VITE_ADMIN_PASSWORD`);
  console.log(`==================================================`);
});
