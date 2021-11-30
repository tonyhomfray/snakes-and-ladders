

const TOTAL_SQUARES = 100;
const snakes = {16:6, 47:26, 49:11, 56:53, 64:60, 87:24, 93:73, 95:75, 98:78}
const ladders = {2:38, 4:14, 8:31, 21:39, 28:84, 36:44, 51:67, 71:91, 80:10};
let currentPlayerIdx = 0;
// let end = false;

const player1 = {
    "name": "Tony",
    "currentSquare": 0
}

const player2 = {
    "name": "Beth",
    "currentSquare": 0
}

const player3 = {
    "name": "Angela",
    "currentSquare": 0
}

const players = [player1, player2, player3];

function rollDice() {
    const roll = (Math.floor(Math.random() *6)) +1;
    return roll;
}

function checkForLadders(playersSquare) {
    if(ladders[playersSquare]) {
        return ladders[playersSquare];
    } else {
        return false;
    }
}

function checkForSnakes(playersSquare) {
    if(snakes[playersSquare]) {
        return snakes[playersSquare];
    } else {
        return false;
    }
}

function checkHasWon(playersSquare) {
    return ((playersSquare >= TOTAL_SQUARES) ? true : false)
}

// function winner(player) {
//     console.log(`${player.name} has won`);
// }

function displayMove(player, oldPosition, newPosition) {
    let p = document.createElement('p');
    let text = document.createTextNode(`${player} moved from ${oldPosition} to ${newPosition}`);
    p.appendChild(text);
    const list = document.getElementById('right-panel');
    list.appendChild(p);
}

function displaySnake(name, square) {
    let snakeElem = document.createElement('p');
    let snakeText = document.createTextNode("SNAKE!!!");
    snakeElem.appendChild(snakeText);
    
    let playerElem = document.createElement('p');
    let playerText = document.createTextNode(`${name} went back to square ${square}`);
    playerElem.appendChild(playerText);

    const list = document.getElementById('right-panel');
    list.appendChild(snakeElem);
    list.appendChild(playerElem);
}

function displayLadder(name, square) {
    let ladderElem = document.createElement('p');
    let ladderText = document.createTextNode("LADDER!!!");
    ladderElem.appendChild(ladderText);
    
    let playerElem = document.createElement('p');
    let playerText = document.createTextNode(`${name} moved up to square ${square}`);
    playerElem.appendChild(playerText);

    const list = document.getElementById('right-panel');
    list.appendChild(ladderElem);
    list.appendChild(playerElem);
}

function takeTurn() {
    let player = players[currentPlayerIdx];
    roll = rollDice();
    let currentSquare = player.currentSquare;
    let newSquare;
    if (currentSquare + roll > TOTAL_SQUARES) {
        newSquare = TOTAL_SQUARES;
    } else {
        newSquare = currentSquare + roll;
    }
    console.log(`${player.name} moved from ${currentSquare} to ${newSquare}`);
    displayMove(player.name, currentSquare, newSquare);
    if(checkHasWon(newSquare)) {
        // end = true;
        player.currentSquare = TOTAL_SQUARES;
        endGame(player);
    } else {
        const snake = checkForSnakes(newSquare);
        const ladder = checkForLadders(newSquare);
        
        if(snake) {
            player.currentSquare = snake;
            console.log("You landed on a SNAKE!");
            console.log(`${player.name} is now at ${player.currentSquare}`)
            displaySnake(player.name, player.currentSquare);
            // displayMove(player.name, newSquare, player.currentSquare);
        } else if(ladder) {
            player.currentSquare = ladder;
            console.log("You landed on a LADDER")
            console.log(`${player.name} is now at ${player.currentSquare}`)
            displayLadder(player.name, player.currentSquare);
            // displayMove(player.name, newSquare, player.currentSquare);
        } else {
            player.currentSquare = newSquare;
        }
        
    }

    player = getNextPlayer();

}

function getNextPlayer() {
    if (currentPlayerIdx +1 == players.length) {
        currentPlayerIdx = 0;
    } else {
        currentPlayerIdx++;
    }
    return (players[currentPlayerIdx]);
}



function endGame(player) {
    console.log(`${player.name} has won`);

    console.log("!!!GAME OVER!!!")

    let winnerElem = document.createElement('p');
    let winnerText = document.createTextNode(`${player.name} has won!`);
    winnerElem.appendChild(winnerText);

    let gameOverElem = document.createElement('p');
    let gameOverText = document.createTextNode(`!!!GAME OVER!!!`);
    gameOverElem.appendChild(gameOverText);

    const list = document.getElementById('right-panel');
    list.appendChild(winnerElem);
    list.appendChild(gameOverElem);

}

function startGame() {
    const startButton = document.getElementById("startGame");
    startButton.setAttribute("disabled", "");
    const takeTurnButton = document.getElementById("takeTurn");
    takeTurnButton.removeAttribute("disabled");

    let player = players[0];
    takeTurn();


    // while(end === false) {
    //     takeTurn(player);
    //     player = getNextPlayer();
    // }
    
}

// takeTurn(player1);
// gameLoop();
