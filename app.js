import $$ from './utils/helperFunctions.js';

const colorOnHoverTool = document.querySelector('.hover');
const clickDragTool = document.querySelector('.drag');
const grid = document.querySelector('#grid');
const gridSlider = document.querySelector('#grid-slider');
const eraser = document.querySelector('.eraser');
const colorPickerIcon = document.querySelector('.color-picker img');
const colorPickerInput = document.querySelector('.color-picker input');
const deleteBtn = document.querySelector('.delete');
const saveBtn = document.querySelector('.save-con');

const options = {
	sizeOfGrid: 100,
	currentColor: '#000000',
	colorOnHover: true,
	isEraserSelected: false,
	isMouseDown: false,
	isMouseUp: false
};

function drawGrid(number) {
	for (let i = 0; i < number; i++) {
		const row = document.createElement('div');
		row.setAttribute('draggable', 'false');
		row.classList.add('row');

		for (let j = 0; j < number; j++) {
			const widthAndHeight = 620 / options.sizeOfGrid;
			const gridBox = document.createElement('div');
			gridBox.classList.add('box');
			gridBox.style.width = `${widthAndHeight}px`;
			gridBox.style.height = `${widthAndHeight}px`;
			gridBox.setAttribute('draggable', 'false');
			row.appendChild(gridBox);
		}
		grid.appendChild(row);
		grid.setAttribute('draggable', 'false');
	}
	handleHoverTool();
}

function eventTargetStyleToCurrentColor(e) {
	e.target.style.backgroundColor = options.currentColor;
}
function handleEraseTool() {
	options.isEraserSelected = true;
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
	// options.isMouseDown = true;

	$$('.box').forEach(box => box.removeEventListener('mouseenter', eventTargetStyleToCurrentColor));

	$$('.box').forEach(box =>
		box.addEventListener('mousedown', e => {
			eventTargetStyleToCurrentColor(e);
			$$('.box').forEach(box => box.addEventListener('mousemove', eventTargetStyleToCurrentColor));
			$$('.box').forEach(box =>
				box.addEventListener('mouseup', () => {
					$$('.box').forEach(box => box.removeEventListener('mousemove', eventTargetStyleToCurrentColor));
				})
			);
		})
	);
}
function handleHoverTool() {
	colorOnHoverTool.classList.add('selected');
	clickDragTool.classList.remove('selected');

	options.colorOnHover = true;

	$$('.box').forEach(
		box => box.removeEventListener('mousedown', eventTargetStyleToCurrentColor) // mouseup
	);
	$$('.box').forEach(
		box => box.removeEventListener('mouseup', eventTargetStyleToCurrentColor) // mousedown
	);

	$$('.box').forEach(box => box.addEventListener('mouseenter', eventTargetStyleToCurrentColor));
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function handleSaveSketch() {
	html2canvas(grid).then(canvas => {
		const dataUrl = canvas.toDataURL();
		const a = document.createElement('a');
		a.setAttribute('href', dataUrl); // ? encodeURIComponent - img ?
		a.setAttribute('download', 'my-sketch.png');
		a.click();
		// ! ^ works with dataURL

		// ! works with blob:
		// canvas.toBlob(
		// 	blob => {
		// 		console.log(grid.getBoundingClientRect() === canvas.getBoundingClientRect());
		// 		console.log(grid.getBoundingClientRect());
		// 		console.log(canvas.getBoundingClientRect());
		// 		const link = document.createElement('a');
		// 		const url = URL.createObjectURL(blob);
		// 		link.setAttribute('download', '');
		// 		link.href = url;
		// 		link.click();
		// 		console.log(link);
		// 		URL.revokeObjectURL(url);
		// ! ^ works with blob
		// ^
	});
}
function handleGridSliderTool() {
	// gridSliderValue.textContent = gridSlider.value;
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
saveBtn.addEventListener('click', handleSaveSketch);

drawGrid(options.sizeOfGrid);
