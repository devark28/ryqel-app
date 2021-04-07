let express = require('express');

let user_schema = require("../database/user_schema");

let router = express.Router();

router.get("/", (req, res) => {
    if (req.cookies.t_auth_val && req.cookies.user_token != undefined) {
        user_schema.find({ user_token: req.cookies.user_token }, { username: 1, _id: 0 })
            .then(results => {
                // console.log(results);
                if (results.length <= 0) {
                    res.json({ error: "User not found" });
                } else if (results.length > 1) {
                    console.error("More than one users have the same token");
                } else {
                    if (results[0].username) {
                        res.render("message-page", {
                            cssfile: "message.css",
                            jsfile: "message.js",
                            logged: req.cookies.t_auth_val && req.cookies.user_token != undefined,
                            user_name: results[0].username
                        });
                    }

                }
            }).catch((error) => {
                console.error("---No user token available---\n---" + error + "---");
                res.clearCookie("user_token").redirect("/login");
            });
    } else {
        res.redirect("/login");
    }
});

// router.post("/", (req, res) => {
//     if (req.body.pass == "qwerty") {
//         res.render("message-page", {
//             cssfile: "message.css",
//             jsfile: "message.js",
//             user_name: req.body.email,
//             logged: req.cookies.t_auth_val && req.cookies.user_token != undefined
//         });
//     } else {
//         res.json({ message: "Invalid Credentials" });
//     }
// });

module.exports = router;