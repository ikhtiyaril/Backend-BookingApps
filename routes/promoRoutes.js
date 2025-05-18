// routes/promoRouter.js
const express = require('express');
const router = express.Router();
const { Promo } = require('../models');

// ✅ Create promo
router.post('/', async (req, res) => {
  try {
    const promo = await Promo.create(req.body);
    res.status(201).json(promo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Get all promos
// 🔍 Get promos (semua atau berdasarkan kode)
router.get('/', async (req, res) => {
    const { code } = req.query;
  
    if (code) {
      try {
        const promo = await Promo.findOne({ where: { code } });
        if (!promo) {
          return res.status(404).json({ message: 'Promo tidak ditemukan' });
        }
        return res.json({
          discountPercent: promo.discountPercent,
          code: promo.code,
          description: promo.description
        });
      } catch (err) {
        console.error('Gagal ambil promo:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
      }
    }
  
    // Jika tidak ada query code, return semua promo
    try {
      const promos = await Promo.findAll();
      res.json(promos);
    } catch (err) {
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  });
  
  
// 📦 Get single promo
router.get('/:id', async (req, res) => {
  const promo = await Promo.findByPk(req.params.id);
  if (promo) res.json(promo);
  else res.status(404).json({ error: 'Promo not found' });
});

// ✏️ Update promo
router.put('/:id', async (req, res) => {
  const promo = await Promo.findByPk(req.params.id);
  if (promo) {
    await promo.update(req.body);
    res.json(promo);
  } else {
    res.status(404).json({ error: 'Promo not found' });
  }
});

// ❌ Delete promo
router.delete('/:id', async (req, res) => {
  const promo = await Promo.findByPk(req.params.id);
  if (promo) {
    await promo.destroy();
    res.json({ message: 'Promo deleted' });
  } else {
    res.status(404).json({ error: 'Promo not found' });
  }
});

module.exports = router;
