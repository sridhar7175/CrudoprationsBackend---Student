var express = require("express");
var router = express.Router();
var { createproduct } = require("../controllers/Example");

router.post("/createproduct", createproduct);

module.exports = router;
