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
const projectBox = document.querySelector('.saved-projects')
const currentProjectTitle = document.querySelector('.current-project')

magicButton.addEventListener('click', displayColors);
colorBlock.addEventListener('click', lockColor);
saveProjectButton.addEventListener('click', saveProject)
shuffle.addEventListener("click", genColors);
showSaveBtn.addEventListener('click', openSaveMenu);
menuButton.addEventListener('click', openProjectMenu);
infoButton.addEventListener('click', showInfoMenu);
saveColorsButton.addEventListener('click', savePalette)
projectBox.addEventListener('click', projectBoxHandler)

getProjects();

function projectBoxHandler(ev) {
  if (ev.target.classList.contains('project-label')) {
    currentProjectTitle.innerHTML = (ev.target.innerText)
    currentProjectTitle.id = (ev.target.parentNode.id);
  }
}

function saveProject(ev) {
  ev.preventDefault();
  let projectName = saveProjectInput.value;
  postProjects(projectName);
  document.querySelector('.save-project-input').value = ('')
}

function addColorsToPCircles() {
  let array = [];

}

function savePalette(ev) {
  ev.preventDefault();
  let paletteName = paletteInput.value;
  let savedPalette = {
    name: paletteName,
    proj_id: currentProjectTitle.id,
    color_1: colors[0].id,
    color_2: colors[1].id,
    color_3: colors[2].id,
    color_4: colors[3].id,
    color_5: colors[4].id,
  }
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
    if (!colors[i].classList.contains('locked')) {
      let hex = new ColoredBox().blockColor;
      colors[i].style.backgroundColor = hex
      colors[i].id = hex
    }
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

function addProjectHTML(name, id) {
  console.log(name, id);
  let projectHtml = `<div class='project-literal' id=${id}>
  <h3 class="project-label">${name}</h3>
    <div class="proj-palette-circles">
      <div class="proj-cir cir1"></div>
      <div class="proj-cir cir2"></div>
      <div class="proj-cir cir3"></div>
      <div class="proj-cir cir4"></div>
      <div class="proj-cir cir5"></div>
    </div>
  </div>`;
  projectBox.innerHTML += projectHtml
}

function getProjects() {
  fetch("/api/v1/projects")
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      data.forEach(project => {
        addProjectHTML(project.name, project.id)
      })
    })
}

function getPalettes() {
  fetch('/api/v1/:prokect_id/palettes')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      data.forEach(palette => {

      });
    })
}

function postProjects(name) {
  fetch("/api/v1/projects", {
      method: 'POST',
      body: JSON.stringify({
        name
      }),
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      addProjectHTML(name, data)
    })
    .catch(err => console.log(err))

}