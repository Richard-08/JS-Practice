const mealBlocks = document.querySelector('.meal-blocks');
const mealsBox = document.querySelector('.meals');

async function getCategories() {
    const categoriesData = [];

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => categoriesData.push(...data.categories));

    render(categoriesData);
}

getCategories();

const toHTML = meal => `
<div class="block" data-id="${meal.idCategory}">
    ${meal.strCategory}
</div>`;

function render(categoriesData) {
    const html = categoriesData.map(toHTML).join('');
    document.querySelector('.meal-blocks').innerHTML = html;
}

/* ////////////////////////////////////////////////////////////////// */

async function getMeals(category) {
    const mealsData = [];

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => mealsData.push(...data.meals));

    renderMeals(mealsData);
}

const toHTMLMeals = meal => `
<div class="meal-box" data-id="${meal.idMeal}">
    <h3>${meal.strMeal}</h3>
</div>`;

function renderMeals(mealsData) {
    const html = mealsData.map(toHTMLMeals).join('');
    document.querySelector('.meals').innerHTML = html;
}



mealBlocks.addEventListener('click', event => {
    let category = event.target.innerText;
    getMeals(category);

    let node = event.target.parentNode.children;

    for (let i = 0; i < node.length; i += 1) {
        node[i].classList.remove('active');
    }
    event.target.classList.add('active');
});


/* ////////////////////////////////////////////////////////////////////// */

async function getRecipes(id) {
    const recipeData = [];

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => recipeData.push(...data.meals));
    console.log(recipeData);
    renderRecipes(recipeData);
}

function getIngredients(obj) {
    let ingredients = '';

    for (let i = 1; i <= 20; i += 1) {
        let ingredient = `strIngredient${i}`;
        let measure = `strMeasure${i}`;

        if (obj[ingredient] !== '' || obj[measure] !== '') {
            if (obj[ingredient] || obj[measure]) {
                ingredients += `${obj[ingredient]}-`;
                ingredients += `${obj[measure]},`;
            }

        }
    }

    return ingredients.replace(/\,-/g, '').replace(/\,/g, '\n');
}

const toHTMLRecipe = recipe => `
<div class="recipe-box">
    <h3>${recipe.strMeal}</h3>
    <div class="meal-img">
        <img src="${recipe.strMealThumb}" alt="beef">
        <p>${getIngredients(recipe)}</p>
    </div>
    <p class="instruction">${recipe.strInstructions}</p>
</div>`;

function renderRecipes(recipeData) {
    const html = recipeData.map(toHTMLRecipe).join('');
    document.querySelector('.recipe').innerHTML = html;
};

mealsBox.addEventListener('click', event => {
    let key = event.target.parentNode.dataset.id;
    /* console.log(event.target.parentNode.dataset.id); */
    scroll(0, 200);
    getRecipes(key);
});