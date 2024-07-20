const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
}

if (!token) {
    return res.status(401).json({error: 'Não autorizado'})
}

try {
    const decored = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
} catch (error) {
    res.status(401).json({ error: 'Não autorizado'})
}

module.exports = {authMiddleware};