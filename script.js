let gridCount = 16;

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
    console.log("populating grid.");
    for (let y = 0; y < gridCount; y++) {
        let yDiv = document.createElement('div');
        yDiv.classList.add('yDiv');
        sketchContainer.appendChild(yDiv);
        for (let x = 0; x < gridCount; x++) {
            let xDiv = document.createElement('div');
            xDiv.classList.add('xDiv', 'inactiveNode');
            yDiv.appendChild(xDiv);
        }
    }
}

let isMouseDown = false;

function activateNode(e) {
    if (isMouseDown && e.target.classList.contains('xDiv')) {
        console.log("activating node.");
        e.target.classList.add('activeNode');
    }
}

sketchContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    activateNode(e);
})

sketchContainer.addEventListener('mousemove', activateNode);

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    console.log('isMouseDown: ', isMouseDown);
});

function resetNodes() {
    console.log('resetting nodes');
    const allX = document.querySelectorAll('.xDiv');
    allX.forEach((element) => {
        element.classList.remove('activeNode');
    });
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
