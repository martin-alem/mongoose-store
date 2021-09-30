const Product = require("./../model/Product");

async function homeController(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).render("index", { products: products });
    } catch (error) {
        res.status(404).redirect("/error");
    }
}

async function productDetailController(req, res) {
    const id = req.params.id;
    try {
        const product = await Product.findOne({_id: id});
        res.status(200).render("product_detail", { product: product });
    } catch (error) {
        res.status(404).redirect("/");
    }
}

module.exports = {homeController, productDetailController};