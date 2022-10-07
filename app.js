import $$ from './utils/helperFunctions.js';

// objectless settings
// let sizeOfGrid = 80;
// let currentColor = '#000000';
// let colorOnHover = true;
// let isMouseDown = false;

const boxes = document.getElementsByClassName('box');
const colorOnHoverTool = document.querySelector('.hover');
const clickDragTool = document.querySelector('.drag');
const grid = document.querySelector('#grid');
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('.slider-value');
const eraser = document.querySelector('.eraser');
const colorPickerIcon = document.querySelector('.color-picker img');
const colorPickerInput = document.querySelector('.color-picker input');
const deleteBtn = document.querySelector('.delete');

const options = {
	sizeOfGrid: 100,
	currentColor: '#000000',
	colorOnHover: true,
	isMouseDown: false
};

function drawGrid(number) {
	for (let i = 0; i < number; i++) {
		const row = document.createElement('div');
		row.classList.add('row');

		for (let j = 0; j < number; j++) {
			const widthAndHeight = 960 / options.sizeOfGrid;
			const gridBox = document.createElement('div');
			gridBox.classList.add('box');
			gridBox.style.width = `${widthAndHeight}px`;
			gridBox.style.height = `${widthAndHeight}px`;
			row.appendChild(gridBox);
		}
		grid.appendChild(row);
	}
	handleHoverTool();
}

function eventTargetStyleToCurrentColor(e) {
	e.target.style.backgroundColor = options.currentColor;
}
function handleEraseTool() {
	options.currentColor = 'white';
}
function handleCustomColorPickClick() {
	colorPickerInput.click();
}
function handleCustomColorPickerTool(e) {
	options.currentColor = e.target.value;
}
function handleDeleteSketchTool() {
	options.currentColor = colorPickerInput.value;

	$$('.box').forEach(item => {
		item.style.backgroundColor = 'white';
	});
}
function handleClickDragTool() {
	colorOnHoverTool.classList.remove('selected');
	clickDragTool.classList.add('selected');
	options.colorOnHover = false;
	options.isMouseDown = true;

	// ? removes color on mouseenter - hover
	$$('.box').forEach(box =>
		box.removeEventListener('mouseenter', eventTargetStyleToCurrentColor)
	);
	// on mousedown event -> register event handlers for mousemove, mouseup
	// color box on mousedown, on mousemove, stop coloring on mouseup
	// on mouseup event -> deregister mousemove, mouseup

	$$('.box').forEach(box => box.addEventListener('mousedown', () => {}));
	// if (options.isMouseDown) {
	// 	$$('.box').forEach(box => {
	// 		box.addEventListener('mouseover', eventTargetStyleToCurrentColor);
	// 	});
	// }
}
function handleHoverTool() {
	colorOnHoverTool.classList.add('selected');
	clickDragTool.classList.remove('selected');

	options.colorOnHover = true;

	$$('.box').forEach(
		box =>
			box.removeEventListener('mousedown', eventTargetStyleToCurrentColor) // mouseup
	);
	$$('.box').forEach(
		box => box.removeEventListener('mouseup', eventTargetStyleToCurrentColor) // mousedown
	);

	$$('.box').forEach(box =>
		box.addEventListener('mouseenter', eventTargetStyleToCurrentColor)
	);
}
function handleGridSliderTool() {
	gridSliderValue.textContent = gridSlider.value;
	options.sizeOfGrid = Number(gridSlider.value);
	grid.innerHTML = '';
	drawGrid(options.sizeOfGrid);
}

eraser.addEventListener('click', handleEraseTool);
colorPickerIcon.addEventListener('click', handleCustomColorPickClick);
colorPickerInput.addEventListener('change', handleCustomColorPickerTool);
deleteBtn.addEventListener('click', handleDeleteSketchTool);
clickDragTool.addEventListener('click', handleClickDragTool);
colorOnHoverTool.addEventListener('click', handleHoverTool);
gridSlider.addEventListener('change', handleGridSliderTool);

drawGrid(options.sizeOfGrid);
