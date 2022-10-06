const boxes = document.querySelectorAll('.box');
const pointerTool = document.querySelector('.hover');
const clickDragTool = document.querySelector('.drag');

let sizeOfGrid = 80;
let currentColor = '#000000';
let colorOnHover = true;
let mouseDown = false;
let mouseDragStart = false;
let mouseDragEnd = false;

const grid = document.querySelector('#grid');
const eraser = document.querySelector('.eraser');
const gridSlider = document.querySelector('#grid-slider');

function drawGrid(number) {
	for (let i = 0; i < number; i++) {
		const row = document.createElement('div');
		row.classList.add('row');

		for (let j = 0; j < number; j++) {
			const widthAndHeight = 960 / sizeOfGrid;
			const gridBox = document.createElement('div');
			gridBox.classList.add('box');
			gridBox.style.width = `${widthAndHeight}px`;
			gridBox.style.height = `${widthAndHeight}px`;
			gridBox.addEventListener('mouseenter', colorToBlack);
			row.appendChild(gridBox);
		}
		grid.appendChild(row);
	}
}

function colorToBlack(e) {
	console.log('colorToBlack on');
	currentColor = colorPickerInput.value;
	e.target.classList.remove('white');
	e.target.classList.add('black');
}
function colorToWhite(e) {
	e.target.classList.remove('black');
	e.target.classList.add('white');
}

function eraserHandler() {
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
	document
		.querySelectorAll('.box')
		.forEach(item => item.addEventListener('mouseenter', colorToWhite));
}

function colorPickerIconHandler() {
	document.querySelector('.color-picker input').click();
}
function inputOnClickHandler() {
	currentColor = e.target.value;
	document
		.querySelectorAll('.box')
		.forEach(box => box.classList.remove('black'));
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
}

function changeSourceColorTo(e) {
	currentColor = e.target.value;
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
	e.target.style.backgroundColor = currentColor;
}

function deleteHandler() {
	document.querySelectorAll('.box').forEach(item => {
		item.style.backgroundColor = 'white';
	});
	document
		.querySelectorAll('.box')
		.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
	document
		.querySelectorAll('.box')
		.forEach(item => item.addEventListener('mouseenter', colorToBlack));
}

function dragHandler() {
	pointerTool.classList.remove('selected');
	clickDragTool.classList.add('selected');
	colorOnHover = false;
}

function pointerHandler() {
	pointerTool.classList.add('selected');
	clickDragTool.classList.remove('selected');
	colorOnHover = true;
	document
		.querySelectorAll('.box')
		.forEach(box => removeEventListener('mouseenter', colorToBlack));
	document
		.querySelectorAll('.box')
		.forEach(box => removeEventListener('mouseenter', colorToBlack));
}

eraser.addEventListener('click', eraserHandler);

drawGrid(sizeOfGrid, color);

// ! color picker
const colorPickerIcon = document.querySelector('.color-picker img');
const colorPickerInput = document.querySelector('.color-picker input');

colorPickerIcon.addEventListener('click', colorPickerIconHandler); // colorPickerInputhoz vezet -> change megtortenik,
colorPickerInput.addEventListener('change', changeSourceColorTo);
// colorPickerInput.addEventListener('click', inputOnClickHandler);

// ! delete btn
const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', deleteHandler);

// ! grid slider
gridSlider.addEventListener('change', e => {
	document.querySelector('.slider-value').textContent = gridSlider.value;
	sizeOfGrid = Number(gridSlider.value);
	grid.innerHTML = '';
	drawGrid(sizeOfGrid);
	boxes.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
	document.querySelectorAll('.box').forEach(item => {
		item.addEventListener('mouseenter', colorToBlack);
	});
});

// ! pointerTool, clickDragTool

clickDragTool.addEventListener('click', dragHandler);
pointerTool.addEventListener('click', pointerHandler);

setInterval(() => {
	if (currentColor === colorPickerInput.value) {
		return;
	} else {
		document
			.querySelectorAll('.box')
			.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
		if (colorOnHover) {
			document.querySelectorAll('.box').forEach(item =>
				item.addEventListener('mouseenter', () => {
					item.style.backgroundColor = `${currentColor}`;
				})
			);
		} else if (!colorOnHover) {
			if (mouseDown && mouseDragStart) {
				document.querySelectorAll('.box').forEach(item =>
					item.addEventListener('dragstart', () => {
						item.style.backgroundColor = `${currentColor}`;
					})
				);
			}
		}
	}
}, 100);

// ha megkattintom a clickDragTool-t, a mouseenter eventListener-eknek remove, es a drag eventListenereket hozzaadjuk

document.querySelectorAll('.box').forEach(box =>
	box.addEventListener('mousedown', () => {
		console.log('mousedown registered');
		mouseDown = true;
	})
);
document.querySelectorAll('.box').forEach(box =>
	box.addEventListener('dragstart', () => {
		console.log('dragstart registered');
		mouseDragStart = true;
	})
);
document.querySelectorAll('.box').forEach(box =>
	box.addEventListener('dragend', () => {
		console.log('dragend registered');
		mouseDragEnd = true;
	})
);
