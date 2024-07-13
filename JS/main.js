let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

//! =============> Display Default <=============


$(window).on('load', function() {
    searchByName('').then(() => {
        $('.inner-loading-screen').fadeOut(500)
    })
});


//! =============> Side Nav <=============

function openSideNav(){
    $('.side-nav').animate({left : 0}, 500)
    $('.open-close-icon').removeClass('fa-align-justify').addClass('fa-x')
    $('.links li').each(function(index){
        $(this).animate({top : 0}, (index + 5)*100)
    })
}

function closeSideNav(){
    let wid = $('.nav-tab').outerWidth()
    $('.side-nav').animate({left : -wid}, 500)
    $('.open-close-icon').removeClass('fa-x')
    $('.open-close-icon').addClass('fa-align-justify')
    $('.links li').animate({top : 300}, 500)
}
closeSideNav()

$('.open-close-icon').on('click', () => {
    if($('.side-nav').css('left') == '0px'){
        closeSideNav()
    } else {
        openSideNav()
    }
})

//! =============> Display <=============



function displayMeals(arr){
    let mealBox = '';
    for (let i = 0; i < arr.length; i++) {
        mealBox += `
        <div class="col-lg-3 col-md-6">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`  
    }
    rowData.innerHTML = mealBox;
}


//! =============> Search <=============


function showSearchInputs(){
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white search-input" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white search-input" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML = '';
}

$('#search').on('click', () => {
    showSearchInputs()
    closeSideNav()
})

async function searchByName(term){
    rowData.innerHTML = ''
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await response.json()
    data.meals ? displayMeals(data.meals) : displayMeals([])
    $('.inner-loading-screen').fadeOut(300)
}

async function searchByFLetter(term){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);
    term == '' ? term = 'a' : '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data = await response.json();
    data.meals ? displayMeals(data.meals) : displayMeals([])
    $('.inner-loading-screen').fadeOut(300)
}


//! =============> Category <=============


async function displayCategories(){
    rowData.innerHTML = '';
    searchContainer.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    console.log(data);
    $('.inner-loading-screen').fadeOut(300);
    let cateBox = '';
    for (let i = 0; i < data.categories.length; i++) {
        cateBox +=`
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${data.categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${data.categories[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${data.categories[i].strCategory}</h3>
                    <p>${data.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>`
    }
    rowData.innerHTML = cateBox;
}
$('#categories').on('click', () =>{
    displayCategories()
    closeSideNav()
})

async function getCategoryMeals(category){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await response.json()
    displayMeals(data.meals.slice(0,20))
    $('.inner-loading-screen').fadeOut(300)
}


//! =============> Area <=============


async function getArea(){
    rowData.innerHTML = '';
    searchContainer.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let data = await response.json();
    displayArea(data.meals)
    $('.inner-loading-screen').fadeOut(300)
}

$('#area').on('click', () => {
    getArea();
    closeSideNav()
})

function displayArea(arr){
    let areaBox = ``;
    for (let i = 0; i < arr.length; i++) {
        areaBox += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>`      
    }
    rowData.innerHTML = areaBox;
}

async function getAreaMeals(area){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await response.json()
    displayMeals(data.meals.slice(0, 20))
    $('.inner-loading-screen').fadeOut(300)
}


//! =============> Ingredients <=============


async function getIngredients(){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let data = await response.json()
    displayIngredients(data.meals.slice(0, 20))
    $('.inner-loading-screen').fadeOut(300)
}

$('#ingredients').on('click', () => {
    getIngredients()
    closeSideNav()
})

function displayIngredients(arr){
    let ingBox = '';
    for (let i = 0; i < arr.length; i++) {
        ingBox += `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>`
    }
    rowData.innerHTML = ingBox;
}

async function getIngredientsMeals(ing){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    let data = await response.json()
    displayMeals(data.meals.slice(0, 20))
    $('.inner-loading-screen').fadeOut(300)
}



//! =============> Details <=============


async function getMealDetails(id){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await response.json()
    displayMealDetails(data.meals[0])
    $('.inner-loading-screen').fadeOut(300)
}

function displayMealDetails(meal){
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    
    let box = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>           
            <h3>Tags :</h3>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success ms-2">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger ms-2">Youtube</a>
        </div>`

    rowData.innerHTML = box
}


//! =============> Contact <=============


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function showContacts() {
    searchContainer.innerHTML = ''
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        At least 3 chars, Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Age must be between 14 and 100 years
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="rePasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Re-Password">
                    <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Not Matched 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("rePasswordInput").addEventListener("focus", () => {
        rePasswordInputTouched = true
    })
}

$('#contact').on('click', () => {
    showContacts()
    closeSideNav()
})


//! =============> Contact Validation <=============



function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }

    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
    }

    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block")
        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && rePasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}





function nameValidation() {
    return /^[A-Za-z]{3,}$/.test(document.getElementById("nameInput").value)
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value)
}

function phoneValidation() {
    return /^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value)
}

function ageValidation() {
    return /^(1[4-9]|[2-9][0-9]|100)$/.test(document.getElementById("ageInput").value)
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value)
}

function rePasswordValidation() {
    return document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value
}