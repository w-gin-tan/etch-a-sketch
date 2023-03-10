const setMultipleAttributes = (elem, attributes) => {
    Object.keys(attributes).forEach(attribute => {
        elem.setAttribute(attribute, attributes[attribute]);
    });
}

const menuSetup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {}; 

    const menubar = document.createElement('div');
    multiAttributes = {
        style: 'height: 100vh; width: 20%; display: flex; flex-direction: column; align-items: center; box-shadow: 0px 15px 40px #7E6D5766;'
    };
    setMultipleAttributes(menubar, multiAttributes);
    menubar.classList.add('menubar');

    document.body.appendChild(menubar);
}

const sketchpadSetup = (inputSize) => {
    // Multi attribute variable for elements
    let multiAttributes = {}; 

    // Grid and square variables
    const gridSize = 512;
    const squareSize = gridSize / inputSize;
    const squareNo = inputSize**2;

    let sketchview = document.querySelector('.sketchview');
    if (!sketchview) {
        sketchview = document.createElement('div');
        multiAttributes = {
            style: 'height: 100vh; width: 80%; display: flex; justify-content: center; align-items: center;'
        };
        setMultipleAttributes(sketchview, multiAttributes);
        sketchview.classList.add('sketchview');
        document.body.appendChild(sketchview);
    }

    let sketchpad = document.querySelector('.sketchpad');
    if (sketchpad) {
        sketchpad.remove();
    }
    sketchpad = document.createElement('div');
    multiAttributes = {
        style: `width: ${gridSize}px; height: ${gridSize}px; border: 5px solid black; display: flex; flex-wrap: wrap; flex-direction: column;`
    };
    setMultipleAttributes(sketchpad, multiAttributes);
    sketchpad.classList.add('sketchpad');

    for (let squares = 0; squares < squareNo; squares++) {
        let square = document.createElement('div');
        multiAttributes = {
            style: `width: ${squareSize}px; height: ${squareSize}px; border: none; box-sizing: border-box;`
        };
        setMultipleAttributes(square, multiAttributes);
        square.classList.add('square');
        sketchpad.appendChild(square);
    }

    sketchview.appendChild(sketchpad);
}

const sliderSetup = (inputSize) => {
    // Multi attribute variable for elements
    let multiAttributes = {};

    const slider = document.createElement('div');
    multiAttributes = {
        style: 'width: 80%; height: 60px; padding: 0; margin: 2vh; background: #fcfcfc; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 15px 40px #7E6D5766;'
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
    document.body.querySelector('.menubar').appendChild(slider);
}

const paletteSetup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {};

    const palette = document.createElement('input');
    multiAttributes = {
        style: '-webkit-appearance: none; width: 80%; height: 60px; padding: 0; margin: 2vh; background: #fcfcfc; border: none; display: flex; flex-direction: column; justify-content: center; align-items: center;',
        type: 'color',
        value: 'black'
    };
    setMultipleAttributes(palette, multiAttributes);
    palette.classList.add('palette');

    document.body.querySelector('.menubar').appendChild(palette);
}

const toolColorHover = (elm, bgColor, textColor) => {
    // Switch background and text colors everytime a hover, click, leave event occurs
    elm.style.color = textColor;
    elm.style.backgroundColor = bgColor;
}

const eraserSetup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {};

    // Styling the eraser button
    const eraser = document.createElement('button');
    multiAttributes = {
        style: 'width: 80%; height: 60px; padding: 0; margin: 2vh; background: #fcfcfc; border: none; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 15px 40px #7E6D5766; font-size: 26px; font-weight: 600; font-family: Open Sans; color: #030303;',
    };
    eraser.textContent = 'Eraser';
    setMultipleAttributes(eraser, multiAttributes);
    eraser.classList.add('eraser', 'off');

    // Button mouseover styling
    eraser.addEventListener('mouseover', (e) => {
        toolColorHover(e.target, '#030303', '#fcfcfc');
    });

    // Button mouseleave styling
    eraser.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('off')) {
            toolColorHover(e.target, '#fcfcfc', '#030303');
        }
    });

    // Button onClick styling
    eraser.addEventListener('click', (e) => {
        if (e.target.classList.contains('off')) {
            e.target.classList.remove('off');
            toolColorHover(e.target, '#030303', '#fcfcfc');
        } else {
            e.target.classList.add('off');
            toolColorHover(e.target, '#fcfcfc', '#030303');;
        }
    });

    document.body.querySelector('.menubar').appendChild(eraser);
}

const fillIn = (square) => {
    const menubar = document.body.querySelector('.menubar');
    const palette = menubar.querySelector('.palette');
    const eraser = menubar.querySelector('.eraser');

    // if eraser is on, all squares coloured white
    if (!eraser.classList.contains('off')) {
        square.style.backgroundColor = 'white';
    } else {
        square.style.backgroundColor = palette.value;
    }
}

const toSketch = () => {
    const sketchpad = document.querySelector('.sketchpad');

    sketchpad.addEventListener('mousedown', function onMouseDown(event) {
        // check if target exists, is a square class and the LMB is being clicked
        if (event.target && event.target.classList.contains('square')) {
            fillIn(event.target);
        }
    });

    sketchpad.addEventListener('mouseover', function onMouseOver(event) {
        // check if target exists, is a square class and the LMB is being clicked
        if (event.target && event.target.classList.contains('square') && event.buttons == 1) {
            fillIn(event.target);
        }
    }); 
}

const pageSetup = () => {
    // Multi attribute variable for elements
    let multiAttributes = {}; 

    const html = document.querySelector('html');
    html.style.height = '100%';

    const body = document.querySelector('body');
    multiAttributes = {
        style: 'min-height: 100%; margin: 0; padding: 0; display: flex;'
    };
    setMultipleAttributes(body, multiAttributes);

    // Default grid size value for sketchpad setup 
    const defaultGridSize = 8;

    menuSetup();
    sliderSetup(defaultGridSize);
    paletteSetup();
    eraserSetup();
    sketchpadSetup(defaultGridSize);
    toSketch();
}

pageSetup();