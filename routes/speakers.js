const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speaker');

// 1. GET /api/speakers — Получить всех спикеров
router.get('/', async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// 2. GET /api/speakers/:id — Получить одного спикера по ID
router.get('/:id', async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) {
      return res.status(404).json({ message: 'Спикер не найден' });
    }
    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера или неверный ID', error: error.message });
  }
});

// 3. POST /api/speakers — Создать нового спикера
router.post('/', async (req, res) => {
  try {
    const { name, topic, photoUrl } = req.body;
    const newSpeaker = new Speaker({ name, topic, photoUrl });
    const savedSpeaker = await newSpeaker.save();
    res.status(201).json(savedSpeaker);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка валидации данных', error: error.message });
  }
});

// 4. PUT /api/speakers/:id — Обновить спикера
router.put('/:id', async (req, res) => {
  try {
    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // вернуть обновленный объект и проверить валидацию
    );
    if (!updatedSpeaker) {
      return res.status(404).json({ message: 'Спикер не найден' });
    }
    res.status(200).json(updatedSpeaker);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении', error: error.message });
  }
});

// 5. DELETE /api/speakers/:id — Удалить спикера
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!deletedSpeaker) {
      return res.status(404).json({ message: 'Спикер не найден' });
    }
    res.status(200).json({ message: 'Спикер успешно удален', speaker: deletedSpeaker });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error: error.message });
  }
});

module.exports = router;