const player1 = {name: 'Player 1', className: 'p1'};
const player2 = {name: 'Player 2', className: 'p2'};

const row1 = [1, 2, 3];
const row2 = [4, 5, 6];
const row3 = [7, 8, 9];

const col1 = [1, 4, 7];
const col2 = [2, 5, 8];
const col3 = [3, 6, 9];

const diag1 = [1, 5, 9];
const diag2 = [3, 5, 7];

const scoringSet = [row1, row2, row3, col1, col2, col3, diag1, diag2];

let currentPlayer = player1;
let gameWon = false;

document.addEventListener('DOMContentLoaded', attacherListeners);

function attacherListeners(){
    
    const gameBoard = document.getElementById('game-board');

    gameBoard.addEventListener('click', (event) => {
        squareClick(event);
    });

    const refreshButton = document.getElementById('refresh-btn');

    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });

}

function squareClick(event){

    const clickedSquare = event.target;

    if(checkLegalMove(clickedSquare)){

        clickedSquare.classList.add(currentPlayer.className);

        checkForWin(currentPlayer);

        changePlayer();
      
    }   
    
}

function checkForWin(player){
    
    scoringSet.forEach((set) => {

        let scoreCounter = 0;

        set.forEach((id) => {
            
            let scoredSquare = document.getElementById(id);

            if(scoredSquare.classList.contains(player.className)){
                scoreCounter++;
            }
        });

        if(scoreCounter === 3){

            displayWinningMessage();

            gameWon = true;

            document.getElementById('refresh-btn').innerText = 'rematch?';
                
        }
    });
  
}

function changePlayer(){

    let otherPlayer = (currentPlayer===player1) ? player2 : player1;

    currentPlayer = otherPlayer;

}

function displayWinningMessage(){

    document.querySelector('h2').innerText = currentPlayer.name.toUpperCase() + " HAS WON!!";

    document.querySelector('h2').style.display = 'block';

}

function checkLegalMove(square){
    
    let legalMove = false;

    if(square.classList.contains('square') && !(square.classList.contains('p1')) && !(square.classList.contains('p2')) && !gameWon){
        legalMove = true;
    }

    return legalMove;

}



