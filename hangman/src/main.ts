import './style.css'


type State = {
  word: string
  characters: string[]
  maxMistakes: number
}

const WORDS = [
  'molla',
  'anije',
  'flamur',
  'krevat',
  'bluza',
  'pantallona',
  'corape',
  'kokoshka',
  'mami',
  'libri',
  'astronaut',
  'bleta',
  'mjalti',
  'krokodil',
  'tenxhere',
  'majmun',
  'gjirafa',
  'telefon',
  'televizor',
  'kompjuter'
]

function getRandomWord () {
  let randomIndex = Math.floor(Math.random() * WORDS.length)
  return WORDS[randomIndex]
}


let state: State = {
  word: getRandomWord(),
  characters: [],
  maxMistakes: 5,
}


function restartGame () {
  state.word = getRandomWord()
  state.characters = []
  render()
}


function getMistakes () {
  return state.characters.filter(char => !state.word.includes(char))
}

function getMistakeCount () {
  let mistakes = getMistakes()
  return mistakes.length
}


function getCorrectGuesses () {
  return state.characters.filter(char => state.word.includes(char))
}



function checkIfUserWon () {
  for (let char of state.word) {
   
    if (!state.characters.includes(char)) return false
  }
  return true
}



function checkIfUserLost () {
  return getMistakeCount() >= state.maxMistakes
}


function renderWord () {
  let wordEl = document.createElement('div')
  wordEl.className = 'word'

  let correctGuesses = getCorrectGuesses()

  for (let char of state.word) {
    let charEl = document.createElement('span')
    charEl.className = 'char'

    if (correctGuesses.includes(char)) {
      charEl.textContent = char
    } else {
      charEl.textContent = '_'
    }

    wordEl.append(charEl)
  }
  return wordEl
}



function renderMistakes () {
  let mistakesSpan = document.createElement('div')
  mistakesSpan.className = 'mistakes'
  mistakesSpan.textContent = `Mistakes: ${getMistakes()} (${getMistakeCount()})`
  return mistakesSpan
}


function renderWinningMessage () {
  let winMessageDiv = document.createElement('div')

  let winMessageP = document.createElement('p')
  winMessageP.textContent = 'You win! 🎉'

  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    restartGame()
  })

  winMessageDiv.append(winMessageP, restartButton)

  return winMessageDiv
}


function renderLosingMessage () {
  let lostMessageDiv = document.createElement('div')

  let lostMessageP = document.createElement('p')
  lostMessageP.textContent = `You lose! 🤕 The word was: ${state.word}`

  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    restartGame()
  })

  lostMessageDiv.append(lostMessageP, restartButton)

  return lostMessageDiv
}


function render () {
  let appEl = document.querySelector('#app')
  if (appEl === null) return
  appEl.textContent = ''

  let wordEl = renderWord()
  let mistakesSpan = renderMistakes()
 

  appEl.append(wordEl, mistakesSpan)

  if (checkIfUserWon()) {
    let winningMessageDiv = renderWinningMessage()
    appEl.append(winningMessageDiv)
  }

  if (checkIfUserLost()) {
    let losingMessageDiv = renderLosingMessage()
    appEl.append(losingMessageDiv)
  }
}

function listenToUserKeypresses () {
  document.addEventListener('keyup', function (event) {
    let guess = event.key.toLowerCase()

    let letters = 'abcdefghijklmnopqrstuvwxyz'
    if (!letters.includes(guess)) return
    if (state.characters.includes(guess)) return
    if (checkIfUserLost()) return
    if (checkIfUserWon()) return

    
    state.characters.push(guess)
    render()
  })
}

listenToUserKeypresses()
render()