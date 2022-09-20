const startButton = document.querySelector(".startButton");
const start = document.querySelector(".startContainer")
const game = document.querySelector(".game")
const selection = document.querySelector(".selection")
const easy = document.querySelector(".easy")
const normal = document.querySelector(".normal")
const hard = document.querySelector(".hard")
const move = document.querySelector(".move")
const final = document.querySelector(".final")
const text = document.querySelector(".text")
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

let player = {step: 2}

startButton.addEventListener("click", () => {
    start.classList.add("hide") 
    selection.classList.remove("hide") 
})

easy.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 4;
    began()
})
normal.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 6;
    began()
})
hard.addEventListener("click", () => {
    selection.classList.add("hide")
    game.classList.remove("hide")
    song = 8;
    began()
})
playAgain.addEventListener("click", () => {
    final.classList.add("hide")
    game.classList.remove("hide")
    remove()
    began()
})
home.addEventListener("click", () => {
    final.classList.add("hide")
    start.classList.remove("hide")
    remove()
})

function began(){
    startGame = true
    jump = false
    next = 1;
    move.style.animationPlayState = "running";
    spawnDisc()
}

function spawnDisc() {
        for(let i = 0; i < song; i++){
            border = game.getBoundingClientRect();
            let newContainer = document.createElement("div");
            newContainer.classList.add("container");
            newContainer.classList.add(`c${i}`);
            newContainer.y = Math.floor((border.height / 4 + border.height /2) - (250 * i));
            newContainer.x = Math.floor(Math.random() * (border.width - 150))
            if(i == 0){
                newContainer.x = Math.floor(border.width / 2 - 150)
                move.x = newContainer.x + 100
                move.y = newContainer.y + 68
                move.style.right = move.x  + 'px';
                move.style.top = move.y  + 'px';
                console.log(newContainer.x, newContainer.y)
                console.log(move.x, move.y)

            }
            newContainer.style.top = newContainer.y + "px";
            newContainer.style.right = newContainer.x  + 'px';
            game.appendChild(newContainer)
            let newDisc = document.createElement("div");
            newDisc.classList.add("disc1");
            newContainer.appendChild(newDisc)
            let newSign = document.createElement("div");
            newSign.classList.add("sign");
            newContainer.appendChild(newSign)
        }
}

function handleInput(){
    if(startGame == true){
        if(jump == false){
            let style = window.getComputedStyle(move, null);
            let rotation = style.getPropertyValue("transform")

            var values = rotation.split('(')[1],
            values = values.split(')')[0],
            values = values.split(',');

            angle = Math.round(Math.asin(values[1]) * (180/Math.PI));
            
            if(angle < 45 && angle > -90 ){
                jump = moving = true
                move.style.animationPlayState = "paused";
                console.log(next)
            }
            console.log(angle)
        }
        if(jump == true){
            let nextContainer = document.querySelector(`.c${next}`)
            if(nextContainer.x >= (move.x - 300) && nextContainer.x < (move.x)  && nextContainer.y >= (move.y - 200) && nextContainer.y < (move.y) && moving == true){
                console.log("stop")
                let signRemove = document.querySelector(`.c${next - 1} .sign`)
                move.style.animationPlayState = "running";
                move.x = nextContainer.x + 100
                move.y = nextContainer.y + 68
                move.style.right = move.x  + 'px';
                move.style.top = move.y + 'px';
                signRemove.classList.add("hide")
                moving = false
                let delay = setTimeout(() => {
                    cancelAnimationFrame(repeat)
                    next += 1
                    jump = false
                    checkEnd()
                    console.log(next)
                    return
                  }, 1000);
            }
            if(moving == false){
                let allContainer = document.querySelectorAll(".container")
            
                allContainer.forEach(function(item){
                    item.y = item.y + player.step;
                    item.style.top = item.y +"px";
                })
                move.y = move.y+ player.step;
                move.style.top = move.y +"px";
                repeat = window.requestAnimationFrame(handleInput);
                return
            }
            if(nextContainer.y > (border.height - 200)){
                console.log("stop")
                game.classList.add("hide")
                final.classList.remove("hide")
                text.innerHTML = `
                <img class="pic" src="./img/niceTry.png">
                <p>Nice Try!</p>`
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