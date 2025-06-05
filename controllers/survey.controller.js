const { pool, poolConnect, sql } = require('../config/db.config');

const createSurvey = async (req, res) => {
    const { name, address, phone, nationality, latitude, longitude } = req.body;
    
    try {
        await poolConnect;
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('address', sql.VarChar, address)
            .input('phone', sql.VarChar, phone)
            .input('nationality', sql.VarChar, nationality)
            .input('latitude', sql.Float, latitude)
            .input('longitude', sql.Float, longitude)
            .query(`INSERT INTO Surveys 
                    (name, address, phone, nationality, latitude, longitude) 
                    VALUES (@name, @address, @phone, @nationality, @latitude, @longitude)`);

        res.status(201).json({ message: 'Encuesta creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSurveys = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .query('SELECT * FROM Surveys');
        
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSurveyById = async (req, res) => {
    const { id } = req.params;
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Surveys WHERE id = @id');

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Encuesta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSurveyCount = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .query('SELECT COUNT(*) AS total FROM Surveys');
        
        res.status(200).json({ total: result.recordset[0].total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSurvey = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, nationality, latitude, longitude } = req.body;

    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('address', sql.VarChar, address)
            .input('phone', sql.VarChar, phone)
            .input('nationality', sql.VarChar, nationality)
            .input('latitude', sql.Float, latitude)
            .input('longitude', sql.Float, longitude)
            .query(`UPDATE Surveys 
                    SET name = @name, address = @address, phone = @phone, 
                        nationality = @nationality, latitude = @latitude, longitude = @longitude 
                    WHERE id = @id`);
        
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Encuesta actualizada exitosamente' });
        } else {
            res.status(404).json({ message: 'Encuesta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSurvey = async (req, res) => {
    const { id } = req.params;

    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Surveys WHERE id = @id');
        
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Encuesta eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Encuesta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSurvey,
    getSurveys,
    getSurveyById,
    getSurveyCount,
    updateSurvey,
    deleteSurvey
};

module.exports = {
    createSurvey,
    getSurveys,
    getSurveyById,
    getSurveyCount,
    updateSurvey,
    deleteSurvey
};