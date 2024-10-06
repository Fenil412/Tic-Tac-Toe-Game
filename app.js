let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turnMsg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

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

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnMsg.classList.remove("hide");
  turnMsg.innerText = "Player O's turn";
  resetBtn.style.marginBottom = "0";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnMsg.innerText = "Player X's turn";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnMsg.innerText = "Player O's turn";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (isWinner) {
      turnMsg.classList.add("hide"); // Hide turn message when game is over
    } else if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  turnMsg.classList.add("hide");
  disableBoxes();
  resetBtn.style.marginBottom = "4vmin";
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7";    
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  turnMsg.classList.add("hide");
  disableBoxes();
  resetBtn.style.marginBottom = "4vmin";
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        boxes[pattern[0]].style.backgroundColor = "#ce9642";
        boxes[pattern[1]].style.backgroundColor = "#ce9642";
        boxes[pattern[2]].style.backgroundColor = "#ce9642";
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);