

const totalSquares = 10;
const snakes = {5:1, 8:3}
const ladders = {2:6, 7:9};
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

function checkForLadders(playersSquare) {
    // console.log(playersSquare);
    if(ladders[playersSquare]) {
        return ladders[playersSquare];
    } else {
        return false;
    }
}

function checkForSnakes(playersSquare) {
    // console.log(playersSquare);
    if(snakes[playersSquare]) {
        return snakes[playersSquare];
    } else {
        return false;
    }
}

function checkHasWon(playersSquare) {
    return ((playersSquare >= totalSquares) ? true : false)
}

function winner(player) {
    console.log(`${player.name} has won`);
}

function takeTurn(player) {
    roll = rollDice();
    let currentSquare = player.currentSquare;
    let newSquare = currentSquare + roll;
    console.log(`${player.name} moved from ${currentSquare} to ${newSquare}`);
    if(checkHasWon(newSquare)) {
        end = true;
        winner(player);
    } else {
        const snake = checkForSnakes(newSquare);
        const ladder = checkForLadders(newSquare);
        
        if(snake) {
            player.currentSquare = snake;
            console.log("You landed on a SNAKE!");
            console.log(`${player.name} is now at ${player.currentSquare}`)
        } else if(ladder) {
            player.currentSquare = ladder;
            console.log("You landed on a LADDER")
            console.log(`${player.name} is now at ${player.currentSquare}`)
        } else {
            player.currentSquare = newSquare;
        }
        
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
