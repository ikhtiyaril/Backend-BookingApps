const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Setting } = require('../models');

// Setup folder uploads jika belum ada
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Field upload
const cpUpload = upload.fields([
  { name: 'slide_0' }, { name: 'slide_1' }, { name: 'slide_2' },
  { name: 'qris_image', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]);

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    let setting = await Setting.findOne();

    if (!setting) {
      setting = await Setting.create({
        business_name: 'Nama Bisnis Default',
        description: 'Deskripsi Default',
        whatsapp_number: '',
        email: '',
        slide: [],
        qris_image: '',
        logo: '',
        note: '',
        address:''
      });
    }

    // Convert Sequelize instance to plain object
    const settingObj = setting.toJSON();

    // Tambahkan path relatif ke file
    settingObj.qris_image = setting.qris_image ? `/uploads/${setting.qris_image}` : null;
    settingObj.logo = setting.logo ? `/uploads/${setting.logo}` : null;
    settingObj.slide = (setting.slide || []).map(filename => `/uploads/${filename}`);

    res.json(settingObj);
  } catch (err) {
    console.error('Gagal ambil pengaturan:', err);
    res.status(500).json({ message: 'Gagal ambil pengaturan' });
  }
});

// PUT /api/settings
router.put('/', cpUpload, async (req, res) => {
  try {
    const {
      business_name,
      description,
      whatsapp_number,
      email, 
      note,
      address
    } = req.body;

    const slides = ['slide_0', 'slide_1', 'slide_2']
      .map(key => req.files[key]?.[0]?.filename)
      .filter(Boolean);

    const qris_image = req.files.qris_image?.[0]?.filename || null;
    const logo = req.files.logo?.[0]?.filename || null;

    const setting = await Setting.findOne();
    if (!setting) return res.status(404).json({ message: 'Pengaturan tidak ditemukan' });

    // Update field
    setting.business_name = business_name;
    setting.description = description;
    setting.whatsapp_number = whatsapp_number;
    setting.email = email;
    setting.note = note;
    setting.address = address;
  

    if (slides.length > 0) setting.slide = slides;
    if (qris_image) setting.qris_image = qris_image;
    if (logo) setting.logo = logo;

    await setting.save();

    res.status(200).json({
      message: 'Pengaturan berhasil diperbarui',
      data: setting.toJSON()
    });
  } catch (e) {
    console.error('Gagal mengedit pengaturan:', e);
    res.status(500).json({ message: 'Gagal mengedit pengaturan', error: e.message });
  }
});

module.exports = router;
