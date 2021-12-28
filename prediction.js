const arrayPredictionItem = ['носки', 'скотч', 'фигурка лего', 'пластырь', 'аскорбинка', 'брелок с тигром', 'чупа-чупс', 'газовый балончик', 'духи', 'наклейки с котиками', 'митенки', 'фломастер', 'блокнот', 'айкос', 'кепка', 'трамвайный талончик', 'кубик-рубик'];

const arrayPredictionCards = [
  {
    title: 'РОМАНТИЧЕСКАЯ ЛЮБОВЬ',
    prediction: 'В личной жизни ожидаются приятные изменения, романтика витает в воздухе, интересные события ждут возможности сбыться',
    image: "img/cards/love.png"
  },
  {
    title: 'ДЕНЬГИ И ПЕРСПЕКТИВЫ',
    prediction: 'Год финансового благополучия и стремительного движения вперёд, не бойтесь планировать крупные покупки',
    image: "img/cards/money.png"
  },
  {
    title: 'ЗДОРОВЬЕ И КРАСОТА',
    prediction: 'Этот год станет годом любви к себе, так что с особым вниманием следите за рационом, чтобы иммунитет мог справиться с любыми трудностыми',
    image: "img/cards/beauty.png"
  },
  {
    title: 'ПУТЕШЕСТВИЯ И ОТДЫХ',
    prediction: 'Пакуйте чемоданы - в этом году ожидаются новые страны, много природы и долгожданный релакс',
    image: "img/cards/journey.png"
  },
  {
    title: 'КАРЬЕРНЫЙ РОСТ',
    prediction: 'Год полный достижений и самореализации, любой труд будет замечен и достойно вознаграждён',
    image: "img/cards/career.png"
  },
  {
    title: 'ЯРКИЕ ВПЕЧАТЛЕНИЯ',
    prediction: 'Энергия кипит! Время радоваться жизни и воплощать мечты в жизнь. Множество новых впечатлений и позитива',
    image: "img/cards/emotion.png"
  },
  {
    title: 'ДРУЗЬЯ И ЗНАКОМСТВА',
    prediction: 'Возможны судьбоносные встречи, будьте внимательны к окружающим, проверенные друзья также будут рядом',
    image: "img/cards/friends.png"
  },
  {
    title: 'ОБУЧЕНИЕ И РАЗВИТИЕ',
    prediction: 'Идеальное время для обучения, повышения тонуса, творческого развития и воплощений идей в жизнь',
    image: "img/cards/study.png"
  },
  {
    title: 'УДАЧА ВО ВСЕХ НАЧИНАНИЯХ',
    prediction: 'Возможность проявить свои таланты и реализовать давние планы, во всех начинаниях будет сопутствовать удача',
    image: "img/cards/luck.png"
  },
  {
    title: 'ГАРМОНИЯ И СЕМЕЙНЫЙ УЮТ',
    prediction: 'Появится больше времени, чтобы провести с родными, ожидайте приятные подарки и душевные разговоры',
    image: "img/cards/family.png"
  }
];

const modalWrapper = document.getElementById('modal_wrapper');
const closeModal = modalWrapper.querySelector('.close_modal');
const modalContainer = document.querySelector('#modal_container');

function createModalTemplate(title, img, predictionText, predictionItem) {
  return `
    <h1>${title}</h1>
     <div class="prediction_container">
      <img src="${img}">
       <div class="prediction_container_text">
        <p>${predictionText}</p>
        <p class="lucky_item">Счастливый предмет:</p>
        <h4>${predictionItem}</h4>
      </div>
    </div>
  `
}

function renderModalContent() {
  modalContainer.innerHTML = '';

  let randomPredictionItem = Math.floor(Math.random() * arrayPredictionItem.length);
  let randomPredictionCard = Math.floor(Math.random() * arrayPredictionCards.length);

  const title = arrayPredictionCards[randomPredictionCard].title;
  const img = arrayPredictionCards[randomPredictionCard].image;
  const predictionText = arrayPredictionCards[randomPredictionCard].prediction;
  const predictionItem = arrayPredictionItem[randomPredictionItem];

  const template = createModalTemplate(title, img, predictionText, predictionItem);
  modalContainer.insertAdjacentHTML('afterbegin', template);
}

function mainModal(){
  const chosePredictionCards = Array.from(document.getElementsByClassName('prediction'));

  chosePredictionCards.forEach(item => {
    item.addEventListener('click', ()=>{
      renderModalContent();
      modalWrapper.classList.add('active');
    })
  });

  closeModal.addEventListener('click', ()=>{
    modalWrapper.classList.remove('active');
  })
}

document.addEventListener("DOMContentLoaded", event =>{
  mainModal();  
});