const db = require('../db');

class ProductController {
    async getProduct(req, res) {
        const {id} = req.params;
        const showProduct = await db.query('SELECT * FROM scooters WHERE id = $1', [id]);
        res.json(showProduct.rows[0]);
    }
}

module.exports = new ProductController();





