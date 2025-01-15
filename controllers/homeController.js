const { supabase } = require("../supabaseConfig");
const { db } = require("../firebaseConfig");
const { ref, set, get, remove } = require("firebase/database");

exports.getDashboard = async (req, res) => {
  try {
    const recipeRef = ref(db, "recipes");
    const snapshot = await get(recipeRef);

    let recipes = [];
    if (snapshot.exists()) {
      const recipesData = snapshot.val();
      recipes = Object.keys(recipesData).map((key) => ({
        id: key,
        ...recipesData[key],
      }));
    }
    res.render("home/home", { recipes });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};
exports.getRecipes = (req, res) => res.render("home/recipes");
exports.postRecipe = async (req, res) => {
  const { title, description, prep, cook } = req.body;

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Recipe image is required.");
    }

    const fileName = `${Date.now()}_${file.originalname}`;
    const buffer = file.buffer;

    const { data, error } = await supabase.storage
      .from("recipe-images")
      .upload(fileName, buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return res.status(500).send({ error: error.message });
    }

    const recipeImagePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

    const newrecipeRef = ref(db, "recipes/" + Date.now());
    await set(newrecipeRef, {
      title,
      description,
      prep,
      cook,
      recipeImagePath,
    });

    res.redirect("/home");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    console.log(recipeId);
    const recipeRef = ref(db, `recipes/${recipeId}`);
    const snapshot = await get(recipeRef);

    if (!snapshot.exists()) {
      return res.status(404).send({ error: "recipe not found" });
    }

    const recipeData = snapshot.val();
    const recipeImagePath = recipeData.recipeImagePath.split(
      "/storage/v1/object/public/recipe-images/"
    )[1];

    await remove(recipeRef);

    const { error } = await supabase.storage
      .from("recipe-images")
      .remove([recipeImagePath]);

    if (error) {
      return res
        .status(500)
        .send({ error: `Failed to delete file: ${error.message}` });
    }

    res.redirect("/home");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

exports.editRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipeRef = ref(db, `recipes/${recipeId}`);
    const recipeSnapshot = await get(recipeRef);

    if (!recipeSnapshot.exists()) {
      return res.status(404).send("Recipe not found.");
    }

    const recipeData = recipeSnapshot.val();

    res.render("home/editRecipe", { recipeId, recipeData });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

exports.updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { title, description, prep, cook } = req.body;

  try {
    const recipeRef = ref(db, `recipes/${recipeId}`);
    const recipeSnapshot = await get(recipeRef);

    if (!recipeSnapshot.exists()) {
      return res.status(404).send("recipe not found.");
    }

    const recipeData = recipeSnapshot.val();

    let recipeImagePath = recipeData.recipeImagePath;

    if (req.file) {
      const oldFilePath = recipeData.recipeImagePath.split("/").pop();
      console.log(oldFilePath);
      await supabase.storage.from("recipe-images").remove([oldFilePath]);

      const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
      const buffer = req.file.buffer;

      const { data, error } = await supabase.storage
        .from("recipe-images")
        .upload(uniqueFilename, buffer, {
          contentType: req.file.mimetype,
        });

      if (error) {
        return res.status(500).send({ error: error.message });
      }

      recipeImagePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    }

    await set(recipeRef, {
      title,
      description,
      prep,
      cook,
      recipeImagePath,
    });

    res.redirect("/home");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};
