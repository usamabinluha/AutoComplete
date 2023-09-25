import { fetchData, debounce } from "./utils.js"

const input = document.getElementById('search')
const suggestions = document.getElementById('suggestions')
let items;
let activeIndex = -1;
let length;

document.addEventListener('click', handleDocumentClick)
input.addEventListener('input', debounce(handleInputChange, 500))
suggestions.addEventListener('click', handleClick)
input.addEventListener('keydown', handleKeydown)

input.focus()

function handleClick (event) {
  if (event.target.matches('li')) {
    input.value = event.target.innerText
    resetSuggestions()
    event.stopPropagation()
  }
}

function handleInputChange (event) {
  handleSearch(event.target.value)
}

async function handleSearch (value) {
  if (value) {
    const list = await fetchData(value)
    suggestions.classList.add('active')
    renderSuggestions(list)
  } else {
    resetSuggestions()
  }
}

function resetSuggestions () {
  suggestions.classList.remove('active')
}

function renderSuggestions (list) {
  suggestions.innerHTML = ''
  const fragment = document.createDocumentFragment()
  for (let item of list) {
    const li = document.createElement('li');
    li.innerText = item
    fragment.appendChild(li)
  }
  suggestions.appendChild(fragment)
  items = document.querySelectorAll('li')
  length = items.length
  activeIndex = -1
}

function handleKeydown (event) {
  const { key } = event
  if (key === 'ArrowUp') handleUp()
  else if (key === 'ArrowDown') handleDown()
  else if (key === 'Enter') handleEnter()
  else if (key === 'Escape') handleEscape()
}

function handleEscape () {
  input.blur()
  resetSuggestions()
}

function handleEnter () {
  input.value = items[activeIndex].innerText
  resetSuggestions()
}

function handleDown () {
  activeIndex = (activeIndex + 1) % length
  navigate(activeIndex)
}

function handleUp () {
  if (activeIndex === -1) activeIndex = 0
  activeIndex = (length + (activeIndex-1)) % length;
  navigate(activeIndex)
}

function navigate (index) {
  items.forEach(item => {
    item.classList.remove('hover')
  });
  items[index].classList.add('hover')
}

function handleDocumentClick (event) {
  if (event.target != input && event.target != suggestions) {
    handleEscape()
  }
}