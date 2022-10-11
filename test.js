"use strict"

const snakeHeadBottomImg = new Image();
const snakeHeadLeftImg = new Image();
const snakeHeadRightImg = new Image();
const snakeHeadUpImg = new Image();
const snakeBodyImg = new Image();
const appleImg = new Image();
const snakeHead = new Image();

preload();

const playGame = document.getElementById('play_game');
const container = document.getElementById('container');
const flexContainer = document.getElementById('flex_container');
const exit = document.getElementById('exit');
const leaderBoardButton = document.getElementById('create_leader_board');
const mainMenu = document.getElementById('main_menu')

const canvas = document.createElement('canvas');
canvas.id = 'canvas';

const game = document.createElement('div');
game.id = 'game';

const end = document.createElement('div');
end.id = 'end_Window';

const title = document.createElement('div');
title.id = 'title';
title.innerHTML = 'You loose!'

const endGameScores = document.createElement('div');
endGameScores.style.fontFamily = 'Undertale-Battle-Font'

const buttonAgain = document.createElement('div');
buttonAgain.id = 'button_Again'
buttonAgain.innerHTML = 'Replay';

const buttonExit = document.createElement('div');
buttonExit.id = 'exit';
buttonExit.innerHTML = 'Exit';


const newRecordWindow = document.createElement('div');
newRecordWindow.id = 'new_Record_Window';

const newRecordWindowTitle = document.createElement('div');
newRecordWindowTitle.innerHTML = 'Congratulations!'

const newRecordWindowDiscription1 = document.createElement('div');
newRecordWindowDiscription1.innerHTML = 'You entered the top-10.'

const newRecordWindowDiscription2 = document.createElement('div');
newRecordWindowDiscription2.innerHTML = 'Enter your nickname. Nickname must includes 5 symbols.'
newRecordWindowDiscription2.style.textAlign = 'center';

const newRecordWindowInput = document.createElement('input');
newRecordWindowInput.id = 'new_record_window_input'

const newRecordWindowError = document.createElement('div');
newRecordWindowError.innerHTML = 'Nickname is incorrect.'
newRecordWindowError.style.visibility = 'hidden';

const newRecordWindowOk = document.createElement('button');
newRecordWindowOk.id = 'button_ok'
newRecordWindowOk.innerHTML = 'OK'

const counterDiv = document.createElement('div');

playGame.addEventListener('click', createGame, false);
playGame.addEventListener('touchStart', createGame, false);

const soundEat = new Audio();
soundEat.src = 'sounds/eat.mp3';

