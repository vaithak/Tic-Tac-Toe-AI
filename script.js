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
  gameAdvance(event.target.id,human);
  origBoard[event.target.id]=human;
  document.getElementById(event.target.id).innerText = human;
  let gameStatus = checkWin(origBoard,human);
}

// will check the game status also after every move
function gameAdvance(currCell,player)
{
  origBoard[currCell]=player;
  document.getElementById(cell).innerText = player;

  //  checkif after the current move of player, has he won
  let gameStatus = checkWin(origBoard,player);

}

function checkWin(board,player)
{
  var temp=new Array(9).fill(0);;

  //  storing where all the player has moved
  for(var i=0;i<9;i++)
  {
    if(board[i]==player)
    {
      temp[i]=1;
    }
  }

  // comparing with the winning combos
  flag=0;
  let gameWon = null;
  for(var i=0;i<9;i++)
  {
    for(var j=0;j<3;j++)
    {
      if(temp[winCombos[i][j]]===0)
      {
        break;
      }
      else if(j===2)
      {
          flag=1
      }
    }

    // winning combination found
    if(flag==1)
    {
      gameWon = {};
      gameWon['indexOfWinComb']=i;
      gameWon['player']=player;
    }
  }

  //  return the winning details object
  return gameWon;

}
