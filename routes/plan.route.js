const router = require("express-promise-router")();
const documents = require("../controllers/documents.controller");

router.route("/:candidate").get(documents.get.plan);

module.exports = router;