function createGame() {
  clickSoundInit();

  window.navigator.vibrate(200)

  const widthScreen =  window.innerWidth;
  const heightScreen = window.innerHeight;

  // Adaptive for Canvas

  let gameSize;

  if (widthScreen >= heightScreen) {
    if(heightScreen < 320 && heightScreen >= 200) {
      gameSize = 225;
    } else if (heightScreen < 480 && heightScreen >= 320) {
      gameSize = 300;
    } else if (heightScreen < 540 && heightScreen >= 480) {
      gameSize = 375;
    } else if (heightScreen < 620 && heightScreen >= 540) {
      gameSize = 450;
    } else if (heightScreen < 720 && heightScreen >= 620) {
      gameSize = 525;
    } else if (heightScreen < 800 && heightScreen >= 720) {
      gameSize = 600;
    } else if (heightScreen < 900 && heightScreen >= 800) {
      gameSize = 675;
    } else if (heightScreen < 1080 && heightScreen >= 900) {
      gameSize = 750;
    } else if (heightScreen < 1200 && heightScreen >= 1080) {
      gameSize = 975;
    } else if (heightScreen < 1366 && heightScreen >= 1200) {
      gameSize = 1050;
    } else if (heightScreen < 1440 && heightScreen >= 1366) {
      gameSize = 1125;
    } else if (heightScreen < 1600 && heightScreen >= 1440) {
      gameSize = 1200;
    } else if (heightScreen < 1700 && heightScreen >= 1600) {
      gameSize = 1275;
    } else if (heightScreen < 1800 && heightScreen >= 1700) {
      gameSize = 1350;
    } else if (heightScreen <= 1920 && heightScreen >= 1800) {
      gameSize = 1425;
    } else {
      alert('С таким-то экраном змейка явно не для вас.')
    }
  }

  if (widthScreen <= heightScreen) {
    if(widthScreen < 320 && widthScreen >= 200) {
      gameSize = 225;
    } else if (widthScreen < 480 && widthScreen >= 320) {
      gameSize = 300;
    } else if (widthScreen < 540 && widthScreen >= 480) {
      gameSize = 450;
    } else if (widthScreen < 640 && widthScreen >= 540) {
      gameSize = 525;
    } else if (widthScreen < 720 && widthScreen >= 640) {
      gameSize = 600;
    } else if (widthScreen < 800 && widthScreen >= 720) {
      gameSize = 675;
    } else if (widthScreen < 854 && widthScreen >= 800) {
      gameSize = 750;
    } else if (widthScreen < 1080 && widthScreen >= 854) {
      gameSize = 825;
    } else if (widthScreen < 1125 && widthScreen >= 1080) {
      gameSize = 975;
    } else if (widthScreen < 1170 && widthScreen >= 1125) {
      gameSize = 1050;
    } else if (widthScreen < 1242 && widthScreen >= 1170) {
      gameSize = 1125;
    } else if (widthScreen < 1440 && widthScreen >= 1242) {
      gameSize = 1200;
    }
  }

  end.style.width = gameSize/100 * 60 + 'px';
  end.style.maxHeight = gameSize/100 * 60 + 'px';
  newRecordWindow.style.width = gameSize/100 * 80 + 'px';
  newRecordWindow.style.maxHeight = gameSize/100 * 80 + 'px';

  // Сanvas
  canvas.setAttribute('width', gameSize)
  canvas.setAttribute('height', gameSize)
  let ctx = canvas.getContext('2d');

  // Cell size

  let cell = gameSize/15;

  // Snake class & svg

  class snake {
    constructor(x, y) {
      this.snake = [{
        x: x,
        y: y
      }];
    }

    eatTail(head, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
          endGame();
        }
      }
    }

    outwardField(snakeX, snakeY) {
      if (snakeX < 0 || snakeX > cell*14 || snakeY < 0 || snakeY > cell*14) {
        endGame();
      }
    }

    replay() {
      snakeObj.snake[0].x = 7*cell
      snakeObj.snake[0].y = 7*cell

      dir = 'none';
      
      counterObj.scores = 0;
      
      this.snake.splice(1);
    }
  }

  // Apple class & svg
  class apple {
    constructor() {
      this.x = Math.floor((Math.random() * 15)) * cell;
      this.y = Math.floor((Math.random() * 15)) * cell; 
    }

    new() {
      let randomCellX = Math.floor((Math.random() * 15)) * cell;
      let randomCellY = Math.floor((Math.random() * 15)) * cell;
      for (let i = 0; i < snakeObj.snake.length; i++) {
        if (randomCellX == snakeObj.snake[i].x && randomCellY == snakeObj.snake[i].y) {
          this.new();
          break;
        } else {
          this.x = randomCellX;
          this.y = randomCellY;
        }
      } 
    }
  }

  // Counter class

  class counter {
    constructor(scores) {
      this.scores = scores;
    }

    update() {
      counterDiv.innerHTML = `Scores: ${this.scores}`;    
    }
  }

  // Control

  document.addEventListener('keydown', direction);
    
  let dir;

  function direction(e) {
    if ((e.keyCode == 37 || e.keyCode == 65) && dir != 'right') {
      dir = 'left';
      snakeHead.src = snakeHeadLeftImg.src;
    } else if ((e.keyCode == 38 || e.keyCode == 87) && dir != 'down') {
      dir = 'up'
      snakeHead.src = snakeHeadUpImg.src;
    } else if ((e.keyCode == 39 || e.keyCode == 68) && dir != 'left') {
      dir = 'right'
      snakeHead.src = snakeHeadRightImg.src;
    } else if ((e.keyCode == 40 || e.keyCode == 83) && dir != 'up') {
      dir = 'down'
      snakeHead.src = snakeHeadBottomImg.src;
    }
  }

  // Pop-up window after loose

  function endGame() {
    let table;
    let newRecordWindowInputValue;
    let error;
    let randomPassword = Math.random();

    buttonAgain.addEventListener('touchstart', again, false);
    buttonAgain.addEventListener('click', again, false);
    buttonExit.addEventListener('touchstart', exit, false);
    buttonExit.addEventListener('click', exit, false);
    
    title.style.fontSize = gameSize/12 + 'px';

    endGameScores.innerHTML = `Your scores: ${counterObj.scores}`;
    endGameScores.style.fontSize = gameSize/20 + 'px';
    
    buttonAgain.style.margin = gameSize/30 + 'px';
    buttonAgain.style.fontSize = gameSize/15 + 'px';

    buttonExit.style.fontSize = gameSize/15 + 'px';
    buttonExit.style.marginBottom = gameSize/30 + 'px';

    const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let spRead = new URLSearchParams();
    spRead.append('f', 'READ');
    spRead.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');

    fetch(ajaxHandlerScript, { method: 'post', body: spRead } )
    .then( response => response.json() )
    .then( info => { leaderBoard(JSON.parse(info.result) ) } )
    .catch( error => { console.error(error); } );

    function again() {
      window.navigator.vibrate(200)

      game.removeChild(end);

      appleObj.new();
      snakeObj.replay();

      buttonAgain.removeEventListener('touchstart', again, false);
      buttonAgain.removeEventListener('click', again, false);
      buttonExit.removeEventListener('touchstart', exit, false);
      buttonExit.removeEventListener('click', exit, false);

      interval = setInterval(drawGame, 100)
    }

    function exit() {
      window.navigator.vibrate(200)
      
      game.removeChild(end);
      document.body.removeChild(game);
      document.body.appendChild(container)
    }

    function leaderBoard(records) {
      let scores = counterObj.scores;
      if (scores > records[9].record) {
        newRecordWindowInput.addEventListener('blur', validInput, false);
        newRecordWindowOk.addEventListener('click', accept, false);
        newRecordWindowOk.addEventListener('touchStart', accept, false);

        newRecordWindowTitle.style.fontSize = gameSize/13 + 'px';

        newRecordWindowDiscription1.style.fontSize = gameSize/23 + 'px';
        newRecordWindowDiscription1.style.margin = gameSize/100 * 2 + 'px';
      
        newRecordWindowDiscription2.style.fontSize = gameSize/23 + 'px';
        newRecordWindowDiscription2.style.marginBottom = gameSize/100 * 2 + 'px';
      
        newRecordWindowInput.style.fontSize = gameSize/23 + 'px';

        newRecordWindowError.style.fontSize = gameSize/23 + 'px';   
        
        newRecordWindowOk.style.marginBottom = gameSize/100 * 2 + 'px';

        newRecordWindowOk.style.width = gameSize/100 * 10 + 'px';
        newRecordWindowOk.style.height = gameSize/100 * 5 + 'px';
        newRecordWindowOk.style.fontSize = gameSize/23 + 'px';

        game.appendChild(newRecordWindow);
        newRecordWindow.appendChild(newRecordWindowTitle);
        newRecordWindow.appendChild(newRecordWindowDiscription1);
        newRecordWindow.appendChild(newRecordWindowDiscription2);
        newRecordWindow.appendChild(newRecordWindowInput);
        newRecordWindow.appendChild(newRecordWindowError);
        newRecordWindow.appendChild(newRecordWindowOk);
      
        function validInput() {
          newRecordWindowInputValue = newRecordWindowInput.value;
      
          if(newRecordWindowInputValue.length === 0 || newRecordWindowInputValue.length > 5 || newRecordWindowInputValue[0] === " " || newRecordWindowInputValue[newRecordWindowInputValue.length - 1] === " ") {
            newRecordWindowError.style.visibility = 'visible'
            newRecordWindowError.style.color = 'red';
            error++;
          } else {
            newRecordWindowError.style.visibility = 'hidden';
            error = 0;      
          }

          return error;
        }

        function accept() {
          let error = 0;
          error+=validInput()
          if (error == 0) {
            const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

            let spLockget = new URLSearchParams();
            spLockget.append('f', 'LOCKGET');
            spLockget.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');
            spLockget.append('p', randomPassword)

            fetch(ajaxHandlerScript, { method: 'post', body: spLockget })
            .then( response => response.json() )
            .then( data => { lockGetReady(data) } )
            .catch( error => { console.error(error); } );

            function lockGetReady(recordsTable) {
              let repeatingNick;
              
              table = JSON.parse(recordsTable.result)

              repeatingNick = table.map(el => el.nick).indexOf(newRecordWindowInputValue);

              if (repeatingNick >= 0 && repeatingNick <= 10) {
                if (table[repeatingNick].record < counterObj.scores) {
                  table[repeatingNick].record = counterObj.scores;
                }
              } else {
                let obj = {nick: newRecordWindowInputValue, record: counterObj.scores}
                table.push(obj)
              }

              table.sort(function (a, b) {
                if (a.record < b.record) {
                  return 1;
                }
                if (a.record > b.record) {
                  return -1;
                }
                return 0;
              });

              if (table.length > 10) {
                table.pop();
              }

              let spUpdate = new URLSearchParams();
              spUpdate.append('f', 'UPDATE');
              spUpdate.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');
              spUpdate.append('p', randomPassword)
              spUpdate.append('v', JSON.stringify(table))

              fetch(ajaxHandlerScript, { method: 'post', body: spUpdate })
              .then( response => response.json() )
              .then( data => { console.log(data) } )
              .catch( error => { console.error(error); } );
            }
            newRecordWindowOk.removeEventListener('click', accept, false);
            newRecordWindowOk.removeEventListener('touchStart', accept, false);
            game.removeChild(newRecordWindow)
          }
        }
      }
    }
    
    clearInterval(interval)

    game.appendChild(end);
    end.appendChild(title);
    end.appendChild(endGameScores);
    end.appendChild(buttonAgain);
    end.appendChild(buttonExit);
  }

  // Control by touchscreen

  const gestureLength = 10; // Min gesture length

  let touchStart = null; // First position
  let touchPosition = null; // Last position

  window.addEventListener("touchstart", function (e) { TouchStart(e); });
  window.addEventListener("touchmove", function (e) { TouchMove(e); });
  window.addEventListener("touchend", function (e) { TouchEnd(e); });
  window.addEventListener("touchcancel", function (e) { TouchEnd(e); });

  // Getting first position
  function TouchStart(e) {
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  // Getting new position
  function TouchMove(e) {
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }

  function TouchEnd(e) {
    CheckAction();

    // Clearing positions
    touchStart = null;
    touchPosition = null;
  }

  // Gesture
  function CheckAction() {

    // Getting distance from first to last position
    var d = {
      x: touchStart.x - touchPosition.x,
      y: touchStart.y - touchPosition.y        
    };

    // Which is axis?
    if(Math.abs(d.x) > Math.abs(d.y)) {

      // Check if axis more than gesture length
      if(Math.abs(d.x) > gestureLength) {
          
        // Axis X
        if (d.x > 0 && dir != 'right') {
          dir = 'left'; // Left
          snakeHead.src = snakeHeadLeftImg.src;
        } else if (d.x < 0 && dir != 'left') {
          dir = 'right'; // Right
          snakeHead.src = snakeHeadRightImg.src;
        }
      }
    } else {  // Axis y
      if(Math.abs(d.y) > gestureLength) {
        if(d.y > 0 && dir != 'down') {
          dir = 'up'; // Up
          snakeHead.src = snakeHeadUpImg.src;
        } else if (d.y < 0 && dir != 'up') {
          dir = 'down'; // Down
          snakeHead.src = snakeHeadBottomImg.src;
        }
      }
    }
  }

  function clickSoundInit() {
    soundEat.play(); 
    soundEat.pause(); 
  }

  function clickSound() {
    soundEat.currentTime=0;
    soundEat.play();
  }

  // Create objects

  let snakeObj = new snake(7*cell, 7*cell)
  let appleObj = new apple();
  let counterObj = new counter(0);

  counterDiv.style.fontSize = gameSize/15 + 'px';
  counterDiv.style.fontFamily = 'Undertale-Battle-Font'

  // Game

  function drawGame() {
    ctx.beginPath();
    ctx.fillStyle = ('#674D3D')
    ctx.fillRect(0, 0, gameSize, gameSize);
    ctx.stroke();

    for (let i = 1; i < 15; i++) {
      ctx.beginPath();
      ctx.moveTo((gameSize/15)*i, 0)
      ctx.lineTo((gameSize/15)*i, gameSize)
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, (gameSize/15)*i)
      ctx.lineTo(gameSize, (gameSize/15)*i)
      ctx.stroke();
    }

    ctx.drawImage(appleImg, appleObj.x, appleObj.y, cell, cell)

    for(let i = 0; i < snakeObj.snake.length; i++) {
      ctx.drawImage(i == 0 ? snakeHead: snakeBodyImg, snakeObj.snake[i].x, snakeObj.snake[i].y, cell, cell)
    }

    let snakeX = snakeObj.snake[0].x;
    let snakeY = snakeObj.snake[0].y;

    if(snakeX == appleObj.x && snakeY == appleObj.y) {
      clickSound()
      appleObj.new();
      counterObj.scores += 1;
    } else {
      snakeObj.snake.pop();
    }

    if (dir == 'left') snakeX -= cell;
    if (dir == 'right') snakeX += cell;
    if (dir == 'up') snakeY -= cell;
    if (dir == 'down') snakeY += cell;

    let newHead = {
      x: snakeX,
      y: snakeY,
    }

    snakeObj.outwardField(snakeX, snakeY);

    snakeObj.eatTail(newHead, snakeObj.snake);

    snakeObj.snake.unshift(newHead);

    counterObj.update();
  }

  drawGame()
  let interval = setInterval(drawGame, 100);
  document.body.appendChild(game)
  game.appendChild(canvas)
  game.appendChild(counterDiv)
  document.body.removeChild(container)
}

function preload() {
  snakeHead.src = 'img/snake_head_bottom.svg';
  snakeHeadBottomImg.src = 'img/snake_head_bottom.svg'
  snakeHeadLeftImg.src = 'img/snake_head_left.svg'
  snakeHeadRightImg.src = 'img/snake_head_right.svg'
  snakeHeadUpImg.src = 'img/snake_head_up.svg'
  snakeBodyImg.src = 'img/snake_body.svg'
  appleImg.src = 'img/apple.svg';

  snakeHead.style.visibility = 'hidden';
  snakeHeadBottomImg.style.visibility = 'hidden';
  snakeHeadLeftImg.style.visibility = 'hidden';
  snakeHeadRightImg.style.visibility = 'hidden';
  snakeHeadUpImg.style.visibility = 'hidden';
  snakeBodyImg.style.visibility = 'hidden';
  appleImg.style.visibility = 'hidden';

  document.body.appendChild(snakeHead)
  document.body.appendChild(snakeHeadBottomImg)
  document.body.appendChild(snakeHeadLeftImg)
  document.body.appendChild(snakeHeadRightImg)
  document.body.appendChild(snakeHeadUpImg)
  document.body.appendChild(snakeBodyImg)
  document.body.appendChild(appleImg)
}