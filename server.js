require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const speakersRouter = require('./routes/speakers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы с фронтенда
app.use(express.json()); // Учим сервер читать JSON из тела запроса

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Подключение маршрутов
app.use('/api/speakers', speakersRouter);

// Базовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('API для IT-конференции работает!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});