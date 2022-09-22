const startButton = document.querySelector(".startButton");
const start = document.querySelector(".startContainer")
const game = document.querySelector(".game")
const body = document.querySelector("body")
const selection = document.querySelector(".selection")
const easy = document.querySelector(".easy")
const normal = document.querySelector(".normal")
const hard = document.querySelector(".hard")
const move = document.querySelector(".move")
const final = document.querySelector(".final")
const text = document.querySelector(".text")
const ready = document.querySelector(".ready")
const readyButton = document.querySelector(".readyButton")
const playAgain = document.querySelector(".playAgain")
const home = document.querySelector(".home")

let song;
let startGame;
let jump
let angle
let border
let next
let repeat
let moving;
let stop;

let distance
let needleX
let needleY
let offsetX
let offsetY
let range
let moveContainerX


var values

let player = {step: 2}

Input()

function Input() {
    window.addEventListener("click", mobileInput, {once: true})
}

function mInput() {
    window.addEventListener("click", mobileInput, {once: true})
}

startButton.addEventListener("click", () => {
    start.classList.add("hide") 
    selection.classList.remove("hide") 
})

easy.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 4;
    getReady()
})
normal.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 6;
    getReady()
})
hard.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 8;
    getReady()
})
playAgain.addEventListener("click", () => {
    final.classList.add("hide")
    start.classList.remove("hide")
    remove()
})

readyButton.addEventListener("click", () => {
    ready.classList.add("hide")
    began()
})

function getReady(){
    move.style.animationPlayState = "running";
    spawnDisc()
    ready.classList.remove("hide")
}

function began(){
    next = 1;
    let delay = setTimeout(() => {
        startGame = true
        jump = false
        stop = false
      }, 1000);
}

function spawnDisc() {
        for(let i = 0; i < song; i++){
            border = game.getBoundingClientRect();
            let newContainer = document.createElement("div");
            newContainer.classList.add("container");
            newContainer.classList.add(`c${i}`);
            if(border.width > 500 && border.width < 1900){
                distance = 400
                moveContainerX = 100
                offsetX = -15
                offsetY = 7
                range = 129
                player = {step: 3}
            }
            if(border.width > 360 && border.width < 380){
                distance = 250
                moveContainerX = 60
                offsetX = 9
                offsetY = 10
                range = 90
                player = {step: 2}
            }
            newContainer.y = Math.floor((border.height / 4 + border.height /2) - (distance * i));
            newContainer.x = Math.floor(Math.random() * ((border.width - 150) - moveContainerX))
            if(i == 0){
                newContainer.x = Math.floor(border.width / 2 - 150)
                needleX = Math.floor((border.width * offsetX / 100));
                needleY =  Math.floor((border.height * offsetY / 100));
                move.x = newContainer.x + needleX 
                move.y = newContainer.y + needleY 
                move.style.right = move.x  + 'px';
                move.style.top = move.y  + 'px';
            }
            newContainer.style.top = newContainer.y + "px";
            newContainer.style.right = newContainer.x  + 'px';
            game.appendChild(newContainer)
            let newDisc = document.createElement("div");
            newDisc.classList.add("disc");
            newContainer.appendChild(newDisc)
            let newSign = document.createElement("div");
            newSign.classList.add("sign");
            newContainer.appendChild(newSign)
        }
}

function mobileInput(e){
    if(startGame == true & stop == false){
        handleInput()
        mInput()
    }
    else{
        mInput()
    }
}

function handleInput(){
    if(startGame == true){
        if(jump == false){
            let style = window.getComputedStyle(move, null);
            let rotation = style.getPropertyValue("transform")

            values = rotation.split('(')[1],
            values = values.split(')')[0],
            values = values.split(',');

            angle = Math.round(Math.asin(values[1]) * (180/Math.PI));
            console.log(angle)
            if(angle < 45 && angle > -90 ){
                jump = moving = stop = true
                move.style.animationPlayState = "paused";
            }
        }
        if(jump == true){
            let nextContainer = document.querySelector(`.c${next}`)
            if(nextContainer.x >= (move.x - range - needleX) && nextContainer.x < (move.x + range - needleX)  && 
            nextContainer.y >= (move.y - range - needleY) && nextContainer.y < (move.y - needleY) && moving == true){
                move.style.animationPlayState = "running";
                move.x = nextContainer.x + needleX
                move.y = nextContainer.y + needleY
                move.style.right = move.x  + 'px';
                move.style.top = move.y + 'px';

                moving = false
                let delay = setTimeout(() => {
                    cancelAnimationFrame(repeat)
                    next += 1
                    jump = stop = false
                    checkEnd()
                    return
                  }, 500);
            }
            if(moving == false){
                let allContainer = document.querySelectorAll(".container")
                
                if(nextContainer.x < border.width / 4){
                    allContainer.forEach(function(item){
                        item.x = item.x + player.step;
                        item.style.right = item.x +"px";
                    })
                    move.x = move.x+ player.step;
                    move.style.right = move.x +"px";
                }

                if(nextContainer.x > (border.width / 4 + border / 2)){
                    allContainer.forEach(function(item){
                        item.x = item.x - player.step;
                        item.style.right = item.x +"px";
                    })
                    move.x = move.x - player.step;
                    move.style.right = move.x +"px";
                }
                
                allContainer.forEach(function(item){
                    item.y = item.y + player.step;
                    item.style.top = item.y +"px";
                })
                move.y = move.y+ player.step;
                move.style.top = move.y +"px";
                repeat = window.requestAnimationFrame(handleInput);
                return
            }
            if(nextContainer.y > (border.height)){
                game.classList.add("hide")
                final.classList.remove("hide")
                text.innerHTML = `
                <img class="pic" src="./img/niceTry.png">
                <p>Nice try!</p>`
                cancelAnimationFrame(repeat)
                jump = false
                startGame = false
                return
            }
            if(angle < 1 && angle > -45){
                let allContainer = document.querySelectorAll(".container")
            
                allContainer.forEach(function(item){
                    item.y = item.y + player.step;
                    item.style.top = item.y +"px";
                })
                repeat = window.requestAnimationFrame(handleInput);
                return
            }
            if(angle > -1 && angle < 45){
                let allContainer = document.querySelectorAll(".container")
            
                allContainer.forEach(function(item){
                    item.y = item.y + player.step;
                    item.x = item.x - player.step;
                    item.style.top = item.y +"px";
                    item.style.right = item.x +"px";
                })
                repeat = window.requestAnimationFrame(handleInput);
                return
            }
            if(angle < -45 && angle > -90){
                let allContainer = document.querySelectorAll(".container")
            
                allContainer.forEach(function(item){
                    item.y = item.y + player.step;
                    item.x = item.x + player.step;
                    item.style.top = item.y +"px";
                    item.style.right = item.x +"px";
                })
                repeat = window.requestAnimationFrame(handleInput);
                return
            }
        }
    }
}

function checkEnd(){
    if(next == song){
        let delay = setTimeout(() => {
            game.classList.add("hide")
            final.classList.remove("hide")
            text.innerHTML = `
            <img class="pic" src="./img/wellDone.png">
            <p>Well Done!</p>`
            jump = false
            startGame = false
            return
          }, 500);
    }
}
function remove(){
    let container = document.querySelectorAll(".container");
    
    console.log(container)
    container.forEach(function(item){
        game.removeChild(item);
    })
}