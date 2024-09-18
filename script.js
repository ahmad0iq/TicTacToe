let x = document.getElementById("x");
let o = document.getElementById("o");
let boxes = document.querySelectorAll(".boxes");
let turn = false; //0 means X, 1 means O
let turnBtn = document.querySelector(".turn");
let winner = document.querySelector(".winner");
let reset = document.querySelector(".reset");
let newGame = document.querySelector(".new-game");

const winPattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

o.onclick = () => {
    x.classList.remove("turn-indicator");
    o.classList.add("turn-indicator");
    turn = true;
}
x.onclick = () => {
    o.classList.remove("turn-indicator");
    x.classList.add("turn-indicator");
    turn = false;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        x.disabled=true;
        o.disabled=true;
        if(turn){
            box.innerText = "O";
            o.classList.remove("turn-indicator");
            x.classList.add("turn-indicator");
            turn = false;
        }
        else{
            box.innerText = "X";
            o.classList.add("turn-indicator");
            x.classList.remove("turn-indicator");
            turn = true;
        }
        box.disabled=true;

        checkWinner();
    })
});

const checkWinner = (box) => {
    let isDraw = true;
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText.trim();
        let pos2 = boxes[pattern[1]].innerText.trim();
        let pos3 = boxes[pattern[2]].innerText.trim();

        if(pos1 != "" && pos2 != "" && pos3 != "" ){
            if(pos1===pos2 && pos2 === pos3){
                winnerMsg(pos1);
                boxes.forEach((box) => {
                    box.disabled=true;
                });
                return;
            }
        }
    }

    boxes.forEach((box) => {
        if (box.innerText.trim() === ""){
            isDraw = false;
        }
    });

    if (isDraw) {
        drawMsg();
    }
}


const winnerMsg = (pos1) => {
    winner.innerText= `${pos1} is Winner.`;
    winner.classList.toggle("display-none");
    turnBtn.classList.toggle("display-none");
    reset.classList.toggle("display-none");
    newGame.classList.toggle("display-none");
}
const drawMsg = () => {
    winner.innerText= `Draw.`;
    winner.classList.toggle("display-none");
    turnBtn.classList.toggle("display-none");
    reset.classList.toggle("display-none");
    newGame.classList.toggle("display-none");
}

newGame.addEventListener("click", () => {
    winner.classList.add("display-none");
    turnBtn.classList.remove("display-none");
    boxes.forEach((box) => {
        box.innerText= "";
        box.disabled = false;
    });
    newGame.classList.add("display-none");
    reset.classList.remove("display-none");
    o.classList.remove("turn-indicator");
    x.classList.add("turn-indicator");
    turn = false;
    x.disabled=false;
    o.disabled=false;
})

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText= "";
        box.disabled = false;
    });
    o.classList.remove("turn-indicator");
    x.classList.add("turn-indicator");
    turn = false;
    x.disabled=false;
    o.disabled=false;
})
