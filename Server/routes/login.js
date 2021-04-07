let express = require('express');
let bcryptjs = require("bcryptjs");

let user_schema = require("../database/user_schema");

let router = express.Router();

router.get("/", (req, res) => {
    if (req.cookies.t_auth_val && req.cookies.user_token != undefined) {
        res.redirect("/logout?to=login");
    } else if (!req.cookies.t_auth_val && req.cookies.user_token != undefined) {
        user_schema.find({ user_token: req.cookies.user_token }, { username: 1, _id: 0 })
            .then(results => {
                // console.log(results);
                if (results.length <= 0) {
                    res.json({ error: "User not found" });
                } else if (results.length > 1) {
                    console.error("More than one users have the same token");
                } else {
                    if (results[0].username) {
                        res.render("login-page", {
                            cssfile: "login.css",
                            jsfile: "login.js",
                            logged: req.cookies.t_auth_val && req.cookies.user_token != undefined,
                            user_name: results[0].username
                        });
                    }

                }
            }).catch((error) => {
                console.error("---No user token available---\n---" + error + "---");
                res.clearCookie("user_token");
            });
    } else {
        res.render("login-page", {
            cssfile: "login.css",
            jsfile: "login.js",
            logged: req.cookies.t_auth_val && req.cookies.user_token != undefined
        });
    }
});

router.post("/", (req, res) => {
    let { username, password } = req.body;
    user_schema.find({ username }, { password: 1, user_token: 1, _id: 0 })
        .then(results => {
            if (results.length <= 0) {
                // res.json({ error: "Username not found" });
                res.redirect("/signup");
            } else if (results.length > 1) {
                console.error("More than one users have the same username");
            } else {
                if (bcryptjs.compare(password, results[0].password)) {
                    // t_auth_val: teta authantication value
                    res.cookie("t_auth_val", true).cookie("user_token", results[0].user_token);
                    res.redirect("/message");
                } else {
                    res.json({ error: "Forgot password" });
                }
            }
        }).catch((error) => {
            console.error("---No user available---\n---" + error + "---");
        });
});

module.exports = router;