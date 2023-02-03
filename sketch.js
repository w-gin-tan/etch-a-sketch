const html = document.querySelector('html');
html.style.height = '100%';

const body = document.querySelector('body');
body.setAttribute('style', 'min-height: 100%; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;');

const sketchpad = document.createElement('div');
sketchpad.classList.add('sketchpad');
sketchpad.setAttribute('style', 'width: 256px; height: 256px; border: 5px solid black;');

body.appendChild(sketchpad);
