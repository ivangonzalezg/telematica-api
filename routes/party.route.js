const router = require("express-promise-router")();
const party = require("../controllers/party.controller");

router.route("/").get(party.get);
router.route("/").post(party.post);

module.exports = router;
