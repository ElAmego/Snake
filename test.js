"use strict"

// Preload components.
const snakeHeadBottomImg = new Image(); // Image snakeHeadBottomImg for preload.
const snakeHeadLeftImg = new Image(); // Image snakeHeadLeftImg for preload.
const snakeHeadRightImg = new Image(); // Image snakeHeadRightImg for preload.
const snakeHeadUpImg = new Image(); // Image snakeHeadUpImg for preload.
const snakeBodyImg = new Image(); // Image snakeBodyImg for preload.
const appleImg = new Image(); // Image appleImg for preload.
const snakeHead = new Image(); // Image snakeHead for preload.

preload();

const container = document.getElementById('container'); // Finding container div.
const flexContainer = document.getElementById('flex_container'); // Finding flexContainer div.
const mainMenu = document.getElementById('main_menu'); // Finding mainMenu div.
const createGameButton = document.getElementById('create_game_button'); // Finding createGameButton button.
const createLeaderboardButton = document.getElementById('create_leaderboard_button'); // Finding createLeaderboardButton button.

// Playing field components.
const canvas = document.createElement('canvas'); // Creating canvas.
canvas.id = 'canvas'; 

const playingField = document.createElement('div'); // Creating field for game.
playingField.id = 'playing_field';

const playingFieldCounter = document.createElement('div'); // Creating counter for game.

// Ending window components.
const endWindow = document.createElement('div'); // Creating window after a lose.
endWindow.id = 'end_window';

const endWindowTitle = document.createElement('div'); // Creating title for this window.
endWindowTitle.id = 'end_window_title';
endWindowTitle.innerHTML = 'You lose!';

const endWindowScores = document.createElement('div'); // Creating result for this window.
endWindowScores.id = 'end_window_scores';

const endWindowButtonAgain = document.createElement('div'); // Creating button Again for this window.
endWindowButtonAgain.id = 'end_window_button_again';
endWindowButtonAgain.innerHTML = 'Replay';

const endWindowButtonExit = document.createElement('div'); // Creating button for closing this window.
endWindowButtonExit.id = 'end_window_button_exit';
endWindowButtonExit.innerHTML = 'Exit';

// Window if player set new record.
const newRecordWindow = document.createElement('div'); // Creating window for new record.
newRecordWindow.id = 'new_record_window';

const newRecordWindowTitle = document.createElement('div'); // Creating title for this window.
newRecordWindowTitle.innerHTML = 'Congratulations!';

const newRecordWindowDiscription1 = document.createElement('div'); // Creating discription for this window.
newRecordWindowDiscription1.innerHTML = 'You entered the top-10.';

const newRecordWindowDiscription2 = document.createElement('div'); // Creating discription for this window.
newRecordWindowDiscription2.id = 'new_record_window_discription_2';
newRecordWindowDiscription2.innerHTML = 'Enter your nickname. Nickname must includes 5 symbols.'

const newRecordWindowInput = document.createElement('input'); // Creating input for writing nickname. 
newRecordWindowInput.id = 'new_record_window_input'

const newRecordWindowError = document.createElement('div'); // Creating inscription if nickname will wrong.
newRecordWindowError.id = 'new_record_window_error';
newRecordWindowError.innerHTML = 'Nickname is incorrect.';

const newRecordWindowButtonOk = document.createElement('button'); // Creating button for accept.
newRecordWindowButtonOk.id = 'button_ok';
newRecordWindowButtonOk.innerHTML = 'OK';

// Leaderboard components.
const leaderboard = document.createElement('div'); // Creating leaderboard.
leaderboard.id = 'leaderboard';

const leaderboardTitle = document.createElement('div'); // Creating title for this window.
leaderboardTitle.id = 'leaderboard_title';
leaderboardTitle.innerHTML = ('Leaderboard');

const leaderboardResults = document.createElement('div'); // Creating div for grouping two blocks.
leaderboardResults.id = 'leaderboard_results';

const leaderboardNicknamesTitle = document.createElement('div'); // Creating title for "leaderboardNicknames" div.
leaderboardNicknamesTitle.id = 'leaderboard_nicknames_title';
leaderboardNicknamesTitle.innerHTML = ('Nick');

const leaderboardNicknames = document.createElement('div'); // Creating block for nicknames.
leaderboardNicknames.id = 'nicknames';

