function signupController(req, res){
    res.status(201).json({
        "status": "success",
        "statusCode": 201,
        "message": "user created",
        "data": req.body
    });
}

function signupViewController(req, res){
    res.status(200).render('signup');
}

module.exports = {signupViewController, signupController};