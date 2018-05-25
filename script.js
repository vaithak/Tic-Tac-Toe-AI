var origBoard;
const human = 'O';
const computer = 'X';

// all possible wiining combinations
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', humanClicked);
	}
}

// check if a cell has been clicked by a human
function humanClicked(event)
{
  if( origBoard[event.target.id] !== 'O' || origBoard[event.target.id] !== 'X' )
    {
      var status = gameAdvance(event.target.id,human);
      if(status==0 && !checkTie())
      {
        gameAdvance(bestSpot(),computer);
      }
    }
}

// will check the game status also after every move
function gameAdvance(currCell,player)
{
  origBoard[currCell]=player;
  document.getElementById(currCell).innerText = player;

  //  checkif after the current move of player, has he won
  let gameStatus = checkWin(origBoard,player);
  if(gameStatus)
  {
    gameOver(gameStatus);
    return 1;
  }
  console.log("hi");
  return 0;
}

// to check if the player has won the game with the given board situation
function checkWin(board,player)
{
  var temp=new Array(9).fill(0);;

  //  storing where all the player has moved
  for(var i=0;i<9;i++)
  {
    if(board[i]===player)
    {
      temp[i]=1;
    }
  }

  // comparing with the winning combos
  flag=0;
  let gameWon = null;
  for(var i=0;i<8;i++)
  {
    for(var j=0;j<3;j++)
    {
      if(temp[winCombos[i][j]]===0)
      {
        break;
      }
      else if(temp[winCombos[i][j]]===1 && j===2)
      {
          flag=1;
      }
    }

    // winning combination found
    if(flag==1)
    {
      gameWon = {};
      gameWon['indexOfWinComb']=i;
      gameWon['player']=player;
      break;
    }
  }

  //  return the winning details object
  return gameWon;

}

// doing necessary things after the game is over
function gameOver(gameWon)
{
  // changing colour of current winning combination
  for (let index of winCombos[gameWon['indexOfWinComb']])
  {
		document.getElementById(index).style.backgroundColor = gameWon['player'] === human ? "blue" : "red";
	}

  // removing all event listeners
  for (var i = 0; i < cells.length; i++)
  {
		cells[i].removeEventListener('click', humanClicked, false);
	}

  // declaring winner
  declareWinner(gameWon.player == human ? "You win!" : "You lose.");
}

// function to show the text after gameOver
function declareWinner(textShow) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = textShow;
}

// function to return the array with cells remaining
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

// finding the best spot for the computer to play
function bestSpot() {
	return emptySquares()[0];
}

//  function to test if the game has been tied
function checkTie()
{
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', humanClicked, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