const leaderboardScoresTitle = document.createElement('div'); // Creating title for "leaderboardScores" div.
leaderboardScoresTitle.id = 'leaderboard_scores_title';
leaderboardScoresTitle.innerHTML = ('Scores');

const leaderboardScores = document.createElement('div'); // Creating block for scores.
leaderboardScores.id = 'scores_id';

for (let i = 1; i <= 10; i++) {
  let nickname = document.createElement('div'); // Creating div for nicknames value.
  nickname.className = 'nickname';

  leaderboardNicknames.appendChild(nickname);
}

for (let i = 1; i <= 10; i++) {
  let scores = document.createElement('div'); // Creating div for scores value.
  scores.className = 'scores_class';

  leaderboardScores.appendChild(scores);
}

const leaderboardButtonExit = document.createElement('button'); // Creating button for closing leaderboard.
leaderboardButtonExit.id = 'leaderboard_button_exit';
leaderboardButtonExit.innerHTML = ('Close');

createGameButton.addEventListener('click', createGame, false); // Adding event listener for 'createGameButton'.
createGameButton.addEventListener('touchStart', createGame, false); // Adding event listener for 'createGameButton'.
createLeaderboardButton.addEventListener('click', createLeaderboard, false); // Adding event listener for 'createLeaderboardButton'.
createLeaderboardButton.addEventListener('touchStart', createLeaderboard, false); // Adding event listener for 'createLeaderboardButton'.
leaderboardButtonExit.addEventListener('click', closeLeaderboard, false); // Adding event listener for 'leaderboardButtonExit'.
leaderboardButtonExit.addEventListener('touchStart', closeLeaderboard, false); // Adding event listener for 'leaderboardButtonExit'.

const soundEat = new Audio(); // Creating sound after eating apple.
soundEat.src = 'sounds/eat.mp3';

