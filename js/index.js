const wordList = [
    {      
        word: "python",
        hint: "programming language",
      },
      {
        word: "guitar",
        hint: "musical instrument",
      },
      {
        word: "aim",
        hint: "target",
      },
      {
        word: "joker",
        hint: "funny story",
      },
      {
        word: "gold",
        hint: "a yellow precious metal",
      },
      {
        word: "golang",
        hint: "programming language",
      },
      {
        word: "venus",
        hint: "planet",
      },
      {
        word: "earth",
        hint: "Human planet",
      },
      {
        word: "Ball",
        hint: "a round object",
      },
    ];

const inputs = document.querySelector(".inputs"),
resetButton = document.querySelector('.reset-button'),
hints = document.querySelector('.hint span'),
wrongLetter = document.querySelector(".wrong-letter span"),
guesstLeft = document.querySelector(".guess-left span"),
typingInput = document.querySelector(".typing-input");

let word,maxGuesses, incorrectLetters = [] , correctLetters = [];

function randomNumber(){
    // getting random object from wordList array
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // getting word from random object
    maxGuesses = 8 ; incorrectLetters = [] ; correctLetters = [];

    hints.innerText = ranObj.hint;
    guesstLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled >`;
    }

    inputs.innerHTML = html;
}
randomNumber();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        if(word.includes(key)){
            for(let i = 0 ; i < word.length ; i++){
                // showing matching letter in input box
                if(word[i] === key){
                    correctLetters.push(`${key}`);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }else{
            maxGuesses--; //decrement maxGuesses by 1
            incorrectLetters.push(`${key}`);
        }
        guesstLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters.join(",");
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length){
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randomNumber();//calling randomword function, so  the game resets
        }else if(maxGuesses < 1){
            alert("Game over! You don't have remaining guesses");
            for(let i = 0 ; i < word.length ; i++){
                //show all letter in input box
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}

resetButton.addEventListener("click",randomNumber);
typingInput.addEventListener("input",initGame);
inputs.addEventListener("click",() => typingInput.focus());
document.addEventListener("keydown",() => typingInput.focus());

