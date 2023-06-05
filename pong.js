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
let moveballinter
let keyPressed = [];
let logoHeight = document.getElementById("logo").offsetHeight;

// Propriété de la table
let border = 5
let cadreTop= document.getElementById('cadre').offsetTop + border ;
let cadreBottom = document.getElementById('cadre').offsetHeight + border ;
let cadreLeft = document.getElementById('cadre').offsetLeft + border;
let cadreRight = document.getElementById('cadre').offsetWidth + border;

let partieId;


/* clears the interval of the moveballinter variable
   and then sets the interval of the moveballinter variable to 
   the return value of the setInterval function. */

function start() {
  clearInterval(moveballinter);                     
   moveballinter = setInterval(moveBall, 10);    
}
 
/*function that move the ball and manage the ball bounce */
/*switchcolor() is the feature */
function moveBall() {
  let newBallXPos = ballXPos + ballXDir;
  let newBallYPos = ballYPos + ballYDir;


  console.log(newBallXPos > raquette2.offsetLeft - ballWidth)

  if (newBallXPos > raquette2.offsetLeft - ballWidth &&
    ((newBallYPos <= raquette2.offsetTop && newBallYPos+ballHeight >= raquette2.offsetTop) ||
    (newBallYPos >= raquette2.offsetTop && newBallYPos+ballHeight <= raquette2.offsetTop+raquetteHeight) ||
    (newBallYPos <= raquette2.offsetTop+raquetteHeight && newBallYPos+ballHeight >= raquette2.offsetTop+raquetteHeight))) {
    switchcolor();
    ballXDir = -Math.abs(ballXDir);
  }
  if (newBallXPos < raquette1.offsetLeft &&
    ((newBallYPos <= raquette1.offsetTop && newBallYPos+ballHeight >= raquette1.offsetTop) ||
    (newBallYPos >= raquette1.offsetTop && newBallYPos+ballHeight <= raquette1.offsetTop+raquetteHeight) ||
    (newBallYPos <= raquette1.offsetTop+raquetteHeight && newBallYPos+ballHeight >= raquette1.offsetTop+raquetteHeight))) {
    switchcolor();
    ballXDir = Math.abs(ballXDir);
  }

  if (newBallYPos > cadreBottom + border + logoHeight) {
    ballYDir = -Math.abs(ballYDir);
  }
  if (newBallYPos < cadreTop) {
    ballYDir = Math.abs(ballYDir);
  }

  if(newBallXPos > cadreRight){
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

/**Called to stop the game */
function stopgame(x){
  /**Stop the game */
  clearInterval(moveballinter);
  /**Set the score for each player */
  let scoreJ1 = document.querySelector(`.score.J1>p`);
  let scoreJ2 = document.querySelector(`.score.J2>p`);
  if (!x){
    scoreJ1.textContent = parseInt(scoreJ1.textContent)+1;
  }
  else{
    scoreJ2.textContent = parseInt(scoreJ2.textContent)+1;
  }
  /**verify if the game isn't finished */
  if ((scoreJ1.textContent < 5 && scoreJ2.textContent < 5) || (Math.abs(scoreJ1.textContent-scoreJ2.textContent) < 2)){
    
		moveballinter = setInterval(() => ballsticked(x), 13); // Set an interval to stick the ball to a player
		partieId = 0;
    return;
	}

  if (scoreJ1 > scoreJ2) {
    document.getElementById("infos").innerHTML = "Joueur 1 à Gagné";
    document.getElementById("infos").style.display = "block";
    partieId = 1;
  }
    
  else{
    document.getElementById("infos").innerHTML = "Joueur 2 à Gagné";
    document.getElementById("infos").style.display = "block";
    partieId = 1;
  }

}
//0 right 1 left

function ballsticked(x){
  if (!x){ // sticked to J2
    ball.style.top = raquette2.offsetTop +(raquetteWidth/2) +25 + "px";
    ballXDir = -Math.abs(ballXDir);
	} 
  
  else { // sticked to J1
    ball.style.top = raquette1.offsetTop + (raquetteWidth/2) +25 + "px";
    ballXDir = Math.abs(ballXDir);
	} 
}

// Handle start the game inputs
function keyboardControlGlobal(){
  keyPressed.forEach(key => {
    switch (key){
      case 'Space':
        if (partieId===undefined) {
            partieId = 1;
            istsarted = true;
            start();
            document.getElementById("infos").style.display = "none";
        }
        if(partieId === 0){
          partieId = 1;
          start();
          document.getElementById("infos").style.display = "none";
        }
        break;
      case 'KeyQ':
           raquetteTop = raquette1.offsetTop;
           newRaquetteTop = raquetteTop - 40;
          if (newRaquetteTop > cadreTop) {
              raquette1.style.top = newRaquetteTop + 'px';
              if(!istsarted){
                ball.style.top = ball.offsetTop - 40 + 'px';
                ballYPos = ballYPos -50;
              }
            }
          break;

      case 'KeyA':
          raquetteTop = raquette1.offsetTop;
          newRaquetteTop = raquetteTop + 40;
          if (newRaquetteTop < logoHeight + cadreBottom - raquette1.offsetHeight /2 -5) {
              raquette1.style.top = newRaquetteTop + 'px';

            if(!istsarted){
              ball.style.top = ball.offsetTop + 40 + 'px';
              ballYPos = ballYPos +40;
            }
          }
          break;

      case 'KeyP':
           raquetteTop = raquette2.offsetTop;
           newRaquetteTop = raquetteTop - 40;
          if (newRaquetteTop > cadreTop) {
              raquette2.style.top = newRaquetteTop + 'px';
          }
          break;
      case 'KeyL':
          raquetteTop = raquette2.offsetTop;
          newRaquetteTop = raquetteTop + 40;
          if (newRaquetteTop < logoHeight +cadreBottom - raquette2.offsetHeight /2 -5) {
              raquette2.style.top = newRaquetteTop + 'px';
          }
          break;
    }
  })
}

/*Remap key press to avoid "writting behavior"
https://stackoverflow.com/a/3691661/21143650*/
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

/**Choose one the color on the old Apple logo */
function switchcolor(){
  ball.style.backgroundColor = "transparent";
  /**Choose a number between 0 and 5 */
  var randomcol = Math.floor(Math.random()*6);
  var backgroundColor;
  switch (randomcol) {
    case 0:
      backgroundColor = "#009DDC";
      break;
    case 1:
      backgroundColor = "#963D97";
      break;
    case 2:
      backgroundColor = "#E03A3E";
      break;
    case 3:
      backgroundColor = "#F5821F";
      break;
    case 4:
      backgroundColor = "#FDB827";
      break;
    case 5:
      backgroundColor = "#61BB46";
      break;
  }
  ball.style.backgroundColor = backgroundColor;
}

init();
