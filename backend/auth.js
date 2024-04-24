const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, 'myscret');
        req.userData = await decoded;
        req.user = userData;
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}