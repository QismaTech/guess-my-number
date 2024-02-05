  var randomNumber = Math.floor(Math.random() * 100) + 1;
  var guesses = document.querySelector('.guesses');
  var lastResult = document.querySelector('.lastResult');
  var lowOrHi = document.querySelector('.lowOrHi');
  var guessSubmit = document.querySelector('.guessSubmit');
  var guessField = document.querySelector('.guessField');
  var guessCount = 1;
  var resetButton;
  var card = document.getElementsByClassName("card");
  var cardFront = document.getElementsByClassName("card-front");
  var cardBack = document.getElementsByClassName("card-back");
  var i;
  guessField.focus();
  guessSubmit.style.font = 'Gloria Hallelujah'

  function checkGuess() {
    var userGuess = Number(guessField.value);
    if(guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ', ';
    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if(guessCount === 12) {
      lastResult.textContent = '!!!GAME OVER!!!';
      lowOrHi.textContent = '';
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
        for(var i = 0; i<userGuess; i++){
          cardBack[i].style.transform = "rotateY(0)";
          cardFront[i].style.transform = "rotateY(-180deg)";
        }
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
        for(var i = userGuess-1; userGuess<100; i++){
          cardBack[i].style.transform = "rotateY(0)";
          cardFront[i].style.transform = "rotateY(-180deg)";
        }
      }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;
    var resetParas = document.querySelectorAll('.resultParas p');
    for(var i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
    for(var i = 0; i<100; i++){
      cardBack[i].style.transform = "rotateY(180deg)";
      cardFront[i].style.transform = "rotateY(0)";
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = '#DFEFB4';
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }