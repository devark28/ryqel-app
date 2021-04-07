let express = require('express')
let router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Searched for: " + req.query.search_query + "</h1>");
});

module.exports = router;