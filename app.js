require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const surveyRoutes = require('./routes/survey.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 1434;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});