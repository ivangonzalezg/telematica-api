const router = require("express-promise-router")();
const Voter = require("../controllers/voter.controller");

router.route("/").get(Voter.get);
router.route("/").post(Voter.post);
router.route("/").patch(Voter.patch);

module.exports = router;
