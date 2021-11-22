

const totalSquares = 10;
const snakes = {8:3}
const ladders = {2:6};
let currentPlayerIdx = 0;
let end = false;

const player1 = {
    "name": "Tony",
    "currentSquare": 0
}

const player2 = {
    "name": "Beth",
    "currentSquare": 0
}

const players = [player1, player2];

function rollDice() {
    const roll = (Math.floor(Math.random() *6)) +1;
    return roll;
}

function checkHasWon(playersSquare) {
    return ((playersSquare >= totalSquares) ? true : false)
}

function winner(player) {
    console.log(`${player.name} has won`);
}

function takeTurn(player) {
    console.log(player);
    roll = rollDice();
    let currentSquare = player.currentSquare;
    let newSquare = currentSquare + roll;
    console.log(`${player.name} moved from ${currentSquare} to ${newSquare}`);
    console.log(checkHasWon(newSquare));
    if(checkHasWon(newSquare)) {
        end = true;
        winner(player);
    } else {
        player.currentSquare = newSquare;
    }

}

function getNextPlayer() {
    if (currentPlayerIdx +1 == players.length) {
        currentPlayerIdx = 0;
    } else {
        currentPlayerIdx++;
    }
    return (players[currentPlayerIdx]);
}

function gameLoop() {
    let player = players[0];
    while(end === false) {
        takeTurn(player);
        player = getNextPlayer();
    }
    console.log("!!!GAME OVER!!!")
}

// takeTurn(player1);
// gameLoop();
