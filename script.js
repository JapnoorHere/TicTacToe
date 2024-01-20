let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btn");
let winnertext = document.querySelector(".winnerText");
let turn = "O";
let count = 0;
let win = false;


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

var xAudio = new Audio("oAudio.wav");
var oAudio = new Audio("xAudio.mp3");
var clappingAudio = new Audio("clappingAudio.mp3");
var losingAudio = new Audio("losingAudio.wav");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    winnertext.style.opacity = "1";
    if (turn == "O") {
      oAudio.play();
      box.innerHTML = "O";
      box.style.color = "#faaa68";
      winnertext.style.color = "#00ced1";
      turn = "X";
    } else {
      xAudio.play();
      box.innerHTML = "X";
      turn = "O";
      winnertext.style.color = "#faaa68";
      box.style.color = "#00ced1";
    }
    winnertext.innerHTML = "Player " + turn + "'s turn";
    box.disabled = true;
    ++count;
    checkWinner();
  });
});

function declareWinner(winner, firstBox, secondBox, thirdBox) {
  clappingAudio.play();
  winnertext.innerHTML = "Winner is Player " + winner;
  firstBox.style.backgroundColor = "#8be68b";
  secondBox.style.backgroundColor = "#8be68b";
  thirdBox.style.backgroundColor = "#8be68b";
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

function declareTie() {
  winnertext.innerHTML = "It's a Tie!";
  boxes.forEach((box) => {
    box.disabled = true;
  });
  losingAudio.play();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
      let firstPos = boxes[pattern[0]].innerHTML;
      let secondPos = boxes[pattern[1]].innerHTML;
      let thirdPos = boxes[pattern[2]].innerHTML;
  
      let firstBox = boxes[pattern[0]];
      let secondBox = boxes[pattern[1]];
      let thirdBox = boxes[pattern[2]];
  
      if (firstPos != "" && secondPos != "" && thirdPos != "") {
        if (firstPos == secondPos && secondPos == thirdPos) {
          declareWinner(firstPos, firstBox, secondBox, thirdBox);
          return;
        }
      }
    }
  
    if (count === 9 && !win) {
      declareTie();
    }
  };


const resetGame = () => {
  winnertext.innerHTML = "Player O's turn";
  turn = "O";

  boxes.forEach((box) => {
    win = false;
    count = 0;
    box.disabled = false;
    box.innerHTML = "";
    box.style.backgroundColor = "#232c46";
  });
};

resetBtn.addEventListener("click", resetGame);
