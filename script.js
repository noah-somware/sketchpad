let gridCount = 16;

// possible modes: "basic", "shader", "rainbow"
let mode = 'basic';
let red = 0;
let green = 0;
let blue = 0;

let color = `rgb(${red}, ${green}, ${blue})`;

const colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('input', () => {
    color = colorPicker.value;
})

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function randomizeColor() {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);

    color = `rgb(${red}, ${green}, ${blue})`;
    const hexColor = rgbToHex(red, green, blue);
    colorPicker.value = hexColor;
    console.log(`new color elements: rgb(${red}, ${green}, ${blue})`);
    console.log('new color variable: ', color);
}

const gridCountNumber = document.querySelectorAll('.gridCountNumber');

const getNumber = () => {
    do {
        gridCount = Number(prompt('How many grid tiles would you like? 2-100 please.'));
    } while (isNaN(gridCount) || gridCount < 2 || gridCount > 100);
    gridCount = Math.floor(gridCount);
    console.log('Gridcount: ', gridCount);
};

document.addEventListener('DOMContentLoaded', populateGrid);

const sketchContainer = document.querySelector('#sketchContainer');

function populateGrid() {
    console.log('populating grid.');
    for (let y = 0; y < gridCount; y++) {
        let yDiv = document.createElement('div');
        yDiv.classList.add('yDiv');
        sketchContainer.appendChild(yDiv);
        for (let x = 0; x < gridCount; x++) {
            let xDiv = document.createElement('div');
            xDiv.classList.add(
                'xDiv'
                // , 'inactiveNode'
            );
            xDiv.style.backgroundColor = 'transparent';
            yDiv.appendChild(xDiv);
        }
    }

    gridCountNumber.forEach((element) => {
        console.log('Setting gridCountNumbers');
        element.textContent = gridCount;
    });
}

let isMouseDown = false;

function activateNode(e) {
    if (isMouseDown && e.target.classList.contains('xDiv')) {
        console.log('activating node.');
        // e.target.classList.add('activeNode');
        switch (mode) {
            case 'shader':
                e.target.style.backgroundColor = 'black';
                console.log('about to populate currentOpacity to: ', e.target.style.opacity);
                const currentOpacity = parseFloat(e.target.style.opacity);
                console.log('currentOpacity: ', currentOpacity);
                currentOpacity > 0.9 ? (e.target.style.opacity = 1) : (e.target.style.opacity = currentOpacity + 0.1);
                console.log('new opacity: ', e.target.style.opacity);
                break;
            case 'rainbow':
                randomizeColor();
                e.target.style.backgroundColor = color;
                break;
            default:
                e.target.style.backgroundColor = color;
                break;
        }
    }
}

sketchContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMouseDown = true;
    activateNode(e);
});

sketchContainer.addEventListener('mousemove', activateNode);

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    console.log('isMouseDown: ', isMouseDown);
});

function resetNodes() {
    console.log('resetting nodes');
    const allX = document.querySelectorAll('.xDiv');
    allX.forEach((element) => {
        // element.classList.remove('activeNode');
        element.style.backgroundColor = 'transparent';
    });
    color = `rgb(${red}, ${green}, ${blue})`;
}

const buttonsContainer = document.querySelector('#buttons');
buttonsContainer.addEventListener('click', (e) => {
    console.log('target id: ', e.target.id);
    switch (e.target.id) {
        case 'setCount':
            console.log('Getting grid count...');
            getNumber();
            sketchContainer.innerHTML = '';
            populateGrid();
            break;
        case 'reset':
            resetNodes();
            break;
        default:
            console.error('Error clicking button.');
    }
});

const modeButtonsContainer = document.querySelector('#modeButtons');
modeButtonsContainer.addEventListener('click', (e) => {
    console.log('target id: ', e.target.id);
    const allX = document.querySelectorAll('.xDiv');
    switch (e.target.id) {
        case 'colorPicker':
            allX.forEach((element) => {
                element.style.opacity = 1;
            });
            mode = 'basic';
            break;
        case 'randomColor':
            allX.forEach((element) => {
                element.style.opacity = 1;
            });
            mode = 'basic';
            randomizeColor();
            break;
        case 'rainbow':
            allX.forEach((element) => {
                element.style.opacity = 1;
            });
            mode = 'rainbow';
            break;
        case 'shader':
            allX.forEach((element) => {
                element.style.opacity = 0;
            });
            mode = 'shader';
            break;
        default:
            console.error('Error in clicking modeButtons');
    }
});
