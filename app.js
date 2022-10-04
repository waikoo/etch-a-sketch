let sizeOfGrid = 80;
let color = '';

const grid = document.querySelector('#grid');
const eraser = document.querySelector('.eraser');
const gridModifier = document.querySelector('.grid-modifier');

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

			// eventlistener here
			row.appendChild(gridBox);
		}
		grid.appendChild(row);
	}
}

function colorToBlack(e) {
	e.target.classList.remove('white');
	e.target.classList.add('black');
}
function colorToWhite(e) {
	e.target.classList.remove('black');
	e.target.classList.add('white');
}

function eraserHandler() {
	console.log('clicked');
	boxes.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
	boxes.forEach(item => item.addEventListener('mouseenter', colorToWhite));
}

function colorPickerHandler(e) {
	document.querySelector('.color-picker input').click();
	boxes.forEach(item => item.removeEventListener('mouseenter', colorToBlack));
	boxes.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
	console.log(e.target.value);

	// color = e.target.value;
	// boxes.forEach(item => (item.style.backgroundColor = `${e.target.value}`));
}

function colorizeBoxes(color) {
	boxes.forEach(item => item.removeEventListener('mouseenter', colorToWhite));
	boxes.forEach(item =>
		item.addEventListener('mouseenter', () => {
			item.style.backgroundColor = `${color}`;
		})
	);
	// boxes.forEach(item => (item.style.backgroundColor = `${color}`));
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

eraser.addEventListener('click', eraserHandler);

drawGrid(sizeOfGrid, color);

const boxes = document.querySelectorAll('.box');
boxes.forEach(item => item.addEventListener('mouseenter', colorToBlack));

const colorPickerIcon = document.querySelector('.color-picker img');

colorPickerIcon.addEventListener('click', colorPickerHandler);

const colorPickerInput = document.querySelector('.color-picker input');

colorPickerInput.addEventListener('change', e => {
	color = e.target.value;
	colorizeBoxes(e.target.value);
});

const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', deleteHandler);

gridModifier.addEventListener('click');
