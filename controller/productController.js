const Product = require("./../model/Product");

function addProductController(req, res) {

    const data = req.body;
    if (validatePayload(data)) {
        const productData = { productName: data["name"], productPrice: data["price"], productImage: data["image"], productQty: data["quantity"] };
        Product.create(productData, (error, document) => {
            if (error) {
                res.redirect("/add_product?error=An error has occurred");
            } else {
                res.redirect("/add_product?error=Product added successfully");
            }
        });
    }
    else {
        res.redirect("/add_product?error=Please provide all required fields");
    }
}

function addProductView(req, res) {
    res.status(200).render("add_product");
}

function validatePayload(payload) {
    if (Object.keys(payload).length > 0) {
        if (payload["name"] && payload["price"] && payload["image"] && payload["quantity"]) {
            if (payload["name"] !== "" && payload["image"] !== "" && payload["price"] !== "" && payload["quantity"] !== "") {
                return true;
            }
        }
    }

    return false;
}

module.exports = { addProductView, addProductController };