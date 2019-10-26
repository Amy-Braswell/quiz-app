//question database
const STORE = {
    questions: [
    //1
    {
      question: "How many times does a one stop increase in exposure increase the amount of light by?",
      options: [
        'one',
        'two',
        'three',
        'four'
      ],
      answer:
        'two'
    },
    //2
    {
      question:
        "The camera's sensitivity to light is indicated by what standard rating?",
      options: [
        'f-stop',
        'focal length',
        'ISO',
        'shutter speed'
      ],
      answer:
        'ISO'
    },
    //3
    {
      question:
        'What camera control determines depth of field?',
      options: [
        'f-stop',
        'focal length',
        'ISO',
        'shutter speed'
      ],
      answer: 'f-stop'
    },
    //4
    {
      question: 'What camera control determines the way motion is recorded?',
      options: [
        'f-stop',
        'focal length',
        'ISO',
        'shutter speed'
      ],
      answer: 'shutter speed'
    },
    //5
    {
      question:
        'Which lens below is considered a wide angle lens for a 35mm (full-frame) DSLR camera?',
        options: [
        '35 mm',
        '50 mm',
        '90 mm',
        '35 – 105 mm'

      ],
      answer:
        '35 mm'
    },
    //6
    {
      question: 'Which lens below would be best for portraits taken with a 35mm (full-frame) DSLR camera?',
      options: [
        '35 mm',
        '50 mm',
        '90 mm',
        '35 – 105 mm'
      ],
      answer: '90 mm'
    },
    //7
    {
      question:
        'f2, f2.8 f4, f5.6, f8, _____ , f16, f22, f32',
      options: [
        'f9',
        'f10',
        'f11',
        'f12'  
      ],
      answer:
        'f11'
    },
    //8
    {
      question: '1, 2, 4, _____ , 15, 30, 60, 125, 250 500, 1000',
      options: [
        '7',
        '7.25',
        '7.5',
        '8'
      ],
      answer:
        '8'
    },
    //9
    {
      question: 'What setting will give you the shallowest depth of field?',
      options: [
        'f2',
        'f8',
        'f32',
        'f64'   
      ],
      answer: 'f2'
    },
    //10
    {
      question:
        'A shutter speed of 1/60 is how many stops slower than 1/500?',
      options: [
        '2',
        '3',
        '4',
        '5'
      ],
      answer: '3'
    }
  ],
  currentQuestion: 0,
  score: 0
};



//when a user clicks on the start button
function startQuiz() {
  $('#start').on('click', function(event){
    renderAQuestion();
    }
  );
}

//Displays question number
function updateQuestionNumber() {

  const questionNumber = $(`
      <div id="currentQuesNum">${("0" + (STORE.currentQuestion + 1)).slice(-2)}</div>
    `);
  
  $(".question-number").html(questionNumber);
  $(".art-question-score-container").addClass("move-up");
}

//Displays the score 
function updateScore() {
  const html = $(`
      <span id="js-score">Score: ${STORE.score}/${STORE.questions.length}</span>
      `);
  $(".score").html(html);
}

//Displays the photo
function loadPhoto() {
  const html = $(`
    <img src="images/Camera_800x800.png" alt="Camera Drawing" width="100" height="auto">
    `);
  $(".graphic-artwork").html(html);
}

//Displays the multiple choice answer options for the current question
function updateOptions()
{
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++)
  {
    $('.js-options').append(`
        <label for="option${i+1}">
          <input type = "radio" name="options" class="radio-input" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"></input>
          ${question.options[i]}
          </label> 
        <span id="js-r${i+1}"></span>
    `);
  }
  
}

//displays the question
function renderAQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionNumber();
  updateScore();
  loadPhoto();
  const questionHtml = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="horizontal_dotted_line"></div>
        <div class="row question">
          <div class="column">
            <legend> ${question.question}</legend>
          </div>
        </div>
        <div class="row options">
          <div class="column">
            <div class="js-options"> </div>
        </div>
      </div>
    
      <div class="row">
        <div class="column" id="button-container">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
$("main").html(questionHtml);
updateOptions();
$("#next-question").hide();
}


//displays results and restart quiz button 
function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="column">
              <img src="images/Perfect_Exposure_800x800.png" class="restart-img" alt="Histogram" width="225" height="auto">
              <legend class="quiz-score">${((STORE.score/10)*100)}<span id="percent";>%</span></legend> 
              <p class="restart-p">on your way to</p>
              <h2 class="restart-h2">Perfect Exposure</h2>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(resultHtml);
}

// checks whether user reached the end of questions list
function handleQuestions() {
  $('body').on('click','#next-question', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
  });
}


//checks whether the answer chosen is right or wrong and displays respective message 
function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === currentQues.answer) {
      STORE.score++; 
      $(`${id}`).html(`<div class="answer-img">
        <img src="images/Thumbs_Up_800x800.png" alt="Camera Drawing" width="225" height="auto">
        <h2>  Bang up to the elephant --</h2>
        <p class="answer-p"> Your answer is correct!<p/>
      </div>
      <div class="column" id="button-container">
          <button type = "submit" id="next-question" tabindex="6"> Next >></button>
        </div>    
    `);
      $(`${id}`).addClass("right-answer");
    }

    else {
      $(`${id}`).html(`<div class="answer-img">
      <img src="images/Thumbs_Down_800x800.png" alt="Camera Drawing" width="225" height="auto">
      <h2>  Damfino!!!</h2>
      <p class="answer-p">The answer is "${currentQues.answer}"</p>
      </div>
      <div class="column" id="button-container">
          <button type = "submit" id="next-question" tabindex="6"> Next >></button>
        </div>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}

//restarts quiz
function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    renderAQuestion();
  });
}

//runs the quiz app
function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleSelectOption();
  restartQuiz();
}

$(handleQuizApp);
