import json from '../assets/data.json';
import imageCard from '../assets/icon-ellipsis.svg';

const template = document.getElementById('template').content;
const main = document.getElementById('main');
const buttons = document.getElementById('buttons');

const changeTimeFrame = (timeframeSelected) => {
  let time;
  if (timeframeSelected === 'daily') time = 'Yesterday';
  if (timeframeSelected === 'weekly') time = 'Last Week';
  if (timeframeSelected === 'monthly') time = 'Last Month';

  const cardsTime = document.querySelectorAll('.card');

  cardsTime.forEach((item, index) => {
    console.log(json[index].timeframes[timeframeSelected].current);
    item.querySelector('.card__title').textContent =
      json[index].timeframes[timeframeSelected].current + 'hrs';
    item.querySelector('.card__subtitle').innerHTML = `
      ${time} -
      <span class="card__span">${
        json[index].timeframes[timeframeSelected].previous + 'hrs'
      }</span>`;
  });
};

const init = () => {
  const fragment = document.createDocumentFragment();

  json.forEach((item) => {
    const classCard = item.title.replace(/ /g, '').toLocaleLowerCase();
    template
      .querySelector('article')
      .setAttribute('class', 'card card--' + classCard);
    template.querySelector('.card__name').textContent = item.title;
    template.querySelector('.card__img').src = imageCard;
    template.querySelector('.card__img').alt = "icon-ellipsis";

    template.querySelector('.card__title').textContent =
      item.timeframes['weekly'].current + 'hrs';

    template.querySelector('.card__span').textContent =
      item.timeframes['weekly'].previous + 'hrs';

    const node = document.importNode(template, true);

    fragment.appendChild(node);
  });
  main.appendChild(fragment);
};

buttons.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__button')) {
    const { timeframes } = e.target.dataset;
    changeTimeFrame(timeframes);
  }
});

document.addEventListener('DOMContentLoaded', init);
