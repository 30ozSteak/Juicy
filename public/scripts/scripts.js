const colors = document.querySelectorAll(".color");
const shuffle = document.querySelector(".shuffle");
const magicButton = document.querySelector('.magic-button');
const showSaveBtn = document.querySelector('.d-m-btn')
const menuButton = document.querySelector('.🍔');
const infoButton = document.querySelector('.ℹ️')
const colorBlock = document.querySelector('.color-block');
const saveColorsButton = document.querySelector('.save-color-palette-btn')
const saveColors = document.querySelector('.save-color');
const paletteInput = document.querySelector('.save-color-palette-input');
const saveProjectInput = document.querySelector('.save-project-input');
const saveProjectButton = document.querySelector('.submit-project-button');

magicButton.addEventListener('click', displayColors);
colorBlock.addEventListener('click', lockColor);
saveProjectButton.addEventListener('click', saveProject)
shuffle.addEventListener("click", genColors);
showSaveBtn.addEventListener('click', openSaveMenu);
menuButton.addEventListener('click', openProjectMenu);
infoButton.addEventListener('click', showInfoMenu);
saveColorsButton.addEventListener('click', savePalette)

function saveProject(ev) {
  ev.preventDefault();
  let projectName = saveProjectInput.value;
  postProjects(projectName);
}

function savePalette(ev) {
  ev.preventDefault();
  let paletteName = paletteInput.value;
  let savedPalette = {
    name: paletteName,
    proj_id: 'lol',
    color_1: colors[0].id,
    color_2: colors[1].id,
    color_3: colors[2].id,
    color_4: colors[3].id,
    color_5: colors[4].id,
  }
  console.log(savedPalette);
}

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
    let hex = new ColoredBox().blockColor;
    colors[i].style.backgroundColor = hex
    colors[i].id = hex
  }
}

function lockColor(ev) {
  if (ev.target.classList.contains('color')) {
    ev.target.classList.toggle('locked')
  }
};

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

function postProjects(name) {
  fetch("/api/v1/projects", {
      method: 'POST',
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(console.log)
    .catch(err => console.log(err))
}