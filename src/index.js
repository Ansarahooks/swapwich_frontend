function fetchUsers() {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(obj => console.log('fetch users', obj))
}

function fetchMeals() {
    fetch('http://localhost:3000/meals')
    .then(resp => resp.json())
    .then(obj => console.log('fetch meals', obj))
}

document.querySelector('#meal-form').addEventListener('submit', handleForm)

function handleForm(e) {
  e.preventDefault()
  e.target.reset()
  findSwap()
}

function findSwap() {
  let div = document.querySelector('#lunch-finder')
  let h3 = document.createElement('h3')
  h3.innerText = 'Step 2: Tell us what you\'d like to eat!'

  let form = document.createElement('form')
  form.addEventListener('submit', displayLunches)

  let categoryInput = document.createElement('input')
  categoryInput.setAttribute('type', 'text')
  form.appendChild(categoryInput)

  let submitInput = document.createElement('input')
  submitInput.setAttribute('type', 'submit')
  form.appendChild(submitInput)

  div.appendChild(h3)
  div.appendChild(form)
}

function displayLunches(e) {
  e.preventDefault()
  let div = document.querySelector('#all-lunches')
  let h3 = document.createElement('h3')
  h3.innerText = 'Step 3: Find something tasty!'

  let lunchCard = document.createElement('div')
  lunchCard.className = 'card'

  let lunchName = document.createElement('h4')
  lunchName.innerText = 'Turkey Sandwich'
  lunchCard.appendChild(lunchName)

  let lunchDescription = document.createElement('p')
  lunchDescription.innerText = 'Description: Yummy!'
  lunchCard.appendChild(lunchDescription)

  let swapButton = document.createElement('button')
  swapButton.innerText = 'Request to Swap!'
  lunchCard.appendChild(swapButton)
  swapButton.addEventListener('click', handleSwap)

  div.appendChild(h3)
  div.appendChild(lunchCard)
}

function handleSwap(e) {



console.log('master branch')
