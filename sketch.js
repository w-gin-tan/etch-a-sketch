const setup = () => {
    const html = document.querySelector('html');
    html.style.height = '100%';

    const body = document.querySelector('body');
    body.setAttribute('style', 'min-height: 100%; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;');

    const sketchpad = document.createElement('div');
    sketchpad.classList.add('sketchpad');
    sketchpad.setAttribute('style', 'width: 256px; height: 256px; border: 5px solid black; display: flex; flex-wrap: wrap; flex-direction: column;');

    const gridSize = 256;
    const squareSize = Math.sqrt(gridSize);

    for (let squares = 0; squares < gridSize; squares++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('style', `width: ${squareSize}px; height: ${squareSize}px; border: 0.05px dotted black; box-sizing: border-box;`);
        sketchpad.appendChild(square);
    }

    body.appendChild(sketchpad);
}

const toSketch = () => {
    const sketchpad = document.querySelector('.sketchpad');

    sketchpad.addEventListener('mouseover', function onMouseOver(event) {
        // check if target exists, is a square class and the LMB is being clicked
        if (event.target && event.target.classList.contains('square') && event.buttons == 1) {
            // change color of div
            let square = event.target;
            if (square.style.backgroundColor != 'black') {
                square.style.backgroundColor = 'black';
            }
        }
    }); // remove event listener ie once property
}

setup();
toSketch();

