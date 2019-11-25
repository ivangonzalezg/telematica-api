const router = require("express-promise-router")();
const candidate = require("../controllers/candidate.controller");

router.route("/").get(candidate.get);
router.route("/").post(candidate.post);
router.route("/").patch(candidate.patch);
router.route("/").delete(candidate.delete);

module.exports = router;
