const colors = document.querySelectorAll(".color");
const shuffle = document.querySelector(".shuffle");
const magicButton = document.querySelector('.magic-button')


magicButton.addEventListener('click', displayColors);
shuffle.addEventListener("click", genColors);


function genColors() {
  for (let i = 0; i < 5; i++) {
    colors[i].style.backgroundColor = new ColoredBox().blockColor;
    console.log(colors);
  }
}

function displayColors() {
  magicButton.classList.toggle('open');
  console.log('y');
  // magicButton.classList.toggle('open-button');
}

class ColoredBox {
  constructor(color) {
    this.blockColor = this.randomColor();
  }

  randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
