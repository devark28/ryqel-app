let express = require('express')
let router = express.Router();

router.get("/", (req, res) => {
    res.render("home-page", {
        cssfile: "home.css",
        jsfile: "home.js",
        logged: req.cookies.t_auth_val && req.cookies.user_token != undefined
    });
});

module.exports = router;