const router = require("express-promise-router")();
const vote = require("../controllers/vote.controller");

router.route("/").get(vote.get);
router.route("/").post(vote.post);

module.exports = router;
