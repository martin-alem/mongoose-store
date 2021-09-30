const Product = require("./../model/Product");

function addProductController(req, res) {

    const data = req.body;
    if (validatePayload(data)) {
        const productData = { productName: data["name"], productPrice: data["price"], productImage: data["image"], productQty: data["quantity"] };
        Product.create(productData, (error, document) => {
            if (error) {
                res.redirect("/admin/add_product?error=An error has occurred");
            } else {
                res.redirect("/admin/add_product?error=Product added successfully");
            }
        });
    }
    else {
        res.redirect("/admin/add_product?error=Please provide all required fields");
    }
}

function editProductController(req, res) {
    const data = req.body;
    const id = req.body["id"];
    if (validatePayload(data)) {
        const productData = { productName: data["name"], productPrice: data["price"], productImage: data["image"], productQty: data["quantity"] };
        Product.findOneAndUpdate({ _id: id }, productData, { new: true }, (error, document) => {
            if (error) {
                res.redirect(`/admin/edit_product/${id}?error=An error has occurred`);
            } else {
                res.redirect(`/admin/edit_product/${id}?error=Product updated successfully`);
            }
        })
    }
    else {
        res.redirect("/admin/add_product?error=Please provide all required fields");
    }
}

function deleteProductController(req, res) {
    const id = req.params.id;
    Product.findOneAndDelete({ _id: id }, { new: true }, (error, document) => {
        if (error) {
            console.log(error)
            res.redirect(`/admin/dashboard`);
        } else {
            res.redirect(`/admin/dashboard`);
        }
    })
}

function addProductView(req, res) {
    res.status(200).render("add_product");
}

async function editProductView(req, res) {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id });
        res.status(200).render("edit_product", { product: product });
    } catch (error) {
        res.redirect("/admin/dashboard");
    }
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

module.exports = { addProductView, addProductController, editProductView, editProductController, deleteProductController };