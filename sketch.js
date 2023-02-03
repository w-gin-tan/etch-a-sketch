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
    console.log(sketchpad);
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

const setup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {}; 

    const html = document.querySelector('html');
    html.style.height = '100%';

    const body = document.querySelector('body');
    multiAttributes = {
        style: 'min-height: 100%; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;'
    };
    setMultipleAttributes(body, multiAttributes);

    const slider = document.createElement('div');
    slider.classList.add('slider');

    const sliderInput = document.createElement('input');
    multiAttributes = {
        type: 'range',
        min: '1',
        max: '100',
        value: '8', // default value for this and sliderText innerText
        oninput: 'document.querySelector(\'.sliderValue\').innerText = this.value'
    };
    setMultipleAttributes(sliderInput, multiAttributes);
    sliderInput.addEventListener('input', (event) => {
        // change the size of the grid
        sketchpadSetup(event.target.value);
        toSketch();
    });

    const sliderText = document.createElement('p');
    sliderText.classList.add('sliderValue');
    sliderText.innerText = sliderInput.value;
    multiAttributes = {
        style: 'font-size: 26px; font-weight: 600; font-family: Open Sans; padding-left: 30px; color: black;'
    };
    setMultipleAttributes(sliderText, multiAttributes);

    slider.appendChild(sliderInput);
    slider.appendChild(sliderText);
    sketchpadSetup(sliderInput.value);
    body.appendChild(slider);
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
    setup();
    toSketch();
}

