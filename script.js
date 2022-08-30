const startButton = document.querySelector(".start");
const start = document.querySelector(".startContainer")
const game = document.querySelector(".game")
const selection = document.querySelector(".selection")
const song1 = document.querySelector(".song1")
const song2 = document.querySelector(".song2")
const song3 = document.querySelector(".song3")
const move = document.querySelector(".move")

let song;
let startGame;

startButton.addEventListener("click", () => {
    start.classList.add("hide") 
    selection.classList.remove("hide") 
})

song1.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 1;
    startGame = true
    spawnDisc()
})
song2.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    song = 2;
})
song3.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    song = 3;
})

function spawnDisc() {
    if(song == 1){
        for(let i = 0; i < 6; i++){
            let newContainer = document.createElement("div");
            newContainer.classList.add("container");
            newContainer.y = 45 - (100 * (i + 1));
            newContainer.style.top = newContainer.y + "px";
            newContainer.style.right = Math.floor(Math.random() * 800) + 'px';
            game.appendChild(newContainer)
            let newDisc = document.createElement("div");
            newDisc.classList.add("disc1");
            newContainer.appendChild(newDisc)
            let newSign = document.createElement("div");
            newSign.classList.add("sign");
            newContainer.appendChild(newSign)
            console.log(newContainer)
        }
    }
}

function handleInput(){
    if(startGame == true){
        move.style.animationPlayState = "paused";
        console.log("jump")
    }
}