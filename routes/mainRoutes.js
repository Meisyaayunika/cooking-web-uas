const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.getRoot);
router.get("/about", mainController.getAbout);
router.get("/contact", mainController.getContact);

module.exports = router;
