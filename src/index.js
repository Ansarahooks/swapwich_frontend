let CURRENTUSER = {id: 2, name: 'BurgerTron2000'}
const CATAGORIES = ['Vegetarian', 'Vegan', 'Chicken', 'Beef', 'Pork', 'Turkey', 'Fish']

function fetchUsers() {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    // .then(obj => obj)
    .then(obj => console.log('fetch users', obj))
}

function fetchMeals() {
    fetch('http://localhost:3000/meals')
    .then(resp => resp.json())
    // .then(obj => renderMeals(obj))
    .then(obj => console.log('fetch meals', obj))
  }
  
  function createMeal(obj) {
    fetch('http://localhost:3000/meals', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(obj => console.log('create return', obj))
  }

// implement button behavior/animation

document.querySelector('#meal-form').addEventListener('submit', handleForm)

function handleForm(e) {
  e.preventDefault()
  let newMeal={}
  newMeal.user_id     = CURRENTUSER.id
  newMeal.name        = e.target[0].value
  newMeal.hot         = e.target[1].value
  newMeal.description = e.target[2].value
  newMeal.img_url     = e.target[3].value
  newMeal.category    = e.target[4].value
  createMeal(newMeal)
  e.target.reset()
  renderUserMeal(newMeal)
  renderSearch()
}

function killChildren(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
}

function renderUserMeal(obj) {
  const parent = document.getElementById('meal-info')
  killChildren(parent)

  let name = document.createElement('h3')
  name.innerText = obj.name

  let img = document.createElement('img')
  img.src = obj.img_url
  img.className = 'user-image'

  let desc = document.createElement('p')
  desc.innerText = `Description: ${obj.description}`

  let ul = document.createElement('ul')

  let hot = document.createElement('li')
  if (obj.hot) {
    hot.innerText = 'Hot'
  }
  else {
    hot.innerText = 'Cold'
  }

  let cat = document.createElement('li')
  cat.innerText = obj.category

  ul.appendChild(cat)
  ul.appendChild(hot)

  parent.appendChild(name)
  parent.appendChild(img)
  parent.appendChild(desc)
  parent.appendChild(ul)
}

function renderSearch() {
  let div = document.querySelector('#meal-finder')
  let h3 = document.createElement('h3')
  h3.innerText = 'Step 2: Tell us what you\'d like to eat!'

  let form = document.createElement('form')
  
  let categoryInput = document.createElement('select')
  categoryInput.name = 'category'
  
  let opt1 = document.createElement('option')
  opt1.value = ''
  opt1.innerText = 'Any'
  opt1.selected
  categoryInput.appendChild(opt1)

  CATAGORIES.forEach(type => {
    let op = document.createElement('option')
    op.value = type
    op.innerText = type
    categoryInput.appendChild(op)
  })
  
  let hotInput = document.createElement('select')
  hotInput.name = 'hot'

  let opt2 = document.createElement('option')
  opt2.value = ''
  opt2.innerText = 'Any'
  opt2.selected
  hotInput.appendChild(opt2)

  let hotHot = document.createElement('option')
  hotHot.value = true
  hotHot.innerText = 'Hot'
  hotInput.appendChild(hotHot)

  let hotCold = document.createElement('option')
  hotCold.value = false
  hotCold.innerText = 'Cold'
  hotInput.appendChild(hotCold)


  let submitInput = document.createElement('input')
  submitInput.setAttribute('type', 'submit')
  
  form.addEventListener('submit', renderMeals)
  form.appendChild(categoryInput)
  form.appendChild(hotInput)
  form.appendChild(submitInput)
  div.appendChild(h3)
  div.appendChild(form)
}

// event listener for submit from renderSearchForm
// post request for user submitted meal

// add filter that is dictated by renderSearchForm
// randomize selected meals

// split render meal function from event listener on meal search

function renderMeals(e) {
  e.preventDefault()
  let div = document.querySelector('#all-meals')
  let h3 = document.createElement('h3')
  h3.innerText = 'Step 3: Find something tasty!'
  div.appendChild(h3)
  
  fetchMeals()
  // attach filter to event listener on meal search
  createMealCard()
}

function createMealCard(obj) {
  const div = document.querySelector('#all-meals')

  let mealCard = document.createElement('div')
  mealCard.className = 'card'
  mealCard.dataset.id = obj.id

  let mealName = document.createElement('h4')
  mealName.innerText = obj.name
  mealCard.appendChild(mealName)

  let mealIMG = document.createElement('img')
  mealIMG.src = obj.img_url
  mealCard.appendChild(mealIMG)

  let mealDescription = document.createElement('p')
  mealDescription.innerText = obj.description
  mealCard.appendChild(mealDescription)

  let swapButton = document.createElement('button')
  swapButton.innerText = 'Request Swap!'
  swapButton.dataset.id = obj.id
  swapButton.addEventListener('click', handleSwap)
  mealCard.appendChild(swapButton)

  div.appendChild(mealCard)
}

// revise meal display function to iterate through fetch response
// check user_id to find user and interpolate name per meal card

// create like button for each lunch
// create logic to compare liker and likee likes

function handleSwap(e) {
  console.log('swap button target', e.target)
}

// CSS FORMATTING

fetchUsers()
fetchMeals()