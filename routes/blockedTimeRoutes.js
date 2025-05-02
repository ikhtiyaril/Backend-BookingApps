const express = require('express');
const router = express.Router();
const { BlockedTime } = require('../models');

// GET all blocked time
router.get("/", async (req, res) => {
  try {
    const blockTime = await BlockedTime.findAll();
    res.json(blockTime);
  } catch (e) {
    console.error(`Gagal Mengambil data : ${e}`);
    res.status(500).json({ error: 'Gagal mengambil data blocked time' });
  }
});

// POST new blocked time
router.post("/", async (req, res) => {
  try {
    const blockTime = await BlockedTime.create(req.body);
    res.status(201).json(blockTime);
  } catch (e) {
    console.error(`Gagal Mengupload Data : ${e}`);
    res.status(400).json({ error: 'Data tidak valid atau gagal disimpan' });
  }
});

// DELETE blocked time by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blockTime = await BlockedTime.findByPk(id);

    if (!blockTime) {
      return res.status(404).json({ error: 'Blocked time tidak ditemukan' });
    }

    await blockTime.destroy();
    res.json({ message: 'Blocked time berhasil dihapus' });
  } catch (e) {
    console.error(`Data Gagal Dihapus : ${e}`);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus' });
  }
});

module.exports = router;
