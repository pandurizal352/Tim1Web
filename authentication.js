const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET belum diset di .env');

module.exports = function auth(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid Authorization header format' });
        }

        const token = parts[1];

        // Verifikasi token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid token' });
            // Simpan payload user pada req.user untuk controller
            req.user = { id_user: decoded.id_user, email_institusi: decoded.email_institusi };
            next();
        });
    } catch (err) {
        next(err);
    }
};