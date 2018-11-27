const colors = document.querySelectorAll(".color");
const refresh = document.querySelector(".refresh");

refresh.addEventListener("click", genColors);

function genColors() {
  for (let i = 0; i < 5; i++) {
    colors[i].style.backgroundColor = new ColoredBox().blockColor;
    console.log(colors);
  }
}

class ColoredBox {
  constructor(color) {
    this.blockColor = this.randomColor();
  }

  randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
