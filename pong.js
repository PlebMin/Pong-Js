// Propriétés de la balle
let ball = document.getElementById('ball');
let ballXDir = 5;
let ballYDir = 5;
let ballXPos = 70;
let ballYPos = 240;
let ballWidth = 40;
let ballHeight = 40;
let raquette1 = document.getElementById('j1');
let raquette2 = document.getElementById('j2');
let raquetteWidth = raquette1.offsetWidth;
let raquetteHeight = raquette1.offsetHeight;
let istsarted = false;
let raquetteTop
let newRaquetteTop 
let keyPressed = [];

// Propriété de la table
let border = 5
let cadreTop= document.getElementById('cadre').offsetTop + border;
let cadreBottom = document.getElementById('cadre').offsetHeight + border;
let cadreLeft = document.getElementById('cadre').offsetLeft + border;
let cadreRight = document.getElementById('cadre').offsetWidth + border;

let partieId;

function start() {
    setInterval(moveBall, 13);
}


function moveBall() {
  let newBallXPos = ballXPos + ballXDir;
  let newBallYPos = ballYPos + ballYDir;


  console.log(newBallXPos > raquette2.offsetLeft - ballWidth)

  if (newBallXPos > raquette2.offsetLeft - ballWidth &&
    ((newBallYPos <= raquette2.offsetTop && newBallYPos+ballHeight >= raquette2.offsetTop) ||
    (newBallYPos >= raquette2.offsetTop && newBallYPos+ballHeight <= raquette2.offsetTop+raquetteHeight) ||
    (newBallYPos <= raquette2.offsetTop+raquetteHeight && newBallYPos+ballHeight >= raquette2.offsetTop+raquetteHeight))) {
    ballXDir = -Math.abs(ballXDir);
  }
  if (newBallXPos < raquette1.offsetLeft &&
    ((newBallYPos <= raquette1.offsetTop && newBallYPos+ballHeight >= raquette1.offsetTop) ||
    (newBallYPos >= raquette1.offsetTop && newBallYPos+ballHeight <= raquette1.offsetTop+raquetteHeight) ||
    (newBallYPos <= raquette1.offsetTop+raquetteHeight && newBallYPos+ballHeight >= raquette1.offsetTop+raquetteHeight))) {
    ballXDir = Math.abs(ballXDir);
  }

  if (newBallYPos > cadreBottom) {
    ballYDir = -Math.abs(ballYDir);
  }
  if (newBallYPos < cadreTop) {
    ballYDir = Math.abs(ballYDir);
  }

  if(newBallXPos > cadreRight - ballWidth + raquetteWidth){
    ballXPos = cadreRight - ballWidth + raquetteWidth;
    ballYPos += ballYDir;
    stopgame(0);
    return;
  }
  
  if(newBallXPos < cadreLeft){
    ballXPos = cadreLeft;
    ballYPos += ballYDir;
    stopgame(1);
    return;
  }

  ballXPos += ballXDir;
  ballYPos += ballYDir;

  ball.style.top = ballYPos + 'px';
  ball.style.left = ballXPos + 'px';

  
}




function init() {
    ball.style.top = ballYPos + 'px';
    ball.style.left = ballXPos + 'px';

    let joueur1 = document.getElementById('j1');
    let joueur2 = document.getElementById('j2');

    remapKeys();
    setInterval(keyboardControlGlobal, 50);
    
}

function stopgame(x){
  clearInterval(moveballinter)

  let scoreJ1 = document.getElementsByClassName("scoreJ1");
  let scoreJ2 = document.getElementsByClassName("scoreJ2");
  if (!x){
    scoreJ1.textContent = parsInt(scoreJ1.textContent)+1;
  }
  else{
    scoreJ2.textContent = parsInt(scoreJ2.textContent)+2;
  }
  

  if (scoreJ1 > scoreJ2) {
    document.getElementById("infos").innerHTML = "GAME OVER1";
    document.getElementById("infos").style.display = "block";
    clearInterval(partieId);
  }
    
  else{
    document.getElementById("infos").innerHTML = "GAME OVER2";
    document.getElementById("infos").style.display = "block";
    clearInterval(partieId);
  }

}
//0 right 1 left

function ballsticked(x){
  if (!x) {
    ballXDir = -Math.abs(ballXDir);

  }
  else{ 
    ballXDir = Math.abs(ballXDir);
  }
}

function keyboardControlGlobal(){
  
  keyPressed.forEach(key => {
    switch (key){
      case 'Space':
        if (partieId===undefined) {
            istsarted = true;
            start();
        }
        break;
      case 'KeyQ':
           raquetteTop = raquette1.offsetTop;
           newRaquetteTop = raquetteTop - 50;
          if (newRaquetteTop > cadreTop) {
              raquette1.style.top = newRaquetteTop + 'px';
              if(!istsarted){
                ball.style.top = ball.offsetTop - 50 + 'px';
                ballYPos = ballYPos -50;
              }
            }
          break;

      case 'KeyA':
          raquetteTop = raquette1.offsetTop;
          newRaquetteTop = raquetteTop + 50;
          if (newRaquetteTop < cadreBottom - raquette1.offsetHeight /2 -5) {
              raquette1.style.top = newRaquetteTop + 'px';

            if(!istsarted){
              ball.style.top = ball.offsetTop + 50 + 'px';
              ballYPos = ballYPos +50;
            }
          }
          break;

      case 'KeyP':
           raquetteTop = raquette2.offsetTop;
           newRaquetteTop = raquetteTop - 50;
          if (newRaquetteTop > cadreTop) {
              raquette2.style.top = newRaquetteTop + 'px';
          }
          break;
      case 'KeyL':
          raquetteTop = raquette2.offsetTop;
          newRaquetteTop = raquetteTop + 50;
          if (newRaquetteTop < cadreBottom - raquette2.offsetHeight /2 -5) {
              raquette2.style.top = newRaquetteTop + 'px';
          }
          break;
    }
  })
}

function remapKeys(){
  // Remap key press
  document.onkeydown = e => {
    if (keyPressed.includes(e.code)){ return; }
    keyPressed.push(e.code) // Add to keypresses
  }
  // Remap key release
  document.onkeyup = e => {
    if (!keyPressed.includes(e.code)){ return; }
    keyPressed.splice(keyPressed.indexOf(e.code), 1); // Remove key press
  }
  // If window out of focus, clear keys
  window.onblur = () => {
    keyPressed = [];
  }

}







    


// 5 class pour couleur  suppre tt les couleur randint dans index list correspondant a la class pour couleur 




init();
