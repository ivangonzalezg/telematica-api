const router = require("express-promise-router")();
const candidate = require("../controllers/candidate.controller");

router.route("/").get(candidate.get);
router.route("/").post(candidate.post);
router.route("/").patch(candidate.patch);

module.exports = router;
