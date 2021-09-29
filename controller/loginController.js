function loginController(req, res){
    res.json({});
}


function loginViewController(req, res){
    res.status(200).render('login');
}

module.exports = {loginViewController, loginController};