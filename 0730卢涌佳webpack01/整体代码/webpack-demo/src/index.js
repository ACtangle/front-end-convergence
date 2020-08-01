import a from './fn.js';
import logo from './images/logo.png';
import css from './css/css.css';

console.log('a :',a);

console.log("logo :",logo);

console.log('css :',css);

let logoImg = new Image();
logoImg.src = logo
document.body.appendChild(logoImg);

const h3 = document.createElement('h3');
h3.innerHTML = a;
document.body.appendChild(h3);


