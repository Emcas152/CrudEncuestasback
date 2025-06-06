const express = require('express');
const router = express.Router();
const { 
    createSurvey, 
    getSurveys, 
    getSurveyById,
    getSurveyCount, 
    updateSurvey, 
    deleteSurvey 
} = require('../controllers/survey.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, createSurvey);
router.get('/', authMiddleware, getSurveys);
router.get('/:id', authMiddleware, getSurveyById);
router.get('/count', authMiddleware, getSurveyCount);
router.put('/:id', authMiddleware, updateSurvey);
router.delete('/:id', authMiddleware, deleteSurvey);

module.exports = router;