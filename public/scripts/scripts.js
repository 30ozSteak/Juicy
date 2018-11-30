
const colors = document.querySelectorAll(".color");
const shuffle = document.querySelector(".shuffle");
const magicButton = document.querySelector('.magic-button');
const showSaveBtn = document.querySelector('.d-m-btn')
const menuButton = document.querySelector('.🍔');
const infoButton = document.querySelector('.ℹ️')



magicButton.addEventListener('click', displayColors);
shuffle.addEventListener("click", genColors);
showSaveBtn.addEventListener('click', openSaveMenu);
menuButton.addEventListener('click', openProjectMenu);
infoButton.addEventListener('click', showInfoMenu);

function openProjectMenu() {
  let projectMenu = document.querySelector('.project-menu');
  let openBurger = document.querySelector('.🍔');
  openBurger.classList.toggle('🍔-expanded')
  projectMenu.classList.toggle('p-m-active')
}

function openSaveMenu() {
  let saveBlock = document.querySelector('.save-block');
  showSaveBtn.classList.toggle('d-m-btn-active')
  saveBlock.classList.toggle('save-block-open')
}

function showInfoMenu() {
  let infoBlock = document.querySelector('.info-overlay');
  infoBlock.classList.toggle('info-overlay-shown')
}

function genColors() {
  for (let i = 0; i < 5; i++) {
    colors[i].style.backgroundColor = new ColoredBox().blockColor;
  }
}

function displayColors() {
  magicButton.classList.toggle('open');
}

class ColoredBox {
  constructor(color) {
    this.blockColor = this.randomColor();
  }

  randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}



