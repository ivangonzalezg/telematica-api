const router = require("express-promise-router")();
const Place = require("../controllers/place.controller");

router.route("/").get(Place.get);
router.route("/").post(Place.post);
router.route("/").patch(Place.patch);
router.route("/").delete(Place.delete);

module.exports = router;
