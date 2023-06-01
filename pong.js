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


// Propriété de la table
let border = 5
let cadreTop= document.getElementById('cadre').offsetTop + border;
let cadreBottom = document.getElementById('cadre').offsetHeight + border;
let cadreLeft = document.getElementById('cadre').offsetLeft + border;
let cadreRight = document.getElementById('cadre').offsetWidth + border;

let partieId;

function start() {
    partieId = setInterval(moveBall, 13);
}

function detectCollision() {
  //let ballLeft = ballXPos;
  //let ballRight = ballXPos + ballWidth;
  //let ballTop = ballYPos;
  //let ballBottom = ballYPos + ballHeight;
  //let raquette1Left = raquette1.offsetLeft;
  //let raquette1Right = raquette1.offsetLeft + raquetteWidth;
  //let raquette1Top = raquette1.offsetTop;
  //let raquette1Bottom = raquette1.offsetTop + raquetteHeight;
  //let raquette2Left = raquette2.offsetLeft;
  //let raquette2Right = raquette2.offsetLeft + raquetteWidth;
  //let raquette2Top = raquette2.offsetTop;
  //let raquette2Bottom = raquette2.offsetTop + raquetteHeight;


  //if (
  //  (ballRight >= raquette1Left && ballLeft <= raquette1Right && ballBottom >= raquette1Top && ballTop <= raquette1Bottom) ||
  //  (ballRight >= raquette2Left && ballLeft <= raquette2Right && ballBottom >= raquette2Top && ballTop <= raquette2Bottom)) {
  //  ballXDir *= -1;
  //}
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

  

  ballXPos += ballXDir;
  ballYPos += ballYDir;

  ball.style.top = ballYPos + 'px';
  ball.style.left = ballXPos + 'px';

  detectBoxCollision();
  detectCollision();
}



function detectBoxCollision() {

  if (ballXPos < cadreLeft || ballXPos > cadreRight) {
    clearInterval(partieId);
    document.getElementById("infos").innerHTML = "GAME OVER";
    document.getElementById("infos").style.display = "block";
  }
}


function init() {
    ball.style.top = ballYPos + 'px';
    ball.style.left = ballXPos + 'px';

    let joueur1 = document.getElementById('j1');
    let joueur2 = document.getElementById('j2');
    remapKeys();
    setInterval(keyboardControlGlobal, 50);
    
}


function keyboardControlGlobal(){
  let raquetteTop
  let newRaquetteTop 
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



let keyPressed = []



      // } else if (event.code === 'KeyQ') {
      //     let raquetteTop = joueur1.offsetTop;
      //     let newRaquetteTop = raquetteTop - 50;
      //     if (newRaquetteTop > cadreTop) {
      //         joueur1.style.top = newRaquetteTop + 'px';
      //         if(!istsarted){
      //           ball.style.top = ball.offsetTop - 50 + 'px';
      //           ballYPos = ballYPos -50;
      //         }
      //     }
      // } else if (event.code === 'KeyA') {
      //     let raquetteTop = joueur1.offsetTop;
      //     let newRaquetteTop = raquetteTop + 50;
      //     if (newRaquetteTop < cadreBottom - joueur1.offsetHeight /2 -5) {
      //         joueur1.style.top = newRaquetteTop + 'px';

      //       if(!istsarted){
      //         ball.style.top = ball.offsetTop + 50 + 'px';
      //         ballYPos = ballYPos +50;
      //       }
      //     }
      // } else if (event.code === 'KeyP') {
      //     let raquetteTop = joueur2.offsetTop;
      //     let newRaquetteTop = raquetteTop - 50;
      //     if (newRaquetteTop > cadreTop) {
      //         joueur2.style.top = newRaquetteTop + 'px';
      //     }
      // } else if (event.code === 'KeyL') {
      //     let raquetteTop = joueur2.offsetTop;
      //     let newRaquetteTop = raquetteTop + 50;
      //     if (newRaquetteTop < cadreBottom - joueur2.offsetHeight /2 -5) {
      //         joueur2.style.top = newRaquetteTop + 'px';
      //     }
       
  







// function keyboardControlGlobal(){
// 	keyPressed.forEach(key => {
// 		switch (key){
// 			case 'Space':
// 					start();
// 					gameState = 1;
//           break;
// 			case 'KeyQ':
// 					let raquetteTop = joueur1.offsetTop;
//           let newRaquetteTop = raquetteTop - 50;
//           if (newRaquetteTop > cadreTop) {
//               joueur1.style.top = newRaquetteTop + 'px';
//               if(!istsarted){
//                 ball.style.top = ball.offsetTop - 50 + 'px';
//                 ballYPos = ballYPos -50;
//               }
//           break;

// 			case 'KeyA':
// 					let raquetteTop = joueur1.offsetTop;
//           let newRaquetteTop = raquetteTop + 50;
//           if (newRaquetteTop < cadreBottom - joueur1.offsetHeight /2 -5) {
//               joueur1.style.top = newRaquetteTop + 'px';

//             if(!istsarted){
//               ball.style.top = ball.offsetTop + 50 + 'px';
//               ballYPos = ballYPos +50;
//             }
//           }
//           break;

//       case 'KeyP':
// 					let raquetteTop = joueur2.offsetTop;
//           let newRaquetteTop = raquetteTop - 50;
//           if (newRaquetteTop > cadreTop) {
//               joueur2.style.top = newRaquetteTop + 'px';
//           }
//           break;
//       case 'KeyL':
// 					let raquetteTop = joueur2.offsetTop;
//           let newRaquetteTop = raquetteTop + 50;
//           if (newRaquetteTop < cadreBottom - joueur2.offsetHeight /2 -5) {
//               joueur2.style.top = newRaquetteTop + 'px';
//           }
//           break;
// 		}
// 	})
// }




// 5 class pour couleur  suppre tt les couleur randint dans index list correspondant a la class pour couleur 




init();
