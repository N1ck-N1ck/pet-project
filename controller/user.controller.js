const db = require('../db');

class UserController {
    async createUser(req, res) {
        const { email, password } = req.body;
        const newPerson = await db.query('INSERT INTO user_data (email, password) values ($1, $2) RETURNING *', [email, password]);
        res.json(newPerson.rows)
    }
}

module.exports = new UserController();