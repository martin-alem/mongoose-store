const Product = require("./../model/Product");

function addProductController(req, res) {
    res.json(req.body);
}

function addProductView(req, res) {
    res.status(200).render("add_product");
}

module.exports = { addProductView, addProductController };