// Variables
const startButton = document.querySelector("a.btn__reset");
const letters = document.getElementById('qwerty');
const keyWords = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
var missed = 0;

// Phrases 
var phrases = ['Chicago is beautiful', 'The sky is blue', 'Eminem is the greatest', 'Grass is green', 'Burgers are great'];

// Overlay Removal
startButton.addEventListener("click", function(){
    overlay.style.display = 'none';
    missed = 0;
    getRandomPhrase(phrases);
});

// Randomizing 
function getRandomPhrase(arr){
    var randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase;   
}
let winningWords = getRandomPhrase(phrases);

// Game Display
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        li.innerText = arr[i];
        if (li.innerText == " "){
            li.className = "space";
        } else 
            li.className = "letter";
        ul.appendChild(li);
    }
}
addPhraseToDisplay(winningWords);

// Look for letter
function checkLetter(button){
    let letter = document.querySelectorAll('.letter');
    let match = '';
     for (let i = 0; i < letter.length; i++){
        li = letter[i]
        if(button.textContent === li.textContent.toLocaleLowerCase() ){
            match = li.classList.add('show');
        } 
    }
    return match;
}

function checkWin(){
    let letter = document.querySelectorAll('.letter');
    let letterShow = document.querySelectorAll('.show');
    if (letter.length == letterShow.length){
        document.getElementById('overlay').className = 'win';
        document.getElementById('overlay').style.display = 'flex';
        let title = document.querySelector('h2');
        document.getElementById('phrase').style.display = 'none';
        title.textContent = 'You won!';
        setInterval ("window.location.reload()", 900);
    } else if (missed > 4){
        document.getElementById('overlay').classList.add('lose');
        document.getElementById('overlay').style.display = 'flex';
        let title = document.querySelector('h2');
        document.getElementById('phrase').style.display = 'none';
        title.textContent = 'You lost! Try again?!';
        setInterval ("window.location.reload()", 900);
    }
}

letters.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        button.classList.add('chosen');
        button.disabled = true;
    
        let letterFound = checkLetter(button)
        if (letterFound != null) {
          missed++;
          console.log(missed);
          const heart = document.querySelector('.tries');
          heart.remove();
        }
    }
    checkWin();
 });