// Creating game
function createGame() {

  window.navigator.vibrate(200); // Vibration response

  const widthScreen =  window.innerWidth; // Width of the viewport.
  const heightScreen = window.innerHeight; // Height of the viewport.

  // Adaptive for Canvas

  let gameSize; // Size of game field.

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
      alert('The game is not designed for your screen size.')
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
    } else {
      alert('The game is not designed for your screen size.')
    }
  }

  endWindow.style.width = gameSize/100 * 60 + 'px';
  endWindow.style.maxHeight = gameSize/100 * 60 + 'px';
  newRecordWindow.style.width = gameSize/100 * 80 + 'px';
  newRecordWindow.style.maxHeight = gameSize/100 * 80 + 'px';

  // Сanvas
  canvas.setAttribute('width', gameSize);
  canvas.setAttribute('height', gameSize);
  let ctx = canvas.getContext('2d');

  // Cell size

  let cell = gameSize/15; // Size of gaming cell.

  // Snake class & svg

  class snake {
    constructor(x, y) {
      this.snake = [{
        x: x,
        y: y
      }];
    }

    eatTail(head, arr) { // Game is ending if snake will crush into himself.
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
          endGame();
        }
      }
    }

    outwardField(snakeX, snakeY) { // Game is ending if snake will crush into end of gaming field.
      if (snakeX < 0 || snakeX > cell*14 || snakeY < 0 || snakeY > cell*14) {
        endGame();
      }
    }

    replay() { // Beginning position after pressing 'again' button.
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

    new() { // New position after eating apple by snake.
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

    update() { // Updating counter after eating apple by snake.
      playingFieldCounter.innerHTML = `Scores: ${this.scores}`;    
    }
  }

  // Control

  document.addEventListener('keydown', direction); // Adding event listener for pressing key.
    
  let dir; // Snake direction.

  function direction(e) {
    if ((e.keyCode == 37 || e.keyCode == 65) && dir != 'right') {
      dir = 'left';
      snakeHead.src = snakeHeadLeftImg.src;
    } else if ((e.keyCode == 38 || e.keyCode == 87) && dir != 'down') {
      dir = 'up';
      snakeHead.src = snakeHeadUpImg.src;
    } else if ((e.keyCode == 39 || e.keyCode == 68) && dir != 'left') {
      dir = 'right';
      snakeHead.src = snakeHeadRightImg.src;
    } else if ((e.keyCode == 40 || e.keyCode == 83) && dir != 'up') {
      dir = 'down';
      snakeHead.src = snakeHeadBottomImg.src;
    }
  }

  // Pop-up window after lose

  function endGame() {
    let table; // Creating variable for saving result of leaderboard.
    let newRecordWindowInputValue; //  Creating variable for saving nickname.
    let error; //  Creating variable for saving error from nickname input.
    let randomPassword = Math.random(); // Creating random password for fetch.

    endWindowButtonAgain.addEventListener('touchstart', again, false); // Adding event listener for 'endWindowButtonAgain'.
    endWindowButtonAgain.addEventListener('click', again, false); // Adding event listener for 'endWindowButtonAgain'.
    endWindowButtonExit.addEventListener('touchstart', exit, false); // Adding event listener for 'endWindowButtonAgain'.
    endWindowButtonExit.addEventListener('click', exit, false); // Adding event listener for 'endWindowButtonAgain'.
    
    endWindowTitle.style.fontSize = gameSize/12 + 'px';

    endWindowScores.innerHTML = `Your scores: ${counterObj.scores}`;
    endWindowScores.style.fontSize = gameSize/20 + 'px';
    
    endWindowButtonAgain.style.margin = gameSize/30 + 'px';
    endWindowButtonAgain.style.fontSize = gameSize/15 + 'px';

    endWindowButtonExit.style.fontSize = gameSize/15 + 'px';
    endWindowButtonExit.style.marginBottom = gameSize/30 + 'px';

    // Fetch for reading Json string.
    const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let spRead = new URLSearchParams();
    spRead.append('f', 'READ');
    spRead.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');

    fetch(ajaxHandlerScript, { method: 'post', body: spRead } )
    .then( response => response.json() )
    .then( info => { isNewRecord(JSON.parse(info.result) ) } )
    .catch( error => { console.error(error); } );

    // New game after lose.
    function again() {
      window.navigator.vibrate(200); // Vibration response

      playingField.removeChild(endWindow);

      appleObj.new();
      snakeObj.replay();

      endWindowButtonAgain.removeEventListener('click', again, false); // Removing event listener for 'endWindowButtonAgain'. 
      endWindowButtonAgain.removeEventListener('touchstart', again, false); // Removing event listener for 'endWindowButtonAgain'. 
      endWindowButtonExit.removeEventListener('click', exit, false); // Removing event listener for 'endWindowButtonExit'. 
      endWindowButtonExit.removeEventListener('touchstart', exit, false); // Removing event listener for 'endWindowButtonExit'.

      interval = setInterval(drawGame, 100)
    }

    // Exit to main menu.
    function exit() {
      window.navigator.vibrate(200);
      
      playingField.removeChild(endWindow);
      document.body.removeChild(playingField);
      document.body.appendChild(container);

      endWindowButtonAgain.removeEventListener('touchstart', again, false); // Removing event listener for 'endWindowButtonAgain'.
      endWindowButtonAgain.removeEventListener('click', again, false); // Removing event listener for 'endWindowButtonAgain'.
      endWindowButtonExit.removeEventListener('touchstart', exit, false); // Removing event listener for 'endWindowButtonExit'.
      endWindowButtonExit.removeEventListener('click', exit, false); // Removing event listener for 'endWindowButtonExit'.
    }

    // Creating window if player take new record.
    function isNewRecord(records) {
      let scores = counterObj.scores; // Creating variable for saving player's scrores.
      if (scores > records[9].record) {
        newRecordWindowInput.addEventListener('blur', validInput, false); // Adding event listener for 'newRecordWindowInput'.
        newRecordWindowButtonOk.addEventListener('click', accept, false); // Adding event listener for 'newRecordWindowButtonOk'. 
        newRecordWindowButtonOk.addEventListener('touchStart', accept, false); // Adding event listener for 'newRecordWindowButtonOk'.

        newRecordWindowTitle.style.fontSize = gameSize/13 + 'px';

        newRecordWindowDiscription1.style.fontSize = gameSize/23 + 'px';
        newRecordWindowDiscription1.style.margin = gameSize/100 * 2 + 'px';
      
        newRecordWindowDiscription2.style.fontSize = gameSize/23 + 'px';
        newRecordWindowDiscription2.style.marginBottom = gameSize/100 * 2 + 'px';
      
        newRecordWindowInput.style.fontSize = gameSize/23 + 'px';

        newRecordWindowError.style.fontSize = gameSize/23 + 'px';   
        
        newRecordWindowButtonOk.style.marginBottom = gameSize/100 * 2 + 'px';

        newRecordWindowButtonOk.style.width = gameSize/100 * 10 + 'px';
        newRecordWindowButtonOk.style.height = gameSize/100 * 5 + 'px';
        newRecordWindowButtonOk.style.fontSize = gameSize/23 + 'px';

        playingField.appendChild(newRecordWindow);
        newRecordWindow.appendChild(newRecordWindowTitle);
        newRecordWindow.appendChild(newRecordWindowDiscription1);
        newRecordWindow.appendChild(newRecordWindowDiscription2);
        newRecordWindow.appendChild(newRecordWindowInput);
        newRecordWindow.appendChild(newRecordWindowError);
        newRecordWindow.appendChild(newRecordWindowButtonOk);
      
        // Checks if nickname is variable.
        function validInput() {
          newRecordWindowInputValue = newRecordWindowInput.value;
      
          if(newRecordWindowInputValue.length === 0 || newRecordWindowInputValue.length > 5 || newRecordWindowInputValue[0] === " " || newRecordWindowInputValue[newRecordWindowInputValue.length - 1] === " ") {
            newRecordWindowError.style.visibility = 'visible';
            newRecordWindowError.style.color = 'red';
            error++;
          } else {
            newRecordWindowError.style.visibility = 'hidden';
            error = 0;      
          }

          return error;
        }

        // Send json string if nick variable.
        function accept() {
          window.navigator.vibrate(200);

          let error = 0; // Creating variable into function for saving error value.
          error+=validInput()
          if (error == 0) {
            // Fetch for lockget
            const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
            let spLockget = new URLSearchParams();
            spLockget.append('f', 'LOCKGET');
            spLockget.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');
            spLockget.append('p', randomPassword)

            fetch(ajaxHandlerScript, { method: 'post', body: spLockget })
            .then( response => response.json() )
            .then( data => { lockGetReady(data) } )
            .catch( error => { console.error(error); } );

            // Update string after lockget.
            function lockGetReady(recordsTable) {
              let repeatingNick; // Creating variable for saving index repeating nickname
              
              table = JSON.parse(recordsTable.result);

              repeatingNick = table.map(el => el.nick).indexOf(newRecordWindowInputValue);

              if (repeatingNick >= 0 && repeatingNick <= 10) {
                if (table[repeatingNick].record < counterObj.scores) {
                  table[repeatingNick].record = counterObj.scores;
                }
              } else {
                let obj = {nick: newRecordWindowInputValue, record: counterObj.scores};
                table.push(obj);
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

              // Fetch for update string
              let spUpdate = new URLSearchParams();
              spUpdate.append('f', 'UPDATE');
              spUpdate.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');
              spUpdate.append('p', randomPassword);
              spUpdate.append('v', JSON.stringify(table));

              fetch(ajaxHandlerScript, { method: 'post', body: spUpdate })
              .then( response => response.json() )
              .then( data => { console.log(data) } )
              .catch( error => { console.error(error); } );
            }

            newRecordWindowButtonOk.removeEventListener('click', accept, false);
            newRecordWindowButtonOk.removeEventListener('touchStart', accept, false);
            playingField.removeChild(newRecordWindow);
          }
        }
      }
    }
    
    clearInterval(interval);

    playingField.appendChild(endWindow);
    endWindow.appendChild(endWindowTitle);
    endWindow.appendChild(endWindowScores);
    endWindow.appendChild(endWindowButtonAgain);
    endWindow.appendChild(endWindowButtonExit);
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

  // Createing objects

  let snakeObj = new snake(7*cell, 7*cell) // Snake object
  let appleObj = new apple(); // Apple object
  let counterObj = new counter(0); // Counter object

  playingFieldCounter.style.fontSize = gameSize/15 + 'px';
  playingFieldCounter.style.fontFamily = 'Undertale-Battle-Font';

  // Game

  function drawGame() {
    ctx.beginPath();
    ctx.fillStyle = ('#674D3D');
    ctx.fillRect(0, 0, gameSize, gameSize);
    ctx.stroke();

    for (let i = 1; i < 15; i++) {
      ctx.beginPath();
      ctx.moveTo((gameSize/15)*i, 0);
      ctx.lineTo((gameSize/15)*i, gameSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, (gameSize/15)*i);
      ctx.lineTo(gameSize, (gameSize/15)*i);
      ctx.stroke();
    }

    ctx.drawImage(appleImg, appleObj.x, appleObj.y, cell, cell);

    for(let i = 0; i < snakeObj.snake.length; i++) {
      ctx.drawImage(i == 0 ? snakeHead: snakeBodyImg, snakeObj.snake[i].x, snakeObj.snake[i].y, cell, cell);
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
  document.body.appendChild(playingField);
  playingField.appendChild(canvas);
  playingField.appendChild(playingFieldCounter);
  document.body.removeChild(container);
}

// Creating leaderboard
function createLeaderboard() {
  window.navigator.vibrate(200); // Vibration response
 
  // Fetch for reading Json string
  const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
  let spReadLeaderboard = new URLSearchParams();
  spReadLeaderboard.append('f', 'READ');
  spReadLeaderboard.append('n', 'AMELCHENKO_SNAKE_LEADERBOARD');

  fetch(ajaxHandlerScript, { method: 'post', body: spReadLeaderboard } )
  .then( response => response.json() )
  .then( data => { buildLeaderBoard(JSON.parse(data.result) ) } )
  .catch( error => { console.error(error); } );

  // Building leaderboard
  function buildLeaderBoard(leaderboardArr) {
    let nicknameDiv = document.getElementsByClassName('nickname'); // Creating variable for saving elements with class name 'nickname'.
    let scoresDiv = document.getElementsByClassName('scores_class'); // Creating variable for saving elements with class name 'scores_class'

    for (let i = 0; i <= 9; i++) {
      nicknameDiv[i].innerHTML = (leaderboardArr[i].nick);
    }

    for (let i = 0; i <= 9; i++) {
      scoresDiv[i].innerHTML = (leaderboardArr[i].record);
    }
  }

  flexContainer.removeChild(mainMenu);
  flexContainer.appendChild(leaderboard);
  leaderboard.appendChild(leaderboardTitle);
  leaderboard.appendChild(leaderboardResults);
  leaderboard.appendChild(leaderboardButtonExit);
  leaderboardResults.appendChild(leaderboardNicknamesTitle);
  leaderboardNicknamesTitle.appendChild(leaderboardNicknames);
  leaderboardScoresTitle.appendChild(leaderboardScores);
  leaderboardResults.appendChild(leaderboardScoresTitle);
}

// Closing leaderboard
function closeLeaderboard() {
  window.navigator.vibrate(200); // Vibration response

  flexContainer.appendChild(mainMenu);
  flexContainer.removeChild(leaderboard);
  leaderboard.removeChild(leaderboardTitle);
  leaderboard.removeChild(leaderboardResults);
  leaderboard.removeChild(leaderboardButtonExit);
  leaderboardResults.removeChild(leaderboardNicknamesTitle);
  leaderboardNicknamesTitle.removeChild(leaderboardNicknames);
  leaderboardScoresTitle.removeChild(leaderboardScores);
  leaderboardResults.removeChild(leaderboardScoresTitle);
}

// Function for activate sound.
function clickSound() {
  soundEat.currentTime=0;
  soundEat.play();
}

// Preload svgs
function preload() {
  snakeHead.src = 'img/snake_head_bottom.svg';
  snakeHeadBottomImg.src = 'img/snake_head_bottom.svg';
  snakeHeadLeftImg.src = 'img/snake_head_left.svg';
  snakeHeadRightImg.src = 'img/snake_head_right.svg';
  snakeHeadUpImg.src = 'img/snake_head_up.svg';
  snakeBodyImg.src = 'img/snake_body.svg';
  appleImg.src = 'img/apple.svg';

  snakeHead.style.visibility = 'hidden';
  snakeHeadBottomImg.style.visibility = 'hidden';
  snakeHeadLeftImg.style.visibility = 'hidden';
  snakeHeadRightImg.style.visibility = 'hidden';
  snakeHeadUpImg.style.visibility = 'hidden';
  snakeBodyImg.style.visibility = 'hidden';
  appleImg.style.visibility = 'hidden';

  document.body.appendChild(snakeHead);
  document.body.appendChild(snakeHeadBottomImg);
  document.body.appendChild(snakeHeadLeftImg);
  document.body.appendChild(snakeHeadRightImg);
  document.body.appendChild(snakeHeadUpImg);
  document.body.appendChild(snakeBodyImg);
  document.body.appendChild(appleImg);
}

// Warning window before reload page.
window.onbeforeunload = function(e) {
  var dialogText = 'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.'; // Text of warning window.
  e.returnValue = dialogText;
  return dialogText;
};