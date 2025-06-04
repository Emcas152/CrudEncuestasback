const jwt = require('jsonwebtoken');
const sql = require('mssql');
const bcrypt = require('bcrypt'); 
const { pool, poolConnect } = require('../config/db.config');

const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        await poolConnect;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const username = user.username;
                const email = user.email;

                // Generar un token JWT
                const token = jwt.sign(
                    { username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                res.json({ user: { username, email }, token: `Bearer ${token}` });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(401).json({ message: 'usuario no valido' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        await poolConnect;

        // Verificar si el usuario ya existe
        const userExists = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (userExists.recordset.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword) // Almacena la contraseña encriptada
            .query('INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)');

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login, register };