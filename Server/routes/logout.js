let express = require('express')
let router = express.Router();

router.get("/", (req, res) => {
    res.clearCookie("t_auth_val").redirect("/" + req.query.to);
});

module.exports = router;