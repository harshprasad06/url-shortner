const express = require("express");
const {
  handleGenerateNewShortURL,
  handleUrlRedirection,
  handleGetAnalytics,
} = require("../controller/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleUrlRedirection);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
