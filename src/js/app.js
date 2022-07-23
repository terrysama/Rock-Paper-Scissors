const choices = ['rock', 'paper', 'scissors'];

const reset = document.querySelectorAll('.reset');
const reload = document.querySelector('.reload');
const roundsMode = document.querySelectorAll('button.mode');
const playerScore = document.querySelector('.player-count');
const computerScore = document.querySelector('.computer-count');
const movesLeft = document.querySelector('.moves-count');

const playing = document.querySelector('div#playing');
const notPlaying = document.querySelector('div#not-playing');
const optionChoice = document.querySelectorAll('#not-playing img.rps-option');
const playerChoice = document.querySelector('#playing img.player-rps-choice');
const computerChoice = document.querySelector('#playing img.computer-rps-choice');
const messageText = document.querySelector('#message .message');
const resultText = document.querySelector('#message .result');

let scorePlayer = 0;
let scoreComputer = 0;
let maxRound = 1;
let playerSelection;
let computerSelection;
let moves = maxRound;

playerScore.textContent = scorePlayer;
computerScore.textContent = scoreComputer;
movesLeft.textContent = moves;


// To return the game to the choices selection after each round
function defaultPlay(){
    playerChoice.setAttribute('src', './src/images/big rock.jpg');
    computerChoice.setAttribute('src', './src/images/big rock.jpg');
    notPlaying.classList.remove('hidden');
    playing.classList.add('hidden');
    messageText.classList.remove('hidden');
    resultText.classList.add('hidden');
}

// listener to reload options for next round and close result message
reload.addEventListener('click', ()=>{
    defaultPlay();
});

// Reset game function
function resetGame(){
    scorePlayer = 0;
    scoreComputer = 0;
    maxRound = 1;
    playerScore.textContent = scorePlayer;
    computerScore.textContent = scoreComputer;
    movesLeft.textContent = moves;
    
    defaultPlay();
}

// listener for reset buttons
reset.forEach(button => button.addEventListener('click', function(){
    resetGame();
}));

// function with listener for number of rounds to play
function selectRounds(){
    for(let i = 0; i < roundsMode.length; i++){
        roundsMode[i].addEventListener('click', function(){
            if(this.textContent == "1 round"){
                maxRound= 1;   
            }
            else if(this.textContent == "3 rounds"){
                maxRound= 3;
            }
            else if(this.textContent == "5 rounds"){
                maxRound= 5;
            }
            else{
                maxRound= 7;
            }
            
            moves = maxRound;
            movesLeft.textContent= moves;

            resetGame();            
        });
    }
}
selectRounds();

// Computer makes a choice and displays animation
function computerPlay(){
    let random = Math.floor(Math.random() * choices.length);
    computerSelection = choices[random];

    if(computerSelection == 'paper'){
        computerChoice.setAttribute('src', './src/images/big paper.jpg');
    }
    else if(computerSelection == 'scissors'){
        computerChoice.setAttribute('src', './src/images/big scissors.jpg');
    }
    else{
        computerSelection == 'rock';
    }

    return computerSelection;
}

// Display player selection
function playerPlay(){
    if(playerSelection == 'paper'){
        playerChoice.setAttribute('src', './src/images/big paper.jpg');
    }
    else if(playerSelection == 'scissors'){
        playerChoice.setAttribute('src', './src/images/big scissors.jpg');
    }
    else{
        playerSelection == 'rock';
    }

    return playerSelection;
}

// The game rules to check winner
function playRound(){
    if(playerSelection == computerSelection){
        message = "It's a Tie!";
    }
    else if(playerSelection == "rock" && computerSelection == "paper"){
        scoreComputer++;
        computerScore.textContent = scoreComputer;
        message = "You Lose!";
    }
    else if(playerSelection == "rock" && computerSelection == "scissors"){
        scorePlayer++;
        playerScore.textContent = scorePlayer;
        message = "You Win!";
    }
    else if(playerSelection == "paper" && computerSelection == "scissors"){
        scoreComputer++;
        computerScore.textContent = scoreComputer;
        message = "You Lose!";
    } 
    else if(playerSelection == "paper" && computerSelection == "rock"){
        scorePlayer++;
        playerScore.textContent = scorePlayer;
        message = "You Win!";        
    }
    else if(playerSelection == "scissors" && computerSelection == "rock"){
        scoreComputer++;
        computerScore.textContent = scoreComputer;
        message = "You Lose!";
    }     
    else if(playerSelection == "scissors" && computerSelection == "paper"){
        scorePlayer++;
        playerScore.textContent = scorePlayer;
        message = "You Win!";
    }
    resultText.textContent = message;
    resultText.classList.remove('hidden');
    messageText.classList.add('hidden');
}

// function with listener to pick choice of user, displays it and kickstarts computer's choice
function playerTurnListener(){
    for(let i = 0; i < optionChoice.length; i++){
        optionChoice[i].addEventListener('click', function(){
            let attr = this.getAttribute('alt').toLowerCase();
            playerSelection = attr;

            playing.classList.remove('hidden');
            notPlaying.classList.add('hidden');
            moves--;
            movesLeft.textContent= moves;

            setTimeout(function(){
                computerPlay();
                playerPlay();
                playRound();
            }, 1500);
        });
    }
}

playerTurnListener();