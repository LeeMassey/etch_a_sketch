let sketchPad = document.querySelector("#sketchPad");
let gridSize = 64;
let width = 400;
let colorMode = "Normal";
let gridEnabled; // Currently not used. May implement grid toggle later.
let color;
let opacity;
let colorModeButtons = document.querySelectorAll(".color-mode");
let resetButton = document.querySelector(".reset");
let changeGridButton = document.querySelector(".change-grid-size");
let showCurrentGridSize = document.querySelector(".current-grid-size");

for (let i=0; i<colorModeButtons.length; i++) {
	let button = colorModeButtons[i];
	button.addEventListener("click", changeColorMode);
}

changeGridButton.addEventListener("click", changeGridSize);
resetButton.addEventListener("click", reset);

function reset() {
	let resetDot = document.querySelectorAll(".dot");
	for (let i=0; i<resetDot.length; i++) {
		resetDot[i].remove();
	}
	makeGrid(gridSize);
}

function showGridSize() {
	showCurrentGridSize.textContent = "Current Grid Size: " + gridSize + " x " + gridSize;
}

function changeColorMode() {
	colorMode = this.innerHTML;
}

function makeGrid(g) {
	for (let i=0; i<g*g; i++) {
		let dot = document.createElement("div");
		let dotWidth;
		showGridSize();
		//	***Saving this code for when I implement a grid toggle feature***
		//if (gridEnabled) {
		//	dot.classList.toggle("dotGrid");
		//	dotWidth = (width - g) / g; // compensates for extra pixels consumed by the grid (borders) so the "dots" fit container properly.
		//}
		//else {
		dotWidth =  width / g;
		//}
		dot.style = "width: " + dotWidth + "px; height: " + dotWidth + "px;";
		dot.classList.add("dot");
		sketchPad.appendChild(dot);
		dot.addEventListener("mouseover", fillDot);
	}
}

function changeGridSize() {
	gridSize = prompt("Enter any number from 1 up to 80 for grid size, where grid size equals (Number) x (Number)");
	if (gridSize < 1 || gridSize > 80) {
		alert("Number not within range. Try again.");
		return changeGridSize();
	}
	reset();
}

function fillDot() {
	let alphaValue = this.style.opacity;
	let currentColor = this.style.background;
	if (colorMode == "Normal") {
		color = "rgb(0,0,0)";
		opacity = 1.0;
	}
	else if (colorMode == "Rainbow") {
		let colorArray = [];
		for (let i=0; i<3; i++) {
			let value = (Math.floor(Math.random()*256));
			colorArray.push(value);
		}
		color = "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
		opacity = 0.7;
	}
	else if (colorMode == "Shade") {
		if (currentColor != "rgb(0, 0, 0)" && alphaValue != "1.0") {
			color = "rgb(0,0,0)";
			alphaValue = 0;
			opacity = 0;	
		}
		opacity = Number(alphaValue) + 0.1;
	}
	this.style.background = color;
	this.style.opacity = opacity;
}

makeGrid(gridSize);