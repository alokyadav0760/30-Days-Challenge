async function getRecipe() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await response.json();
  const meal = data.meals[0];

  // Display meal details
  document.getElementById("meal-img").src = meal.strMealThumb;
  document.getElementById("meal-name").textContent = meal.strMeal;
  document.getElementById("meal-category").textContent = `Category: ${meal.strCategory}`;
  document.getElementById("meal-instructions").textContent = meal.strInstructions;

  // Extract and display ingredients
  const ingredientsList = document.getElementById("meal-ingredients");
  ingredientsList.innerHTML = ""; // clear previous
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const li = document.createElement("li");
      li.textContent = `${ingredient} - ${measure}`;
      ingredientsList.appendChild(li);
    }
  }
}
