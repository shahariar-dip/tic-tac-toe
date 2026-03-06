const boxes = document.querySelectorAll(".box");
const msg = document.querySelector("#msg");
const msgContainer = document.querySelector(".msg-container");
const resetBtn = document.querySelector(".reset-btn");
const newGame = document.querySelector(".new-btn");
const turnMsg = document.querySelector("#turn");
const startXBtn = document.querySelector("#startX");
const startOBtn = document.querySelector("#startO");
const turnSelect = document.querySelector(".turn-select");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let turnO = true;
let gameStarted = false;

startXBtn.addEventListener("click", () => {
    turnO = false;
    turnMsg.innerText = "Turn: X";
    turnSelect.classList.add("hide");
    gameStarted = true;
});

startOBtn.addEventListener("click", () => {
    turnO = true;
    turnMsg.innerText = "Turn: O";
    turnSelect.classList.add("hide");
    gameStarted = true;
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!gameStarted || box.innerText !== "") return;
        
        if(turnO){
           box.innerText = "O";
           box.style.color = "green";
           box.style.backgroundColor = "rgba(0,128,0,0.4)"
           turnMsg.innerText = "Turn: X";
           turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "blue";
            box.style.backgroundColor = "rgba(0,0,255,0.4)"
            turnMsg.innerText = "Turn: O";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
   let winnerFound = false;
   for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                winnerFound = true;
                msg.innerText = `Congratulation! winner is ${pos1val}`;
                msgContainer.classList.remove("hide");
                boxes.forEach((box) => {
                    box.classList.remove("border");
                });
                boxes[pattern[0]].style.backgroundColor = "rgba(255,255,0,0.4)";
                boxes[pattern[1]].style.backgroundColor = "rgba(255,255,0,0.4)";
                boxes[pattern[2]].style.backgroundColor = "rgba(255,255,0,0.4)";
                resetBtn.classList.add("hide");
                turnMsg.classList.add("hide");
                disable();
                gameStarted = false;
            }
        }
    }
    let filled = true;
    boxes.forEach((box) => {
        if(box.innerText === ""){
            filled = false;
        }
    })
    if(!winnerFound && filled){
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        turnMsg.classList.add("hide");
        resetBtn.classList.add("hide");
        gameStarted = false;
    }
};

const disable = () => {
    for(let box of boxes){
    box.disabled = true;
    }
};

const resetGame = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    turnO = true;
    gameStarted = false;

    turnMsg.innerText = "Select Turn First";
    resetBtn.classList.remove("hide");
    turnMsg.classList.remove("hide");
    msgContainer.classList.add("hide");
    turnSelect.classList.remove("hide");
        boxes.forEach((box) => {
                    box.classList.add("border");
                    box.style.backgroundColor = "";
                });
};

resetBtn.addEventListener("click", () => {resetGame();});
newGame.addEventListener("click", () => { resetGame();});
