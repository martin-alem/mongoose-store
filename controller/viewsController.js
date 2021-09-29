function homeController(req, res){
    const data = {"auth": false, "type": "user"}
    res.status(200).render("index", {currentUser: data});
}

module.exports = {homeController};