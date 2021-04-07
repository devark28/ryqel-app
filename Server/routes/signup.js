let express = require('express');
let bcryptjs = require("bcryptjs");

let user_schema = require("../database/user_schema");

let router = express.Router();

router.get("/", (req, res) => {
    if (req.cookies.t_auth_val && req.cookies.user_token != undefined) {
        res.redirect("/logout?to=signup");
    }
    res.render("signup-page", {
        cssfile: "signup.css",
        jsfile: "signup.js",
        logged: req.cookies.t_auth_val && req.cookies.user_token != undefined
    });
});

router.post("/", async(req, res) => {
    let { username, email, password, confirm_password } = req.body;
    if (username && email && password && confirm_password && password == confirm_password) {
        let password_salt = await bcryptjs.genSalt(15);
        let user_salt = await bcryptjs.genSalt(5);
        let user_token = await bcryptjs.hash("<" + username + Date.now() + email + ">", user_salt);
        let data = new user_schema({
            username,
            email,
            password: await bcryptjs.hash(password, password_salt),
            user_token: user_token
        });

        user_schema.find({ username })
            .then(results => {
                if (results.length <= 0) {
                    data.save();
                    console.log("Saved a new User");
                    res.cookie("user_token", user_token);
                    res.clearCookie("t_auth_val");
                    res.redirect("/login");
                } else {
                    delete data;
                    res.json({ error: "Username already existed" });
                }
            });

    } else {
        res.json({ error: "Invalid Credentials" });
    }
});

module.exports = router;