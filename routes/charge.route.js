const router = require("express-promise-router")();
const charge = require("../controllers/charge.controller");

router.route("/").get(charge.get);
router.route("/").post(charge.post);
router.route("/").delete(charge.delete);
router.route("/").patch(charge.patch);

module.exports = router;
