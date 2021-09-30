const Product = require("./../model/Product");

function createOrderController(req, res) {
    const id = req.params.id;
    let quantity = parseInt(req.body["qty"]);
    quantity -= 1;
    const productData = { "productQty": quantity };
    Product.findOneAndUpdate({ _id: id }, productData, { new: true }, (error, document) => {
        if (error) {
            res.redirect(`/product_detail/${id}?error=An error has occurred`);
        } else {
            res.redirect(`/product_detail/${id}?error=Product purchased successfully`);
        }
    });
}

module.exports = { createOrderController};