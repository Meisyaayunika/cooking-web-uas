document.addEventListener("DOMContentLoaded", () => {
  const recipesContainer = document.querySelector(".recipes-container");
  const addRecipeBtn = document.getElementById("add-recipe-btn");
  const recipeForm = document.getElementById("recipe-form");
  const cancelFormBtn = document.getElementById("cancel-form");

  const recipeTitle = document.getElementById("recipe-title");
  const recipeDescription = document.getElementById("recipe-description");
  const recipePrepTime = document.getElementById("recipe-prep-time");
  const recipeCookTime = document.getElementById("recipe-cook-time");
  const recipeImage = document.getElementById("recipe-image");

  let recipes = [];

  
  function renderRecipes() {
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe");
      recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <span>Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}</span>
          <button class="edit-recipe" data-index="${index}">Edit</button>
          <button class="delete-recipe" data-index="${index}">Delete</button>
        `;
      recipesContainer.appendChild(recipeCard);
    });
  }

  
  addRecipeBtn.addEventListener("click", () => {
    recipeForm.style.display = "block";
  });

  
  cancelFormBtn.addEventListener("click", () => {
    recipeForm.style.display = "none";
    recipeForm.reset();
  });

  
  recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = recipeImage.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newRecipe = {
          title: recipeTitle.value,
          description: recipeDescription.value,
          prepTime: recipePrepTime.value,
          cookTime: recipeCookTime.value,
          image: reader.result, 
        };

        const index = recipeForm.dataset.editIndex;
        if (index) {
          recipes[index] = newRecipe;
          delete recipeForm.dataset.editIndex;
        } else {
          recipes.push(newRecipe);
        }

        recipeForm.reset();
        recipeForm.style.display = "none";
        renderRecipes();
      };

      reader.readAsDataURL(file); 
    } else {
      alert("Please upload an image for the recipe."); 
    }
  });


  recipesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-recipe")) {
      const index = e.target.dataset.index;
      const recipe = recipes[index];

      recipeTitle.value = recipe.title;
      recipeDescription.value = recipe.description;
      recipePrepTime.value = recipe.prepTime;
      recipeCookTime.value = recipe.cookTime;

      recipeForm.dataset.editIndex = index;
      recipeForm.style.display = "block";
    }

    if (e.target.classList.contains("delete-recipe")) {
      const index = e.target.dataset.index;
      recipes.splice(index, 1);
      renderRecipes();
    }
  });

  renderRecipes();
});
