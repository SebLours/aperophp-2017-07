import Reveal from 'reveal.js';

require("reveal.js/css/reveal.css");
require("reveal.js/css/theme/night.css");
require("./slides/scss/main.scss");

var context = require.context('./slides/', true, /\.(html|md)$/);

var slides = [];
context.keys().forEach((filename)=>{
  let ext = filename.substr(filename.lastIndexOf('.') + 1);
  let slide;

  switch (ext) {
      case 'md':
        slide = `<section>${context(filename)}</section>`;
        break;

      default:
        slide = context(filename);
  };

  slides.push(slide);
});

var template = `
  <div class="reveal">
    <div class="slides">
        ${slides.join('')}
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', template);

document.addEventListener('DOMContentLoaded', () => {
  window.Reveal = Reveal;

  var script = document.createElement("script");
  script.src = "headjs/head.js";

  script.onload = () => {
    Reveal.initialize({
      width: '100%',
      height: '100%',
      center: true,
      history: true,
      minScale: 1,
      maxScale: 1,
      transition: 'zoom',
      dependencies: [
        { src: 'revealjs/plugin/notes/notes.js', async: true },
      ]
    });
  }

  var head = document.getElementsByTagName("head")[0];  
  (head || document.body).appendChild(script);
}, false);