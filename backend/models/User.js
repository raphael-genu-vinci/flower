const db = require('../data/db_conf');

module.exports.createUser = async (user) => {
    try {
        const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        stmt.run(user.name, user.email, user.password);
    } catch (error) {
        console.log(" Error creating user: " + error);
        return error;
    }
};

module.exports.getUserByEmail = async (email) => {
    try {
        return db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    } catch (error) {
        return error;
    }
}