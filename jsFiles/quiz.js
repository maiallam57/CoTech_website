// Select Elements
let countSpan = document.querySelector(".quizCount span");
let bullets = document.querySelector(".quizBullets");
let bulletsSpanContainer = document.querySelector(".quizBullets .quizSpans");
let quizArea = document.querySelector(".quizArea");
let answersArea = document.querySelector(".quizAnswersArea");
let submitButton = document.querySelector(".quizSubmitButton");
let countdownElement = document.querySelector(".quizCountdown");
let quizApp = document.querySelector(".quizApp");
let quizOkButton = document.querySelector(".quizOkButton");
let quizPopUpScore = document.querySelector(".quizPopUpScore");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      countdown(30, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(30, qCount);

        // Show Results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "quiz_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "quizSpanOn";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "quizAnswer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".quizBullets .quizSpans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "quizSpanOn";
    }
  });
}

function showResults(count) {
  if (currentIndex === count) {
    let theResults;
    quizApp.remove();

    document.querySelector(".quizPopUpScore").classList.add("quizOpen");
    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<div class="quizOpen"><img src="images/good.png">
      <div class="quizGood">Good</div><div class ="quizResultText"><br>You Answered ${rightAnswers}Questions Out of ${count}</div>
      <button class="quizOkButtonGood" id="quizScore-btn">Ok</button></div>`;
    } else if (rightAnswers === count) {
      theResults = `<div class="quizOpen"><img src="images/perfect.png">
      <div class="quizPerfect">Perfect</div><div class ="quizResultText"><br>All Answers Is Good</div>
      <button class="quizOkButtonBad" href="profile.html" id="quizScore-btn">Ok</button></div>`;
    } else {
      theResults = `<div class="quizOpen"><img src="images/bad.png">
      <div class="quizBad">Bad</div> <div class ="quizResultText"><br>You Answered ${rightAnswers} Questions Out of ${count}</div>
      <button class="quizOkButtonBad" href="profile.html" id="quizScore-btn">Ok</button></div>`;
    }
    quizPopUpScore.innerHTML = theResults;
    quizPopUpScore.style.padding = "20px";
    quizPopUpScore.style.backgroundColor = "white";
    quizPopUpScore.style.marginTop = "10px";

    

  }
}

document.querySelector("#quizScore-btn").addEventListener("click", function(){
  document.querySelector(".quizPopUpScore").style.display = "none";
});




function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}