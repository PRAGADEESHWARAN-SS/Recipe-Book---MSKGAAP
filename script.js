// Simulate page navigation without reload
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let target = this.getAttribute('data-target');
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(target).style.display = 'block';
    });
});

// Store and manage recipes in localStorage
const loadRecipes = () => {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : {};
};

const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

// Add a new recipe
document.getElementById('addRecipeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('recipeName').value.trim();
    const ingredients = document.getElementById('ingredients').value.trim().split(',');
    const instructions = document.getElementById('instructions').value.trim();

    const recipes = loadRecipes();
    recipes[name] = {
        ingredients: ingredients.map(ingredient => ingredient.trim()),
        instructions
    };

    saveRecipes(recipes);
    alert(`Recipe "${name}" added successfully!`);

    // Clear form fields
    document.getElementById('recipeName').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
});

// Search for a recipe by name
document.getElementById('searchButton').addEventListener('click', function () {
    const searchName = document.getElementById('searchName').value.trim();
    const recipes = loadRecipes();
    const recipe = recipes[searchName];

    const searchResultDiv = document.getElementById('searchResult');
    searchResultDiv.innerHTML = '';

    if (recipe) {
        searchResultDiv.innerHTML = `
            <div class="recipe">
                <h3>${searchName}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            </div>
        `;
    } else {
        searchResultDiv.innerHTML = `<p>Recipe "${searchName}" not found.</p>`;
    }
});

// Display all recipes
document.getElementById('displayAllButton').addEventListener('click', function () {
    const recipes = loadRecipes();
    const recipeListDiv = document.getElementById('recipeList');
    recipeListDiv.innerHTML = '';

    if (Object.keys(recipes).length === 0) {
        recipeListDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    for (const [name, details] of Object.entries(recipes)) {
        recipeListDiv.innerHTML += `
            <div class="recipe">
                <h3>${name}</h3>
                <p><strong>Ingredients:</strong> ${details.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${details.instructions}</p>
            </div>
        `;
    }
});
