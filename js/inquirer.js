const arrayPromoCodes = ['56SD234TRY', '95RED36YUT', '12KIO65YHJ', '75GHY39PLO', '12EFG56TYR', '02GHT54THJ', '63QAS41OLK', '25FGR47CVB', '23GFW54LOU', '11BFQ58LOP'];

const arrayQuestions = [
  {
    question: 'Какой Ваш возраст?',
    options: ['меньше 15', 'от 15 до 21', 'от 22 до 30', 'от 31 до 40', 'старше 40'],
    isAnswered: false,
    answerId: 0
  },
  {
    question: 'Какую ёлку Вы ставите на Новый год?',
    options: ['ничего не ставлю', 'только настоящую', 'только искусственную', 'украшаю веточками', 'комбинирую разные варианты'],
    isAnswered: false,
    answerId: 0
  },
  {
    question: 'Где Вы будете праздновать Новый год?',
    options: ['уеду в другую страну', 'с родителями дома', 'в кафе или на специальном мероприятии', 'на площади', 'собираемся c друзьями на квартире'],
    isAnswered: false,
    answerId: 0
  },
  {
    question: 'Какие подарки, в основном, планируете дарить?',
    options: ['сладости, деликатесы, алкоголь', 'техника для дома и гаджеты', 'украшения, духи, косметика', 'спортивный инвентарь', 'книги, наборы для творчества', 'подарочные сертификаты'],
    isAnswered: false,
    answerId: 0
  },
  {
    question: 'Что самое необходимое для новогоднего настроения?',
    options: ['праздничный стол', 'ёлка и новогодние украшения', 'обязательный снег и небольшой морозец', 'множество подарков', 'весёлая компания'],
    isAnswered: false,
    answerId: 0
  }
];

const inquirerContainer = document.getElementById('inquirer_container');
const fadedTitle = document.getElementById('faded_title');
const submitButton = document.getElementById('inquirer_submit_button');
const promoContainer = document.getElementById('promo_code_container');
const promoCode = document.getElementById('promo_code');
const randomPromoCode = Math.floor(Math.random() * arrayPromoCodes.length);

function createInquirerTemplate(question, num) {
  return `
    <p class="question">${question}</p>
    <ul id="question_${num}" data-id="${num}"></ul>
  `
}

function createInquirerList(option, ulNum, liNum) {
  return `
  <li>
    <input name="answer_${ulNum}" data-option="${liNum}" id="option_${ulNum}_${liNum}" type="radio">
    <label for ="option_${ulNum}_${liNum}">${option}</label>
  </li>
  `
}

function renderInquirerContent() {
  inquirerContainer.innerHTML = '';
  let question;
  let option;
  let itemInquirer;
  let answerOption;
  let questionListNumber;

  for (let i = 0; i < arrayQuestions.length; i++) {
    question = arrayQuestions[i].question;
    itemInquirer = createInquirerTemplate(question, i);
    inquirerContainer.insertAdjacentHTML('beforeend', itemInquirer);

    for (j = 0; j < arrayQuestions[i].options.length; j++) {
      option = arrayQuestions[i].options[j];
      questionListNumber = document.querySelector(`#question_${i}`);
      answerOption = createInquirerList(option, i, j);
      questionListNumber.insertAdjacentHTML('beforeend', answerOption);
    }
  }
}

function watchOnChangeAnswer() {
  inquirerContainer.addEventListener('change', (e) => {
    const questionEl = e.target.closest('[data-id]');
    const optionEl = e.target.closest('[data-option]');
    const questionId = questionEl.getAttribute('data-id');
    const optionId = optionEl.getAttribute('data-option');
    questionEl.classList.remove('is_invalid');
    arrayQuestions[questionId].isAnswered = true;
    arrayQuestions[questionId].answerId = optionId;
  })
}

function checkRadio(){
  let result = 0;

  for (let i = 0; i < arrayQuestions.length; i++) {
    if (arrayQuestions[i].isAnswered) {
      result += 1
    }
  }
  return result;
}

function createAnswersObject () {
  let arrayAnswers = [];
  arrayQuestions.forEach((item, index) => {
    const questionEl = arrayQuestions[index].question;
    const answerId = arrayQuestions[index].answerId;
    const answerEl = arrayQuestions[index].options[answerId];
    let answersObject = {
      question: questionEl, 
      answer: answerEl
    };
    arrayAnswers = arrayAnswers.concat(answersObject);
  })
  return arrayAnswers;
}

function highlightNotAnsweredQuestions() {
  arrayQuestions.forEach((item, index) => {
    if (item.isAnswered) return
    const questionEl = document.querySelector(`[data-id="${index}"]`)
    questionEl.classList.add('is_invalid')
  })
}

function submitAnswers(){
  let checkedQuestions;
  submitButton.addEventListener('click', ()=>{
    checkedQuestions = checkRadio();

    if (checkedQuestions !== arrayQuestions.length) {
      alert ('Вы ответили не на все вопросы');
      highlightNotAnsweredQuestions();
      return;
    }

    submitButton.classList.add('disable');
    inquirerContainer.classList.add('disable');
    fadedTitle.classList.add('disable');
    promoContainer.classList.add('active');
    promoCode.insertAdjacentHTML('beforeend', arrayPromoCodes[randomPromoCode]);
    createAnswersObject();
    console.log(createAnswersObject());
  });
}

document.addEventListener("DOMContentLoaded", event =>{
  renderInquirerContent();
  submitAnswers();
  watchOnChangeAnswer();
});
