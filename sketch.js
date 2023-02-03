const setMultipleAttributes = (elem, attributes) => {
    Object.keys(attributes).forEach(attribute => {
        elem.setAttribute(attribute, attributes[attribute]);
    });
}

const sketchpadSetup = (inputSize) => {
    // Grid and square variables
    const gridSize = 256;
    const squareSize = gridSize / inputSize;
    const squareNo = inputSize**2;

    let sketchpad = document.querySelector('.sketchpad');
    if (sketchpad) {
        sketchpad.remove();
    }
    sketchpad = document.createElement('div');
    sketchpad.classList.add('sketchpad');
    sketchpad.setAttribute('style', `width: ${gridSize}px; height: ${gridSize}px; border: 5px solid black; display: flex; flex-wrap: wrap; flex-direction: column;`);

    for (let squares = 0; squares < squareNo; squares++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('style', `width: ${squareSize}px; height: ${squareSize}px; border: 0.05px dotted black; box-sizing: border-box;`);
        sketchpad.appendChild(square);
    }

    document.body.appendChild(sketchpad);
}

const sliderSetup = (inputSize) => {
    // Multi attribute variable for elements
    let multiAttributes = {};

    const slider = document.createElement('div');
    multiAttributes = {
        style: 'width: 120px; height: 60px; padding: 0; margin-right: 50px; background: #fcfcfc; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 15px 40px #7E6D5766;'
    };
    setMultipleAttributes(slider, multiAttributes);
    slider.classList.add('slider');

    const sliderInput = document.createElement('input');
    multiAttributes = {
        style: '-webkit-appearance:none; width: 100px; height: 2px; background-color: black; border: none; outline: none; margin: 10px 0 0 0;',
        type: 'range',
        min: '1',
        max: '100',
        value: inputSize, 
        oninput: 'document.querySelector(\'.sliderValue\').innerText = this.value + \' x \' + this.value'
    };
    setMultipleAttributes(sliderInput, multiAttributes);
    sliderInput.addEventListener('input', (event) => {
        // change the size of the grid
        sketchpadSetup(event.target.value);
        toSketch();
    });

    const sliderText = document.createElement('p');
    sliderText.classList.add('sliderValue');
    sliderText.innerText = sliderInput.value + ' x ' + sliderInput.value;
    multiAttributes = {
        style: 'font-size: 26px; font-weight: 600; font-family: Open Sans; margin: 5px 0 0 0; color: black;'
    };
    setMultipleAttributes(sliderText, multiAttributes);

    slider.appendChild(sliderInput);
    slider.appendChild(sliderText);
    document.body.appendChild(slider);
}

const pageSetup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {}; 

    const html = document.querySelector('html');
    html.style.height = '100%';

    const body = document.querySelector('body');
    multiAttributes = {
        style: 'min-height: 100%; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;'
    };
    setMultipleAttributes(body, multiAttributes);

    // Default grid size value for sketchpad setup 
    const defaultGridSize = 8;

    sliderSetup(defaultGridSize);
    sketchpadSetup(defaultGridSize);
}

const toSketch = () => {
    const sketchpad = document.querySelector('.sketchpad');

    sketchpad.addEventListener('mousedown', function onMouseDown(event) {
        if (event.target && event.target.classList.contains('square')) {
            // change color of div
            let square = event.target;
            if (square.style.backgroundColor != 'black') {
                square.style.backgroundColor = 'black';
            }
        }
    });

    sketchpad.addEventListener('mouseover', function onMouseOver(event) {
        // check if target exists, is a square class and the LMB is being clicked
        if (event.target && event.target.classList.contains('square') && event.buttons == 1) {
            // change color of div
            let square = event.target;
            if (square.style.backgroundColor != 'black') {
                square.style.backgroundColor = 'black';
            }
        }
    }); 
}

const main = () => {
    pageSetup();
    toSketch();
}

main();
