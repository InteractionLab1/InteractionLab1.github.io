
var gameData = {
  movesP1: [],
  movesP2: [], // store the square id to an array
  movesAI: [],
  token1: 'x',
  token2: 'o',
  score1: 0,
  score2: 0
}; // store game data

var isOver = false; // see whether game is ended
var size = 3; //3x3 grid default
var turns = 0;

var compMoves;
var boardCheck;

var a1;
var a2;
var a3;
var b1;
var b2;
var b3;
var c1;
var c2;
var c3;

var arrayId = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];

var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

var skippedMove = false;

var sequence = "";

// ===================all the functions below================================

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

$(document).ready(function() {

  window.setTimeout(function () {
    $('#message').removeClass('fadeInUp');
  }, 1000); // remove animation so it won't affect submenu

  var restart = function() {
    gameData.movesP1 = [];
    gameData.movesP2 = [];
    gameData.movesAI = [];
    turns = 0;
    isOver = false;
    $("td").removeClass(gameData.token1).removeClass(gameData.token2);
    $("#message").text("Let's play tic tac toe! You play first.")
  };

  $("#tokenPair1").on("click", function() {
    if (turns) {
      return;
    }
    gameData.token1 = 'x';
    gameData.token2 = 'o';

  });

  //==================================AI mode on======================================
    // all the moves ---> AI mode
    $("td").on("click", function() {
      if (isOver) {
        return;
      } // if game is ended, clicks become invalid

      var token1 = gameData.token1;
      var token2 = gameData.token2;

      var marked = $(this); // get the square that player selects
      var num = $(this).attr('id');

      if (marked.hasClass(token1) || marked.hasClass(token2)) {
        // if the square has already been selected then alert else markes the square
        alert("Please choose another square!")
        return;
      }

      // first see which turn
      if (turns % 2 === 0) {
        // console.log("turn: " + turns);

        $("#message").text("It's your turn!"); // change the prompt message

        marked.addClass(token1).addClass("animated bounceIn"); // place the token "X"
        gameData.movesP1.push(this.id); // store the sqaure id to an array
        // console.log("num: " + num);
        if(num == 11){
          sequence = sequence + "0";
          board[0] = 'x';
        }
        else if(num == 12){
          sequence = sequence + "1";
          board[1] = 'x';
        }
        else if(num == 13){
          sequence = sequence + "2";
          board[2] = 'x';
        }
        else if(num == 21){
          sequence = sequence + "3";
          board[3] = 'x';
        }
        else if(num == 22){
          sequence = sequence + "4";
          board[4] = 'x';
        }
        else if(num == 23){
          sequence = sequence + "5";
          board[5] = 'x';
        }
        else if(num == 31){
          sequence = sequence + "6";
          board[6] = 'x';
        }
        else if(num == 32){
          sequence = sequence + "7";
          board[7] = 'x';
        }
        else{
          sequence = sequence + "8";
          board[8] = 'x';
        }
        // console.log("board: " + board);
        turns++;

        if ( isWinner(board, 'x') ) {
          // console.log("pooh");
          $("#message").text("You win!");
          while(sequence.length < 9){
            sequence = sequence + "-";
          }
          console.log("Sequence: " + sequence);
          console.log("Win: 1");
          isOver = true; // game is ended
          document.getElementById("next").disabled = false;
          // var pass = window.location.search;
          // window.location.href = "vid1.html" + pass;
          return;
          // sleep(150000);
        } 
        else if(isWinner(board, 'o')){
          $("#message").text("Kai wins!");
          while(sequence.length < 9){
            sequence = sequence + "-";
          }
          console.log("Sequence: " + sequence);
          console.log("Win: 1");
          isOver = true;
          document.getElementById("next").disabled = true;
          // var pass = window.location.search;
          // sleep(15000);
          // window.location.href = "vid1.html" + pass;
          return;
          // sleep(150000);
        }
        else {
          // console.log("mickey");
          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!");
            while(sequence.length < 9){
              sequence = sequence + "-";
            }
            console.log("Sequence: " + sequence);
            console.log("Win: 0");
            isOver = true;
            document.getElementById("next").disabled = true;
            // var pass = window.location.search;
            // sleep(15000);
            // window.location.href = "vid1.html" + pass;
            return;
            // sleep(150000);
          }
        }

        if (turns % 2 === 1){
          // computer's turn
          $("#message").text("It's Kai's turn!");
          var [move, skippedMove] = getComputerMove(board);
          board[move] = 'o';
          if(move == 0){
            sequence = sequence + "0";
            $("#11").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 1){
            sequence = sequence + "1";
            $("#12").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 2){
            sequence = sequence + "2";
            $("#13").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 3){
            sequence = sequence + "3";
            $("#21").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 4){
            sequence = sequence + "4";
            $("#22").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 5){
            sequence = sequence + "5";
            $("#23").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 6){
            sequence = sequence + "6";
            $("#31").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else if(move == 7){
            sequence = sequence + "7";
            $("#32").addClass(gameData.token2).addClass("animated bounceIn");
          }
          else{
            sequence = sequence + "8";
            $("#33").addClass(gameData.token2).addClass("animated bounceIn");
          }
          turns++;
        }

        if ( isWinner(board, 'x') ) {
          $("#message").text("You win!");
          while(sequence.length < 9){
            sequence = sequence + "-";
          }
          console.log("Sequence: " + sequence);
          console.log("Win: 1");
          isOver = true;
          document.getElementById("next").disabled = true;
          // var pass = window.location.search;
          // sleep(15000);
          // window.location.href = "vid1.html" + pass;
          return;
          // sleep(150000);
        } 
        else if(isWinner(board, 'o')){
          $("#message").text("Kai wins!");
          while(sequence.length < 9){
            sequence = sequence + "-";
          }
          console.log("Sequence: " + sequence);
          console.log("Win: 1");
          isOver = true;
          document.getElementById("next").disabled = true;
          // var pass = window.location.search;
          // sleep(15000);
          // window.location.href = "vid1.html" + pass;
          return;
          // sleep(150000);
        }
        else {
          if ( turns === size ** 2 ) {
            $("#message").text("It's a draw!");
            while(sequence.length < 9){
              sequence = sequence + "-";
            }
            console.log("Sequence: " + sequence);
            console.log("Win: 0");
            isOver = true;
            document.getElementById("next").disabled = true;
            // var pass = window.location.search;
            // sleep(15000);
            // window.location.href = "vid1.html" + pass;
            return;
            // sleep(150000);
          }
          $("#message").text("It's your turn!");
        }

    }
  });// all the moves --->AI mode, function ends
// }

//===========================some functions===========================
  var isWinner = function(bo, le) {
    return ((bo[0] == le && bo[1] == le && bo[2] == le) || // across the top
    (bo[3] == le && bo[4] == le && bo[5] == le) || // across the middle
    (bo[6] == le && bo[7] == le && bo[8] == le) || // across the bottom
    (bo[0] == le && bo[3] == le && bo[6] == le) || // down the left side
    (bo[1] == le && bo[4] == le && bo[7] == le) || // down the middle
    (bo[2] == le && bo[5] == le && bo[8] == le) || // down the right side
    (bo[0] == le && bo[4] == le && bo[8] == le) || // diagonal
    (bo[2] == le && bo[4] == le && bo[6] == le)) // diagonal
  };

  var makeMove = function(board, letter, move){
    board[move] = letter;
  };

  var getBoardCopy = function(board) {
    var dupeBoard = [];
    for (var i = 0; i < 9; i++){
      dupeBoard.push(board[i]);
    }
    return dupeBoard;
  };

  var isSpaceFree = function(board, move) {
    var spaceIsFree = !(board[move] == 'x' || board[move] == 'o');
    // console.log("board is: " + board);
    // console.log("space: " + spaceIsFree);
    return spaceIsFree;
    // var boardX = boardCheck(gameData.token1);
    // var boardO = boardCheck(gameData.token2);
    // console.log("my move i'm checking is: " + move);
    // console.log(!(boardX[move] || boardO[move]));
    // return !(boardX[move] || boardO[move]);
  };

  var chooseRandomMoveFromList = function(board, movesList){
    var possibleMoves = [];
    for (var i = 1; i < movesList.length; i++){
      if(isSpaceFree(board, movesList[i])){
        possibleMoves.push(movesList[i]);
      }
    }
    if(possibleMoves.length != 0){
      return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
    else{
      return null;
    }
  };

  var getComputerMove = function(board){
    var movesSkipped = [];
    for (var i = 0; i < 9; i++){
      var copy = getBoardCopy(board);
      if(isSpaceFree(copy, i)){
        makeMove(copy, 'o', i);
        if(isWinner(copy, gameData.token2)){
          // console.log("There is a winning move")
          if(skippedMove){
            // console.log("I'm taking the winning move: " + i);
            return [i, false];
          }
          else{
            // console.log("I am not taking the winning move")
            skippedMove = true;
            movesSkipped.push(i);
          }
        }
      }
    }

    for (var i = 0; i < 9; i++){
      copy = getBoardCopy(board);
      if(isSpaceFree(copy, i)){
        makeMove(copy, 'x', i);
        if(isWinner(copy, gameData.token1)){
          if(skippedMove){
            // console.log("2: i'm returning: " + i);
            return [i, false];
          }
          else{
            skippedMove = true;
            movesSkipped.push(i);
          }
        }
      }
    }

    // console.log("skippedMoves: " + movesSkipped);
    var allMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var remainingMoves = [];
    for (var i = 0; i < allMoves.length; i++){
      if(!(movesSkipped.includes(allMoves[i])) && board[allMoves[i]] == ' '){
        remainingMoves.push(allMoves[i]);
      }
    }
    // console.log("first try")
    var randomMove = chooseRandomMoveFromList(board, remainingMoves);
    if(randomMove == null){
      // console.log("tried again")
      randomMove = chooseRandomMoveFromList(board, allMoves);
      while(board[randomMove] != ' '){
        randomMove = chooseRandomMoveFromList(board, allMoves);
      }
    }
    // console.log("3: i'm returning: " + randomMove);
    return [randomMove, skippedMove]
  };

  var isBoardFull = function(board){
    for(var i = 0; i < 9; i++){
      if(isSpaceFree(board, i)){
        return false;
      }
    }
    return true;
  };



//===========================all the check for WIN functions=============================

  // get 2 arrays with all the square ids on the diagonal directions
  // eg. ["11", "22", "33", "44"] and ["14", "23", "32", "41"]
  // pattern here is seperate first number and second number, reverse the array with second numbers
  var diagArr = function(size, booleanNum) {
      var row = [];
      var col = [];
      var diagonal = [];

      for (var i = 1; i <= size; i++) {
        i = String(i);
        row.push(i);

        if (booleanNum) {
            col.unshift(i);
          } else {
            col.push(i);
          }
        }

      for (var i = 0; i < row.length; i++) {
        diagonal.push(row[i] + col[i]);
      }
      return diagonal;
    };

  // to check whether all the square ids are included in the player's selected squares.
  var checkDiag = function(diagonal, playerMoves) {

      for (var i = 0; i < diagonal.length; i++) {
        if (playerMoves.indexOf(diagonal[i]) === -1) {
          return false;
        }
      }
      return true;
  };

  // seperate row ids and column ids, and check if the player's selected squares have 3
  // same row ids or column ids.
  // to check whether it's winning horizontally or vertically
  var checkOther = function(playerMoves, size) { //check horizontally and vertically
    var row = [];
    var col = [];

    for (var i = 0; i < playerMoves.length; i++) {
      row.push(Number(playerMoves[i][0]));
      col.push(Number(playerMoves[i][1]));
    }

    row.sort();
    col.sort();

    if (size === 3) {
      for (var i = 0; i < row.length; i++) {
        if (row[i] === row[i+1] && row[i] === row[i+2]) {
          return true;
        }
      }

      for (var i = 0; i < col.length; i++) {
        if (col[i] === col[i+1] && col[i] === col[i+2]) {
          return true;
        }
      }
      return false;
    } // works for 3x3 grid

    // if (size === 4) {
    //   for (var i = 0; i < row.length; i++) {
    //     if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]) {
    //       return true;
    //     }
    //   }

    //   for (var i = 0; i < col.length; i++) {
    //     if (col[i] === col[i+1] && col[i] === col[i+2] && col[i] === col[i+3]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // } // works for 4x4 grid

  };

  //=====================================total check to win function===============================
  //=====================================take size (3 or 4) as an argument===============================

  var checkWin = function(moves, size) {
    var diagonal1 = diagArr(size, 0);
    var diagonal2 = diagArr(size, 1);

    if ( checkDiag(diagonal1, moves) || checkDiag(diagonal2, moves) || checkOther(moves, size) ) {
      return true;
    }
    return false;
  };

  //==========================below is AI logic!!!!!!!==================================
  //==========================below is AI logic!!!!!!!==================================
  //==========================below is AI logic!!!!!!!==================================

  var compMove1 = function() {

    boardCheck(gameData.token1);
    if (!b2) {
      $("#22").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("22");
      turns++;
    } else {
      $("#13").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("13");
      turns++;
    }
  }; // 1st computer move

  //=======================Computer's 2nd move===============================================



  var compMove2 = function() {

    boardCheck(gameData.token1);
    if ((a1&&c3) || (a3&&c1)) {
      $("#23").addClass(gameData.token2).addClass("animated bounceIn"); // 2 x on diagonal direction, o on the edge;
      gameData.movesAI.push("23");
      turns++;
    } else if ((a2&&c2) || (b1&&b3) || (a2&&c1) || (b1&&a3)) {
      $("#11").addClass(gameData.token2).addClass("animated bounceIn"); //
      gameData.movesAI.push("11");
      turns++;
    } else if ((a3&&c2) || (b3&&c1)|| (c1&&b2)) {
      $("#33").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("33");
      turns++;
    } else if ((a1&&c2) || (b1&&c3) || (a2&&b3) || (a2&&b1)) {
      $("#31").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("31");
      turns++;
    } else if ((a1&&b3) || (a2&&c3) || (b1&&c2) || (b3&&c2)) {
      $("#13").addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push("13");
      turns++;
    } else {
      var id = blockOrWin(gameData.token1);
      $("#"+id).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(id);
      turns++;
    }
  }; // 2nd computer move

//===================get an array with true of false to indicate whether it's an empty suqare or not=============
  var getEmpty = function(){
    var boardX = boardCheck(gameData.token1);
    var boardO = boardCheck(gameData.token2);
    var empty = [];
    for (var i = 0; i < boardX.length; i++) {
      if( !boardX[i] && !boardO[i] ){
        return i;
      }
    }
  };

  //=======================Computer's 3rd move===============================================

  var compMove3 = function() {
    var win = blockOrWin(gameData.token2);
    var block = blockOrWin(gameData.token1);

    if (win) {
      $("#"+win).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(win);
      turns++;
    } else if (block) {
      $("#"+block).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(block);
      turns++;
    } else {
      var i = getEmpty();
      var id = arrayId[i];
      $("#"+id).addClass(gameData.token2).addClass("animated bounceIn");
      gameData.movesAI.push(id);
      turns++;
    }

  }; // 3rd computer move
//=======================Computer's 4th move===============================================

  var compMove4 = function() {
    compMove3();
  }; // 4th computer move

//=======================block: in every possible directions, there are 2 "x"===============================================
//=======================win: in every possible directions, there are 2 "o"===============================================

  var blockOrWin = function(token) {
    var empty = checkEmpty();
    boardCheck(token);
    if (!empty[0] && ((a2&&a3) || (b1&&c1) || (b2&&c3))) {
      return "11";
    } else if (!empty[1] && ((a1&&a3) || (b2&&c2))) {
        return "12";
      } else if (!empty[2] && ((a1&&a2) || (b3&&c3) || (b2&&c1))) {
          return "13";
        } else if (!empty[3] && ((a1&&c1) || (b2&&b3))) {
            return "21";
          } else if (!empty[5] && ((a3&&c3) || (b1&&b2))) {
              return "23";
            } else if (!empty[6] && ((c2&&c3) || (a1&&b1) || (b2&&a3))) {
                return "31";
              } else if (!empty[7] && ((a2&&b2) || (c1&&c3))) {
                  return "32";
                } else if (!empty[8] && ((c1&&c2) || (a3&&b3) || (a1&&b2))) {
                    return "33";
                  } else {
                    return false;
                  }
  }; // blockOrWin function ends

  //==================false or true array to check the situation of either "X" or "O"===============================================

  var boardCheck = function(token) {
    a1 = $("#11").hasClass(token);
    a2 = $("#12").hasClass(token);
    a3 = $("#13").hasClass(token);
    b1 = $("#21").hasClass(token);
    b2 = $("#22").hasClass(token);
    b3 = $("#23").hasClass(token);
    c1 = $("#31").hasClass(token);
    c2 = $("#32").hasClass(token);
    c3 = $("#33").hasClass(token);

    return [a1, a2, a3, b1, b2, b3, c1, c2, c3];
  };

///==================get the first empty square to fill an AI move===================================
  var checkEmpty = function() {
    var boardX = boardCheck(gameData.token1);
    var boardO = boardCheck(gameData.token2);
    var empty = [];

    for (var i = 0; i < boardX.length; i++) {
      empty[i] = boardX[i] || boardO[i];
    }
    return empty;
  }


}); // the end
