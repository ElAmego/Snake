"use strict"

const playGame = document.getElementById('play_game');
const container = document.getElementById('container');
const exit = document.getElementById('exit');

playGame.addEventListener('click', createGame, false);

function createGame() {
  document.body.removeChild(container)

  const widthScreen =  window.innerWidth;
  const heightScreen = window.innerHeight;

  const game = document.createElement('div');
  game.id = 'game';

  const end = document.createElement('div');
  end.id = 'end_Window';

  let title = document.createElement('div');
  title.id = 'title';

  let endGameScores = document.createElement('div');

  let buttonAgain = document.createElement('div');
  buttonAgain.id = 'button_Again'

  let buttonExit = document.createElement('div');
  buttonExit.id = 'exit';

  // Adaptive for Canvas

  let gameSize;

  if (widthScreen >= heightScreen) {
    if (heightScreen < 480 && heightScreen >= 320) {
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

    end.style.width = gameSize/100 * 60 + 'px';
    end.style.maxHeight = gameSize/100 * 60 + 'px';
  }

  if (widthScreen <= heightScreen) {
    if (widthScreen < 480 && widthScreen >= 320) {
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

    end.style.width = gameSize/100 * 60 + 'px';
    end.style.maxHeight = gameSize/100 * 60 + 'px';
  }

  // Сanvas

  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
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

  const snakeHeadImg = new Image();
  const snakeBodyImg = new Image();
  snakeHeadImg.src = 'img/snake_head_bottom.svg'
  snakeBodyImg.src = 'img/snake_body.svg'

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

  const appleImg = new Image();
  appleImg.src = 'img/apple.svg';

  // Counter class

  class counter {
    constructor(scores) {
      this.scores = scores;
    }

    update() {
      counterDiv.innerHTML = `Scores: ${this.scores}`;    
    }
  }

  const counterDiv = document.createElement('div');
  counterDiv.style.fontSize = gameSize/15 + 'px';
  counterDiv.style.fontFamily = 'Undertale-Battle-Font'

  // Control

  document.addEventListener('keydown', direction);
    
  let dir;

  function direction(e) {
    if ((e.keyCode == 37 || e.keyCode == 65) && dir != 'right') {
      dir = 'left';
      snakeHeadImg.src = 'img/snake_head_left.svg';
    } else if ((e.keyCode == 38 || e.keyCode == 87) && dir != 'down') {
      dir = 'up'
      snakeHeadImg.src = 'img/snake_head_up.svg';
    } else if ((e.keyCode == 39 || e.keyCode == 68) && dir != 'left') {
      dir = 'right'
      snakeHeadImg.src = 'img/snake_head_right.svg';
    } else if ((e.keyCode == 40 || e.keyCode == 83) && dir != 'up') {
      dir = 'down'
      snakeHeadImg.src = 'img/snake_head_bottom.svg';
    }
  }

  // Create objects

  let snakeObj = new snake(7*cell, 7*cell)
  let appleObj = new apple();
  let counterObj = new counter(0);

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
      ctx.drawImage(i == 0 ? snakeHeadImg: snakeBodyImg, snakeObj.snake[i].x, snakeObj.snake[i].y, cell, cell)
    }

    let snakeX = snakeObj.snake[0].x;
    let snakeY = snakeObj.snake[0].y;

    if(snakeX == appleObj.x && snakeY == appleObj.y) {
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

  // Pop-up window after loose

  function endGame() {
    title.innerHTML = 'You loose!'
    title.style.fontSize = gameSize/12 + 'px';

    endGameScores.innerHTML = `Your scores: ${counterObj.scores}`;
    endGameScores.style.fontSize = gameSize/20 + 'px';
    endGameScores.style.fontFamily = 'Undertale-Battle-Font'
    
    buttonAgain.innerHTML = 'Replay';
    buttonAgain.style.margin = gameSize/30 + 'px';
    buttonAgain.style.fontSize = gameSize/15 + 'px';

    buttonExit.innerHTML = 'Exit';
    buttonExit.style.fontSize = gameSize/15 + 'px';
    buttonExit.style.marginBottom = gameSize/30 + 'px';

    buttonAgain.onclick = function() {
      document.body.removeChild(end);

      appleObj.new();

      snakeObj.replay();

      interval = setInterval(drawGame, 100)
    }

    buttonExit.onclick = function() {
      document.body.removeChild(game);
      document.body.removeChild(end);
      document.body.appendChild(container)
    }
    
    clearInterval(interval)

    document.body.appendChild(end);
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
        if(d.x > 0) {
          dir = 'left'; // Left
        } else {
          dir = 'right';; // Right
        }
      }
    } else {  // Axis y
      if(Math.abs(d.y) > gestureLength) {
        if(d.y > 0) {
          dir = 'up'; // Up
        } else {
          dir = 'down'; // Down
        }
      }
    }
  }

  let interval = setInterval(drawGame, 100);
  document.body.appendChild(game)
  game.appendChild(canvas)
  game.appendChild(counterDiv)
}