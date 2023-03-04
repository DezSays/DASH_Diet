let clickme = document.getElementById('clickme');
let ingredientContainer = document.getElementById('ingredient-container')



let offsetNum = 0

// generate meal plan https://api.spoonacular.com/mealplanner/generate
// solo recipe info https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false
            // let cheap = data.cheap 
            // let recipeID = data.id 
            // let img = data.image 
            // let instructions = data.summary
            // let title = data.title
            // let servings = data.servings
            // let minutes = data.readyInMinutes 
            // let sodium = data.nutrition.nutrients[7].name 
            // let dailyVal = data.nutrition.nutrients[7].percentOfDailyNeeds
            // let saltAmount = data.nutrition.nutrients[7].amount 
            // let saltUnit = data.nutrition.nutrients[7].unit
            // let ingredientAmount = data.nutrition.ingredients[!!!].amount 
            // let ingredientName = data.nutrition.ingredients[!!!].name 
            // let ingredientUnit = data.nutrition.ingredients[!!!].unit     

clickme.addEventListener('click', () =>{
    fetch(`https://api.spoonacular.com/recipes/complexSearch?maxSodium=575&apiKey=${apiKey}&number=100&offset=${offsetNum}`)
        .then(res => res.json())
        .then(data =>{
            const nxtBtn = document.createElement('button')
            let ingredientList = data.results
            ingredientList.forEach((recipeInList) => {
                const div = document.createElement('div')
                let sodium = recipeInList.nutrition.nutrients[0].name
                let amount = recipeInList.nutrition.nutrients[0].amount
                let mg = recipeInList.nutrition.nutrients[0].unit
                let recipeID = recipeInList.id 
                let img = recipeInList.image 
                let amountRounded = Math.ceil(amount)
                let percentOfValue = Math.ceil(amount/2300 * 100)
                sodium = sodium.toLowerCase()
             
                    div.innerHTML = `
                    <img src=${img} />
                    <h3>${recipeInList.title}</h3>
                    <p>Recipe ID: ${recipeID}</p>
                    <p>${amountRounded}${mg} of ${sodium}, or ${percentOfValue}% of your daily value per serving.</p>
                    <button>Get Recipe</button>
                    ` 

                    ingredientContainer.appendChild(div) 
                })
                nxtBtn.innerText = 'Next Page'
                nxtBtn.addEventListener('click', () => {
                    
                    offsetNum+=100
                })
            ingredientContainer.appendChild(nxtBtn)
            console.log(ingredientList)

        })
})