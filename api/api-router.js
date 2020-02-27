const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = router;
