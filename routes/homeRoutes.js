const express = require("express");
const homeController = require("../controllers/homeController");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", homeController.getDashboard);
router.get("/recipes", homeController.getRecipes);
router.post("/upload-recipe", upload.single("file"), homeController.postRecipe);
router.post("/delete-recipe/:recipeId", homeController.deleteRecipe);
router.get("/edit-recipe/:recipeId", homeController.editRecipe);

router.post(
  "/update-recipe/:recipeId",
  upload.single("file"),
  homeController.updateRecipe
);

module.exports = router;
