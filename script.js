const grid = document.querySelector(".gridContainer");
let gridSize = document.getElementById("size");
const resetButton = document.getElementById("buttonClear");
const sizeButton = document.getElementById("buttonUpdate");
const eraser = document.getElementById("buttonEraser");
let color = "black";
let click = false;

// build a 16x16 grid made of "empty" white divs on top of a 16x16 grid container
function makeGrid() {
    for (let i = 0; i < 256; i++) {    
        let square = document.createElement("div");
        square.addEventListener("mouseover", colorSquare);
        square.classList.add("empty");
        grid.insertAdjacentElement("beforeend", square);
    };
};
makeGrid();

function changeSize() {
    if (gridSize.value > 100 || gridSize.value < 1) {
        alert("Type a number between 1 and 100. \n " + gridSize.value + " is not accepted.");
        return;
    };
    grid.innerHTML = "";
    grid.style.setProperty (
        "grid-template-columns", 
        `repeat(${gridSize.value}, 2fr)`
    );
    grid.style.setProperty (
        "grid-template-rows", 
        `repeat(${gridSize.value}, 2fr)`
    );
    for (let i = 0; i < gridSize.value * gridSize.value; i++) {    
        let square = document.createElement("div");
        square.classList.add("empty");
        grid.appendChild(square);
        square.addEventListener("mouseover", colorSquare);
    };
};
sizeButton.addEventListener("click", changeSize);

document.querySelector(".gridContainer").addEventListener("click", (e) =>{
    if (e.target.tagName != "BUTTON") {
        click = !click;
    if (click) {
        document.querySelector(".drawing").innerText = "Careful, you are drawing.";
    } else {
        document.querySelector(".drawing").innerText = "You are not drawing, feel free to move around."
    }
    }
});

// when "clear" button is pressed, the div grid return to its original 16x16 size. resets gridSize. 
resetButton.addEventListener("click", function() {
    grid.innerHTML = "";
    gridSize.value = 16;
    color = "black";
    changeSize();
    gridSize.value = "";
});

let userColor = document.getElementById("colorPicker").value;
document.getElementById("colorPicker").onchange = function() {
    color = this.value;
  }

document.getElementById("buttonEraser").onclick = function() {
    color = "#f5f5f515";
}

function colorSquare () {
    if (click) {
        if (color == "random") {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            this.style.backgroundColor = color;
        }
    };
};

document.getElementById("buttonRainbow").addEventListener("click", (e) => {
    color = "random";
});
