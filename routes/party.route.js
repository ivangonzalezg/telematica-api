const router = require("express-promise-router")();
const party = require("../controllers/party.controller");

router.route("/").get(party.get);
router.route("/").post(party.post);
router.route("/").delete(party.delete);
router.route("/").patch(party.patch);

module.exports = router;
